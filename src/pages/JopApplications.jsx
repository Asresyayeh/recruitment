import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const JobApplications = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get(`/jobs/${id}/applications`);
        setApplications(res.data);
      } catch (error) {
        console.error(error.response?.data);
        alert("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);

  const updateStatus = async (appId, status) => {
    try {
      await api.put(`/applications/${appId}/status`, { status });

      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status } : app)),
      );

      alert(`Application has been ${status}!`);
    } catch (error) {
      console.error(error.response?.data);
      alert("Failed to update status");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-green-900 to-black text-white p-10">
      <div className="max-w-6xl mx-auto">
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-green-400 mb-8">
          Job Applications
        </h2>

        {/* ⏳ Loading */}
        {loading && (
          <p className="text-center mt-10">Loading applications...</p>
        )}

        {/* ❌ No Applications */}
        {!loading && applications.length === 0 && (
          <p className="text-center opacity-70 mt-20">
            No applications for this job yet.
          </p>
        )}

        {/* 📄 Applications List */}
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-green-500/30 shadow-lg"
            >
              {/* 👤 User Info */}
              <h3 className="text-xl font-bold text-green-400">
                {app.user?.name}
              </h3>

              <p className="text-sm opacity-80">{app.user?.email}</p>

              {/* 📝 Cover Letter */}
              <p className="mt-3 text-sm opacity-90 line-clamp-4">
                {app.cover_letter}
              </p>

              {/* 📊 Status */}
              <p className="mt-3 text-sm">
                Status:{" "}
                <span className="font-semibold capitalize">{app.status}</span>
              </p>

              {/* 📄 Resume */}
              <a
                href={`http://127.0.0.1:8000/storage/${app.resume_path}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline mt-3 inline-block"
              >
                View Resume
              </a>

              {/* ⚙️ Actions */}
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => updateStatus(app.id, "accepted")}
                  className="flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold py-2 rounded-lg transition"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(app.id, "rejected")}
                  className="flex-1 bg-red-500 hover:bg-red-400 text-white font-semibold py-2 rounded-lg transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobApplications;
