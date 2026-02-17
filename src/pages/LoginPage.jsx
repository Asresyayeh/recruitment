import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here (API call)
    console.log("Logging in:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-black px-4">
      <div className="w-full max-w-md bg-white/5 p-10 rounded-2xl shadow-lg backdrop-blur-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-green-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-green-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="********"
              required
            />
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-green-400 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black py-2 rounded-2xl font-semibold transition mt-2"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
