import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero-working.png";

export default function Home() {
  return (
    <div id="home" className="min-h-screen w-full flex text-white relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center min-h-screen px-8 md:px-16 lg:px-24 bg-gradient-to-br from-green-800/90 via-green-750/70 to-black/80">
        <p className="text-green-400 text-lg tracking-wide text-center md:text-left w-full max-w-4xl">
          We're Hiring Across Multiple Roles
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-center md:text-left w-full max-w-4xl mt-4">
          Find Your <span className="text-green-400">Dream Job</span>
        </h2>
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-center md:text-left w-full max-w-4xl mt-4">
          Connect with <span className="text-green-400">Top Companies</span>
        </h2>
        <p className="text-gray-300 text-lg text-center md:text-left w-full max-w-4xl mt-2">
          Connect with top companies, explore thousands of job listings, and
          take the next step in your career journey.
        </p>

        <div className="flex justify-center mt-8 w-full max-w-4xl">
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-400 text-black px-10 py-4 rounded-2xl text-xl font-semibold transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
