import React from 'react'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import FullPageChat from '../components/ChatBot/FullPageChat'

const FullPageChating = () => {
    return (
        <div className="bg-white">
            <NavBar />
            <FullPageChat />
            <Footer />
        </div>
    )
}
export default FullPageChating
