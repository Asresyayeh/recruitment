import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/login", form);
      const { token, user } = res.data;

      localStorage.setItem("token", token);

      if (user.role === "candidate") {
        navigate("/applicant/dashboard");
        return;
      }

      if (user.role === "recruiter") {
        if (user.company) {
          navigate("/dashboard");
        } else {
          navigate("/recruiter/dashboard");
        }

        return;
      }
      if (user.role === "admin") {
        navigate("/admin/dashboard");
        return;
      }

      setError("Unknown role, contact support.");
    } catch (err) {
      console.error(err.response?.data);

      if (err.response?.status === 422) {
        const validationErrors = err.response.data.errors;
        const firstError = Object.values(validationErrors)[0][0];
        setError(firstError);
      } else {
        setError(err.response?.data?.message || "Invalid credentials");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-black px-4">
      <div className="w-full max-w-md bg-white/5 p-10 rounded-2xl shadow-lg backdrop-blur-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
          Login
        </h2>

        {error && <p className="text-red-500 mb-4 font-medium">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-green-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-green-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
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
