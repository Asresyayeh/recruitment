import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const RecruiterJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/recruiter/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error(error.response?.data);
      }
    };

    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await api.delete(`/jobs/${id}`);
      alert("Job deleted");

      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error(error.response?.data);
      alert("Delete failed");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-green-900 to-black text-white p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-green-400">My Posted Jobs</h2>

          <button
            onClick={() => navigate("/post")}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-xl transition"
          >
            + Post New Job
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-green-500/30 shadow-lg"
            >
              <h3 className="text-xl font-bold text-green-400">{job.title}</h3>

              <p className="text-sm opacity-80 mt-2 line-clamp-3">
                {job.description}
              </p>

              <div className="mt-4 space-y-1 text-sm opacity-90">
                <p>📍 {job.location}</p>
                <p>💼 {job.type}</p>
                <p>💰 {job.salary}</p>
                <p>🏢 {job.company?.name}</p>
                <p>📂 {job.category}</p>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() =>
                    navigate(`/jobs/edit/${job.id}`, {
                      state: { job },
                    })
                  }
                  className="flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteJob(job.id)}
                  className="flex-1 bg-red-500 hover:bg-red-400 text-white font-semibold py-2 rounded-lg"
                >
                  Delete
                </button>

                <button
                  onClick={() => navigate(`/jobs/${job.id}/applications`)}
                  className="flex-1 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 rounded-lg"
                >
                  View Applications
                </button>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <p className="text-center opacity-70 mt-20">No jobs posted yet.</p>
        )}
      </div>
    </section>
  );
};

export default RecruiterJobsPage;
