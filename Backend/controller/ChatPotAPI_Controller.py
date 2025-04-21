import os
import json
from flask import request, jsonify
from werkzeug.utils import secure_filename
import whisper
from app import app
from dotenv import load_dotenv
from utilits.helper import download_hugging_face_embeddings
from langchain_pinecone import PineconeVectorStore
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from utilits.prompt import system_prompt
from utilits.Groq import GroqLLM

# Load environment variables
dotenv_loaded = load_dotenv()

# Pinecone configuration
PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY

# Groq configuration
groq_client_value = os.environ.get('GROQ_API_KEY')
os.environ["groq_client"] = groq_client_value

# Embeddings & vector store setup
embeddings = download_hugging_face_embeddings()
index_name = "polio-chatbot-database"

# Loading the data from Vector Database
docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)
retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 3})

# LLM & chains setup
llm = GroqLLM(groq_client_value, "llama-3.3-70b-versatile")
prompt_template = ChatPromptTemplate.from_template(system_prompt)
question_answer_chain = create_stuff_documents_chain(llm, prompt_template)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

# Audio processing configuration
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

WHISPER_MODEL_SIZE = "medium"
whisper_model = None

def load_whisper_model():
    global whisper_model
    if whisper_model is None:
        whisper_model = whisper.load_model(WHISPER_MODEL_SIZE)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'mp3', 'wav', 'm4a'}


def transcribe_audio(file_path):
    try:
        result = whisper_model.transcribe(
            file_path,
            fp16=False, # CPU Base
            language='en',
            verbose=False,
            temperature=0.0
        )
        return result.get("text")
    except Exception as e:
        app.logger.error(f"Transcription error: {e}")
        return None

# Chat text endpoint
@app.route('/chatbot/api', methods=['POST'])
def chat_api():
    data = request.get_json() or {}
    user_input = data.get("question", "")
    history = data.get("history", [])

    if not user_input:
        return jsonify({"error": "No question provided"}), 400

    history_context = "\n".join(
        [f"User: {msg}\nAssistant: [Previous Response]" for msg in history[-4:]]
    ) or "No previous conversation"

    response = rag_chain.invoke({
        "input": user_input,
        "history": history_context,
        "context": []
    })

    answer = response.get("answer") or "I couldn't generate a response."
    return jsonify({"response": answer})

# Chat voice endpoint
@app.route('/chatbot/voice/api', methods=['POST'])
def chat_voice_api():
    load_whisper_model()
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    history = json.loads(request.form.get('history', '[]'))

    if not allowed_file(audio_file.filename):
        return jsonify({'error': 'Invalid audio file'}), 400

    filename = secure_filename(audio_file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    audio_file.save(file_path)

    text = transcribe_audio(file_path)
    os.remove(file_path)

    if not text:
        return jsonify({'error': 'Transcription failed'}), 400

    history_context = "\n".join(
        [f"User: {msg}\nAssistant: [Previous Response]" for msg in history[-4:]]
    ) or "No previous conversation"

    response = rag_chain.invoke({
        "input": text,
        "history": history_context,
        "context": []
    })

    return jsonify({
        "response": response.get("answer", "I couldn't generate a response."),
        "transcribed_text": text
    })
