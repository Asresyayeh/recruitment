import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const res = await api.get("/companies");
        setCompany(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCompany();
  }, []);

  const handleDeleteCompany = async () => {
    if (!window.confirm("Are you sure you want to delete this company?"))
      return;

    try {
      await api.delete("/recruiter/company");

      setCompany(null);

      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.company = null;
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (error) {
      console.error("Delete company error:", error);
    }
  };

  return (
    <section
      id="dashboard"
      className="w-full min-h-screen py-20 bg-gradient-to-br from-green-900 via-green-850 to-black text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10 text-green-400">
          Recruiter Dashboard
        </h1>

        <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 mb-10 border border-green-500/30">
          <h2 className="text-2xl font-semibold mb-6 text-green-400">
            Company Profile
          </h2>

          {company ? (
            <div className="space-y-4 text-gray-200">
              <p>
                <span className="font-semibold text-green-400">Name:</span>{" "}
                {company.name}
              </p>

              <p>
                <span className="font-semibold text-green-400">
                  Description:
                </span>{" "}
                {company.description}
              </p>

              <p>
                <span className="font-semibold text-green-400">Website:</span>{" "}
                {company.website}
              </p>

              <p>
                <span className="font-semibold text-green-400">Address:</span>{" "}
                {company.address}
              </p>

              <p>
                <span className="font-semibold text-green-400">Domain:</span>{" "}
                {company.company_domain}
              </p>

              <p>
                <span className="font-semibold text-green-400">
                  Verification Status:
                </span>

                <span
                  className={`ml-3 px-4 py-1 rounded-full text-white text-sm ${
                    company.is_verified ? "bg-green-600" : "bg-yellow-600"
                  }`}
                >
                  {company.is_verified ? "Verified" : "Pending Verification"}
                </span>
              </p>

              {company.logo && (
                <div className="mt-4">
                  <p className="font-semibold text-green-400 mb-2">Logo:</p>
                  <img
                    src={company.logo}
                    alt="Company Logo"
                    className="w-28 h-28 object-cover rounded-xl border border-green-500"
                  />
                </div>
              )}

              <button
                onClick={handleDeleteCompany}
                className="mt-6 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl transition"
              >
                Delete Company
              </button>
            </div>
          ) : (
            <p className="text-gray-400">Loading company data...</p>
          )}
        </div>

        {/* Action Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Post Job */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-green-500/30 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-green-400">
              Post New Job
            </h3>

            <p className="text-gray-300 mb-6">
              Create job listing and attract candidates.
            </p>
            <button
              type="button"
              onClick={() => navigate("/post")}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl transition"
            >
              Create Job
            </button>
          </div>

          {/* Manage Company */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-green-500/30 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-green-400">
              Manage Company
            </h3>

            <p className="text-gray-300 mb-6">
              Update company profile information.
            </p>

            <button
              onClick={() =>
                navigate("/edit-company", {
                  state: { company },
                })
              }
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl transition"
            >
              Edit Company
            </button>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-green-500/30 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-green-400">
              View Posted Jobs
            </h3>

            <p className="text-gray-300 mb-6">
              view and update and delete the jobs
            </p>
            <button
              type="button"
              onClick={() => navigate("/recruiter-jobs")}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl transition"
            >
              View Jobs
            </button>
          </div>

          {/* Applications */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-green-500/30 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-green-400">
              Job Applications
            </h3>

            <p className="text-gray-300 mb-6">Review candidate applications.</p>

            <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl transition">
              View Applications
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
