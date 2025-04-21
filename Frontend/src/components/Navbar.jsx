// import clsx from "clsx";
// import gsap from "gsap";
// import { useWindowScroll } from "react-use";
// import { useEffect, useRef, useState } from "react";
// import { TiLocationArrow } from "react-icons/ti";
// import { useNavigate } from 'react-router-dom';
// import Button from "./Button";

// const navItems = ["POlio IN Pakistan", "FAQS", "Knowledge Center", "Multimedia", "Contact Us"];

// const NavBar = () => {
//     const navigate = useNavigate();
//     // State for toggling audio and visual indicator
//     const [isAudioPlaying, setIsAudioPlaying] = useState(false);
//     const [isIndicatorActive, setIsIndicatorActive] = useState(false);

//     // Refs for audio and navigation container
//     const audioElementRef = useRef(null);
//     const navContainerRef = useRef(null);

//     const { y: currentScrollY } = useWindowScroll();
//     const [isNavVisible, setIsNavVisible] = useState(true);
//     const [lastScrollY, setLastScrollY] = useState(0);

//     // Toggle audio and visual indicator
//     const toggleAudioIndicator = () => {
//         setIsAudioPlaying((prev) => !prev);
//         setIsIndicatorActive((prev) => !prev);
//     };

//     // Manage audio playback
//     useEffect(() => {
//         if (isAudioPlaying) {
//             audioElementRef.current.play();
//         } else {
//             audioElementRef.current.pause();
//         }
//     }, [isAudioPlaying]);

//     useEffect(() => {
//         if (currentScrollY === 0) {
//             // Topmost position: show navbar without floating-nav
//             setIsNavVisible(true);
//             navContainerRef.current.classList.remove("floating-nav");
//         } else if (currentScrollY > lastScrollY) {
//             // Scrolling down: hide navbar and apply floating-nav
//             setIsNavVisible(false);
//             navContainerRef.current.classList.add("floating-nav");
//         } else if (currentScrollY < lastScrollY) {
//             // Scrolling up: show navbar with floating-nav
//             setIsNavVisible(true);
//             navContainerRef.current.classList.add("floating-nav");
//         }

//         setLastScrollY(currentScrollY);
//     }, [currentScrollY, lastScrollY]);

//     useEffect(() => {
//         gsap.to(navContainerRef.current, {
//             y: isNavVisible ? 0 : -100,
//             opacity: isNavVisible ? 1 : 0,
//             duration: 0.2,
//         });
//     }, [isNavVisible]);

//     return (
//         <div
//             ref={navContainerRef}
//             className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
//         >
//             <header className="absolute top-1/2 w-full -translate-y-1/2">
//                 <nav className="flex size-full items-center justify-between p-4">
//                     {/* Logo and Product button */}
//                     <div className="flex items-center gap-7">
//                         <img src="/img/poliosmall_log.jpeg" alt="logo" className="w-10 rounded-full" />

//                         <div onClick={() => navigate('/full-chat')}>
//                             <Button
//                                 id="product-button"
//                                 title="Get Your Prediction"
//                                 rightIcon={<TiLocationArrow />}
//                                 containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
//                             />
//                         </div>
//                     </div>

//                     {/* Navigation Links and Audio Button */}
//                     <div className="flex h-full items-center">
//                         <div className="hidden md:block">
//                             {navItems.map((item, index) => (
//                                 <a
//                                     key={index}
//                                     href={`#${item.toLowerCase()}`}
//                                     className="nav-hover-btn"
//                                 >
//                                     {item}
//                                 </a>
//                             ))}
//                         </div>

//                         <button
//                             onClick={toggleAudioIndicator}
//                             className="ml-10 flex items-center space-x-0.5"
//                         >
//                             <audio
//                                 ref={audioElementRef}
//                                 className="hidden"
//                                 src="/audio/loop.mp3"
//                                 loop
//                             />
//                             {[1, 2, 3, 4].map((bar) => (
//                                 <div
//                                     key={bar}
//                                     className={clsx("indicator-line", {
//                                         active: isIndicatorActive,
//                                     })}
//                                     style={{
//                                         animationDelay: `${bar * 0.1}s`,
//                                     }}
//                                 />
//                             ))}
//                         </button>
//                     </div>
//                 </nav>
//             </header>
//         </div>
//     );
// };

// export default NavBar;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#50af47] py-6 px-8">
        <div className="max-w-[1200px] mx-auto flex justify-between items-start">
          <img src="/img/PoliologoPic.png" alt="Polio Logo" className="h-[110px] py-2" />

          <div className="flex flex-col items-end gap-2">
            {/* Top Row */}
            <div className="flex items-center gap-2">
              <div className="flex gap-3">
                <a href="#"><img src="/img/facebook.webp" alt="Facebook" className="w-[35px] h-[35px] object-contain" /></a>
                <a href="#"><img src="/img/twitter.webp" alt="Twitter" className="w-[35px] h-[35px] object-contain" /></a>
                <a href="#"><img src="/img/instagram.webp" alt="Instagram" className="w-[35px] h-[35px] object-contain" /></a>
                <a href="#"><img src="/img/youtube.webp" alt="YouTube" className="w-[35px] h-[35px] object-contain" /></a>
                <a href="#"><img src="/img/vimeo.webp" alt="Vimeo" className="w-[35px] h-[35px] object-contain" /></a>
              </div>
              <span className="text-white font-bold cursor-pointer">|&nbsp;&nbsp;Urdu Website</span>
            </div>

            
            {/*
            <div>
              <img src="/img/helplinelogo.webp" alt="Helpline 1166" className="w-[216px] h-[65px] object-contain" />
            </div>
            */}

        


            

            {/* Voice Assistant Button under the Helpline Logo */}
            <div onClick={() => navigate('/full-chat')} className="mt-4">
              <Button
                id="voice-assistant-button"
                title="Get Voice Assistant"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 flex items-center justify-center gap-1 ml-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-t border-gray-300 py-6 px-8">
        <div className="max-w-[1200px] mx-auto">
          <ul className="flex list-none p-0 m-0 gap-6 justify-center items-center whitespace-nowrap">
            <li><a href="/polio-in-pakistan" className="text-gray-800 font-semibold text-base hover:text-[#58ac44]">POLIO IN PAKISTAN ▾</a></li>
            <li><a href="/global-polio" className="text-gray-800 font-semibold text-base hover:text-[#58ac44]">GLOBAL POLIO SITUATION ▾</a></li>
            <li><a href="/faqs" className="text-gray-800 font-semibold text-base hover:text-[#58ac44]">FAQS</a></li>
            <li><a href="/knowledge-centre" className="text-gray-800 font-semibold text-base hover:text-[#58ac44]">KNOWLEDGE CENTRE ▾</a></li>
            <li><a href="/multimedia" className="text-gray-800 font-semibold text-base hover:text-[#58ac44]">MULTIMEDIA ▾</a></li>
            <li><a href="/media-room" className="text-gray-800 font-semibold text-base hover:text-[#58ac44]">MEDIA ROOM ▾</a></li>
            <li><a href="/certificate" className="text-gray-800 font-semibold text-base hover:text-[#58ac44]">CERTIFICATE ▾</a></li>
            <li><a href="/information-desk" className="text-gray-800 font-semibold text-base hover:text-[#58ac44]">INFORMATION DESK ▾</a></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
