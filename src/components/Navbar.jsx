import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-6 md:px-8 py-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-green-500 flex items-center justify-center font-bold text-xl shadow-lg">
            R
          </div>
          <h1 className="text-xl font-semibold tracking-wide">RecruitPro</h1>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#home" className="hover:text-green-400 transition">
            Home
          </a>
          <a href="#jobs" className="hover:text-green-400 transition">
            Jobs
          </a>
          <a href="#companies" className="hover:text-green-400 transition">
            Companies
          </a>
          <a href="#about" className="hover:text-green-400 transition">
            About
          </a>
          <a href="#contact" className="hover:text-green-400 transition">
            Contact
          </a>
        </nav>

        {/* Auth Buttons
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="border border-green-500 text-green-400 px-5 py-2 rounded-2xl hover:bg-green-500 hover:text-black transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-400 text-black px-5 py-2 rounded-2xl transition"
          >
            Sign Up
          </Link>
        </div> */}

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-white"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/60 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          <a
            href="#home"
            className="text-white hover:text-green-400 transition text-lg font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="#jobs"
            className="text-white hover:text-green-400 transition text-lg font-medium"
            onClick={() => setIsOpen(false)}
          >
            Jobs
          </a>
          <a
            href="#companies"
            className="text-white hover:text-green-400 transition text-lg font-medium"
            onClick={() => setIsOpen(false)}
          >
            Companies
          </a>
          <a
            href="#about"
            className="text-white hover:text-green-400 transition text-lg font-medium"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="#contact"
            className="text-white hover:text-green-400 transition text-lg font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>

          {/* <div className="flex flex-col gap-3 mt-4">
            <Link
              to="/login"
              className="border border-green-500 text-green-400 px-5 py-2 rounded-2xl hover:bg-green-500 hover:text-black transition text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 hover:bg-green-400 text-black px-5 py-2 rounded-2xl transition text-center"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div> */}
        </div>
      )}
    </header>
  );
}
