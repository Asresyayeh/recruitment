import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function JobsPage() {
  const navigate = useNavigate();
  const { category } = useParams(); // this should be category ID

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch jobs by category ID
        const url = category ? `/jobs/category/${category}` : "/jobs";
        const res = await api.get(url);
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category]);

  if (loading) {
    return (
      <div className="text-center text-green-300 min-h-screen flex items-center justify-center">
        Loading jobs...
      </div>
    );
  }

  return (
    <section className="w-full py-24 bg-gradient-to-br from-black via-green-900 to-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-300">
            {category ? `Category ${category}` : "All Jobs"}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {jobs.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">
              No jobs found in this category.
            </p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-black/50 border border-green-800 rounded-2xl p-7 hover:border-green-400 transition"
              >
                <h2 className="text-xl font-semibold text-green-300">
                  {job.title}
                </h2>

                <p className="text-gray-300 mt-4 text-sm">{job.description}</p>

                <div className="mt-5 text-sm text-gray-400 space-y-1">
                  <p>📍 {job.location}</p>
                  <p>💰 {job.salary}</p>
                  {/* Safely access category name if nested object */}
                  <p>📂 {job.category_name || job.category?.name || "N/A"}</p>
                </div>

                <button
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="mt-6 w-full border border-green-500 text-green-300 py-2 rounded-2xl hover:bg-green-500 hover:text-black transition"
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
