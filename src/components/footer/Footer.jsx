import React from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/logo1.png"

const Footer = () => {
  return (
    <div className="bg-[#0f1014] pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-[1660px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Column 1: Company */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
          <ul className="flex flex-col gap-3 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Terms of Use</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 2: View Website in */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">View Website in</h3>
          <ul className="flex flex-col gap-3 text-gray-400 text-sm">
            <li className="flex items-center gap-2"><i className="fa-solid fa-check text-white"></i> English</li>
          </ul>
        </div>

        {/* Column 3: Need Help? */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Need Help?</h3>
          <ul className="flex flex-col gap-3 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Visit Help Center</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Share Feedback</Link></li>
          </ul>
        </div>

        {/* Column 4: Connect with Us */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Connect with Us</h3>
          <div className="flex gap-4 mb-6">
             <a href="https://github.com/kangnikol" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <i className="fa-brands fa-github text-xl"></i>
             </a>
             <a href="https://linkedin.com/in/nicholasalvis" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-[#0077b5] hover:text-white transition-all">
                <i className="fa-brands fa-linkedin-in text-xl"></i>
             </a>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-32 h-10 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 cursor-pointer hover:bg-gray-700 transition">
                <div className="flex flex-col leading-none">
                    <span className="text-[0.6rem] text-gray-400">GET IT ON</span>
                    <span className="text-sm font-semibold text-white">Google Play</span>
                </div>
             </div>
             <div className="w-32 h-10 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 cursor-pointer hover:bg-gray-700 transition">
                <div className="flex flex-col leading-none">
                    <span className="text-[0.6rem] text-gray-400">Download on the</span>
                    <span className="text-sm font-semibold text-white">App Store</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1660px] mx-auto px-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-500">
                © 2025 Nichol+ Hotstar. All Rights Reserved. HBO, Home Box Office and all related channel and programming logos are service marks of, and all related programming visuals and elements are the property of, Home Box Office, Inc. All rights reserved.
            </p>
         </div>
         <img src={logo} alt="Logo" className="w-24 opacity-80" />
      </div>
    </div>
  )
}

export default Footer
