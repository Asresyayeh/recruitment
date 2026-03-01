import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function RecruiterDashboard() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await api.get("/recruiter/company");
      setCompany(res.data.company);
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* NO COMPANY */}
      {!company && (
        <div className="max-w-xl mx-auto bg-yellow-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3">
            You must create a company first
          </h2>
          <p className="mb-4 text-gray-700">
            Before posting jobs, you need to register your company.
          </p>

          <Link
            to="/recruiter/create-company"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Create Company
          </Link>
        </div>
      )}

      {/* PENDING */}
      {company && company.status === "pending" && (
        <div className="max-w-xl mx-auto bg-blue-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">
            Company Under Review
          </h2>
          <p className="text-gray-700">
            Your company <strong>{company.name}</strong> is waiting for admin approval.
          </p>
        </div>
      )}

      {/* REJECTED */}
      {company && company.status === "rejected" && (
        <div className="max-w-xl mx-auto bg-red-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">
            Company Rejected
          </h2>
          <p className="text-gray-700 mb-4">
            Your company <strong>{company.name}</strong> was rejected.
            Please update and resubmit.
          </p>

          <Link
            to="/recruiter/create-company"
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
          >
            Update Company
          </Link>
        </div>
      )}

      {/* APPROVED DASHBOARD */}
      {company && company.status === "approved" && (
        <>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h1 className="text-2xl font-bold">
              Welcome, {company.name}
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your job postings and applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <Link
              to="/recruiter/create-job"
              className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700"
            >
              <h2 className="text-xl font-bold">Post New Job</h2>
              <p className="mt-2">Create and publish a new job listing.</p>
            </Link>

            <Link
              to="/recruiter/jobs"
              className="bg-gray-800 text-white p-6 rounded-lg shadow hover:bg-gray-900"
            >
              <h2 className="text-xl font-bold">Manage Jobs</h2>
              <p className="mt-2">Edit or close your existing jobs.</p>
            </Link>

            <Link
              to="/recruiter/applications"
              className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700"
            >
              <h2 className="text-xl font-bold">View Applications</h2>
              <p className="mt-2">Review candidate applications.</p>
            </Link>

          </div>
        </>
      )}

    </div>
  );
}