# groq.py
from typing import List, Optional, Dict, Any
from pydantic import Field
from langchain.llms.base import BaseLLM
from langchain.schema import LLMResult, Generation
from groq import Groq
import re
import json

class GroqLLM(BaseLLM):
    client: Groq = Field(default=None, exclude=True)
    model_name: str
    temperature: float = 0.3
    max_tokens: int = 500

    def __init__(self, api_key: str, model_name: str = "llama-3.3-70b-versatile", temperature: float = 0.3, max_tokens: int = 500):
        super().__init__(model_name=model_name, temperature=temperature, max_tokens=max_tokens)
        object.__setattr__(self, "client", Groq(api_key=api_key))

    def _call(self, prompt: str, stop: Optional[List[str]] = None, system_prompt: str = None) -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        response = self.client.chat.completions.create(
            model=self.model_name,
            messages=messages,
            temperature=self.temperature,
            max_tokens=self.max_tokens
        )
        return response.choices[0].message.content.strip()

    def _generate(self, prompts: List[str], stop: Optional[List[str]] = None) -> LLMResult:
        generations = []
        for prompt in prompts:
            text = self._call(prompt, stop)
            generations.append([Generation(text=text)])
        return LLMResult(generations=generations)

    @property
    def _llm_type(self) -> str:
        return "groq"