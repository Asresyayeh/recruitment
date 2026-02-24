import React from "react";
import { useNavigate } from "react-router-dom";

export default function JobsPage() {
  const navigate = useNavigate();

  const jobs = [
    {
      _id: "1",
      title: "Frontend Developer",
      description:
        "We are looking for a skilled React developer with experience in Tailwind CSS.",
      location: "Addis Ababa",
      salary: "15,000 ETB",
    },
    {
      _id: "2",
      title: "Backend Developer",
      description: "Seeking Node.js developer with MongoDB experience.",
      location: "Bahir Dar",
      salary: "18,000 ETB",
    },
    {
      _id: "3",
      title: "UI/UX Designer",
      description:
        "Creative designer needed for web and mobile application design.",
      location: "Remote",
      salary: "12,000 ETB",
    },
  ];

  return (
    <section
      id="jobs"
      className="w-full py-24 bg-gradient-to-br from-black via-green-900 to-black text-white min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-wide text-green-300">
            Software Development Jobs
          </h1>
          <p className="text-gray-300 mt-4">
            Browse available opportunities in this category
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-black/50 border border-green-800 rounded-2xl p-7 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.25)] transition duration-300"
            >
              <h2 className="text-xl font-semibold text-green-300">
                {job.title}
              </h2>

              <p className="text-gray-300 mt-4 text-sm leading-relaxed">
                {job.description}
              </p>

              <div className="mt-5 text-sm text-gray-400 space-y-1">
                <p>📍 {job.location}</p>
                <p>💰 {job.salary}</p>
              </div>

              <button
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="mt-6 w-full border border-green-500 text-green-300 py-2 rounded-2xl hover:bg-green-500 hover:text-black transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
