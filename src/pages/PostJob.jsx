import { useState } from "react";
import api from "../api/axios";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    salary: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/jobs", formData);
      alert("Job posted successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        type: "",
        salary: "",
        category: "",
      });
    } catch (error) {
      console.error(error.response?.data);
      alert("Error posting job");
    }
  };

  return (
    <section className="w-full py-24 bg-gradient-to-br from-black via-green-900 to-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-green-500/30">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-400">
          Post a New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            rows="4"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          ></textarea>

          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <select
            name="type"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (IT, Marketing...)"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-2xl transition duration-300 shadow-lg"
          >
            Post Job
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostJob;
