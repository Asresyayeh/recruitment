import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditCompany() {
  const location = useLocation();
  const navigate = useNavigate();

  const companyData = location.state?.company;

  const [form, setForm] = useState({
    name: companyData?.name || "",
    description: companyData?.description || "",
    website: companyData?.website || "",
    address: companyData?.address || "",
    company_domain: companyData?.company_domain || "",
  });

  // Input change handler
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Update company
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/companies", form);

      alert("Company updated successfully");

      navigate("/dashboard");
    } catch (error) {
      console.error("Update error", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-850 to-black text-white p-8">
      <div className="bg-white/10 backdrop-blur-lg border border-green-500/30 rounded-2xl p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-green-400 mb-8">Edit Company</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-3 rounded-xl bg-white/10 border border-green-500 text-white"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Company Description"
            className="w-full p-3 rounded-xl bg-white/10 border border-green-500 text-white"
          />

          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Website"
            className="w-full p-3 rounded-xl bg-white/10 border border-green-500 text-white"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-3 rounded-xl bg-white/10 border border-green-500 text-white"
          />

          <input
            name="company_domain"
            value={form.company_domain}
            onChange={handleChange}
            placeholder="Company Domain"
            className="w-full p-3 rounded-xl bg-white/10 border border-green-500 text-white"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-xl transition"
          >
            Update Company
          </button>
        </form>
      </div>
    </section>
  );
}
