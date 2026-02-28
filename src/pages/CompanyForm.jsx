import { useState } from "react";
import api from "../api/axios";

export default function CompanyForm() {
  const [form, setForm] = useState({
    name: "",
    website: "",
    address: "",
    company_domain: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFile = (e) => {
    setForm((prev) => ({
      ...prev,
      logo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      await api.post("/companies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Company created successfully!");
    } catch (error) {
      console.error(error.response?.data);
      alert("Error creating company");
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

        <button className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition">
          Create Company
        </button>
      </form>
    </div>
  );
}
