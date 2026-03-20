import React, { useEffect, useState } from "react";
import api from "../api/axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/my/applications");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading applications...</p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">My Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications found</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition"
            >
              <p>
                <span className="font-semibold">Job ID:</span> {app.job_id}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={
                    app.status === "pending"
                      ? "text-yellow-600"
                      : app.status === "accepted"
                        ? "text-green-600"
                        : "text-red-600"
                  }
                >
                  {app.status}
                </span>
              </p>
              <p>
                <span className="font-semibold">Cover Letter:</span>{" "}
                {app.cover_letter || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Resume:</span>{" "}
                {app.resume_path ? (
                  <a
                    href={`http://127.0.0.1:8000/storage/${app.resume_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Resume
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;
