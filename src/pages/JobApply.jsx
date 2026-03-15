import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const JobApply = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false); // new state

  // Fetch job data
  useEffect(() => {
    api
      .get(`/jobs/${jobId}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err));
  }, [jobId]);

  // Check if the user already applied
  useEffect(() => {
    api
      .get("/my/applications")
      .then((res) => {
        const applied = res.data.some((app) => app.job_id === parseInt(jobId));
        setAlreadyApplied(applied);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
        console.error(err);
      });
  }, [jobId, navigate]);

  if (!job) return <p className="text-center mt-10">Loading job...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("job_id", job.id);
    formData.append("cover_letter", coverLetter);
    formData.append("resume_file", resume);

    setLoading(true);
    try {
      const res = await api.post("/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);
      setAlreadyApplied(true); // disable button after successful submission
      navigate("/my/applications");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login");
        return;
      }

      console.error(err);
      alert("Failed to apply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
      <p className="text-gray-600 mt-1">{job.company?.name}</p>
      <p className="text-gray-600 mt-1">{job.location}</p>

      {alreadyApplied ? (
        <p className="text-red-600 font-semibold mt-4">
          You have already applied for this job.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="font-semibold">Cover Letter (Optional)</span>
            <textarea
              className="border rounded p-2 mt-1"
              rows={6}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write your cover letter..."
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold">Resume (PDF/DOC)</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              className="mt-1"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            {loading ? "Applying..." : "Submit Application"}
          </button>
        </form>
      )}
    </div>
  );
};

export default JobApply;
