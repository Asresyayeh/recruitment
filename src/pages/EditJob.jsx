import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../api/axios";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  
  const jobData = location.state?.job;

  const [formData, setFormData] = useState({
    title: jobData?.title || "",
    description: jobData?.description || "",
    location: jobData?.location || "",
    type: jobData?.type || "",
    salary: jobData?.salary || "",
    category: jobData?.category || "",
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
      await api.put(`/jobs/${id}`, formData);

      alert("Job updated successfully!");

      navigate("/recruiter-jobs");
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-green-900 to-black text-white p-10">
      <div className="bg-white/10 backdrop-blur-lg border border-green-500/30 p-10 rounded-3xl w-full max-w-xl shadow-xl">
        <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">
          Edit Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-green-500/30"
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-4 rounded-xl bg-black/40 border border-green-500/30"
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-green-500/30"
            required
          />

          <input
            name="type"
            placeholder="Job Type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-green-500/30"
            required
          />

          <input
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-green-500/30"
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-green-500/30"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-2xl transition"
          >
            Update Job
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditJob;
