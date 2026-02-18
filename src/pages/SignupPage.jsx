import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/register", formData);

      // If recruiter, show alert about admin approval
      if (formData.role === "recruiter") {
        alert(
          "Account created! Waiting for admin approval. You cannot login yet.",
        );
        navigate("/login");
      } else {
        // Candidate auto-approved → log in immediately
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/applicant/dashboard"); // or "/candidate/dashboard"
      }
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-black flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-black/70 backdrop-blur-md p-8 rounded-2xl shadow-lg text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Your Account
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-xl bg-black/50 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-xl bg-black/50 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-xl bg-black/50 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1" htmlFor="role">
              Role
            </label>
            <input
              type="text"
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              placeholder=""
              className="w-full px-4 py-2 rounded-xl bg-black/50 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-2xl transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-300 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
