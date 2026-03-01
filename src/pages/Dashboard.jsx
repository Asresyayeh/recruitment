import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [company, setCompany] = useState(null);

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

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>

      {/* Company Status Card */}
      <div className="bg-white shadow rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Company Profile</h2>

        {company ? (
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Name:</span> {company.name}
            </p>

            <p>
              <span className="font-semibold">Verification Status:</span>

              <span
                className={`ml-2 px-3 py-1 rounded-full text-white text-sm
                ${company.is_verified ? "bg-green-500" : "bg-yellow-500"}`}
              >
                {company.is_verified ? "Verified" : "Pending Verification"}
              </span>
            </p>
          </div>
        ) : (
          <p>Loading company data...</p>
        )}
      </div>

      {/* Action Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Post Job Card */}
        <div className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">Post New Job</h3>

          <p className="text-gray-500 mb-4">
            Create job listing and attract candidates.
          </p>

          <button className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700">
            Create Job
          </button>
        </div>

        {/* Manage Company */}
        <div className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">Manage Company</h3>

          <p className="text-gray-500 mb-4">
            Update company profile information.
          </p>

          <button className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700">
            Edit Company
          </button>
        </div>

        {/* Applications */}
        <div className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">Job Applications</h3>

          <p className="text-gray-500 mb-4">Review candidate applications.</p>

          <button className="w-full bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700">
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
}
