import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CompanyForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    website: "",
    address: "",
    company_domain: "",
    logo: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFile = (e) => {
    setForm((prev) => ({
      ...prev,
      logo: e.target.files[0],
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      await api.post("/companies", formData);

      alert("Company created successfully!");

      // Redirect to verification page (recommended)
      navigate("/company/verify");
    } catch (error) {
      console.error(error.response?.data);

      alert(error.response?.data?.message || "Error creating company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Create Company</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Company Name"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Company Description"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
          required
        />

        <input
          name="website"
          placeholder="Website"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
          required
        />

        <input
          name="company_domain"
          placeholder="Company Domain (example.com)"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="file"
          className="w-full border p-3 rounded-lg"
          onChange={handleFile}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating Company..." : "Create Company"}
        </button>
      </form>
    </div>
  );
}
