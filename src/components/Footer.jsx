import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-black border-t border-white/10 text-gray-400">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-6 md:space-y-0">
          {/* Quick Links */}
          <div className="flex space-x-6">
            <a href="#home" className="hover:text-green-400 transition">
              Home
            </a>
            <a href="#jobs" className="hover:text-green-400 transition">
              Jobs
            </a>
            <a href="#about" className="hover:text-green-400 transition">
              About
            </a>
            <a href="#contact" className="hover:text-green-400 transition">
              Contact
            </a>
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-400 transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-green-400 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-green-400 transition">
              Facebook
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-4"></div>

        {/* Bottom Section: Copyright */}
        <div className="text-center text-sm">
          © {new Date().getFullYear()} RecruitPro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
