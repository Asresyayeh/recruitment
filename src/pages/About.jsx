import React from "react";

export default function About() {
  return (
    <div id="about" className="min-h-screen w-full flex flex-col text-white">
      <section className="relative w-full min-h-screen pt-24 pb-20 bg-black/90 overflow-hidden flex items-center justify-center">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-400/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 lg:px-24 space-y-20">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold">
              About <span className="text-green-400">Our Platform</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              We are building a modern recruitment platform that connects
              talented professionals with leading companies — making hiring
              simple, fast, and transparent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-green-400">Our Mission</h2>
              <p className="text-gray-300">
                Our mission is to simplify recruitment by providing a powerful
                and user-friendly platform where candidates and employers can
                connect efficiently and securely.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <ul className="space-y-4 text-gray-300">
                <li>✔ Smart job search & filtering</li>
                <li>✔ Easy job posting</li>
                <li>✔ Application tracking</li>
                <li>✔ Secure role-based system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
