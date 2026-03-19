import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import api from "../api/axios";

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/jobs/${jobId}`) 
      .then((res) => setJob(res.data))
      .catch((err) => console.log(err));
  }, [jobId]);

  if (!job) return <p className="text-center mt-10">Loading job details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {/* Job Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>

        <p className="text-gray-600 mt-1">
          <strong>Company:</strong> {job.company?.name}
        </p>

        <p className="text-gray-600">
          <strong>Location:</strong> {job.location}
        </p>

        <p className="text-gray-600">
          <strong>Job Type:</strong> {job.type}
        </p>

        <p className="text-gray-600">
          <strong>Posted:</strong>{" "}
          {new Date(job.created_at).toLocaleDateString()}
        </p>

        <p className="text-gray-600">
          <strong>Salary:</strong> {job.salary}
        </p>
      </div>

      <hr className="my-4" />

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Required Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {job.skills?.split(",").map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      <hr className="my-4" />

      {/* Job Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Job Description
        </h2>

        <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
      </div>

      {/* Apply Button */}
      <div className="text-center">
        <button
          onClick={() => navigate(`/jobs/${job.id}/apply`)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 mt-4"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
