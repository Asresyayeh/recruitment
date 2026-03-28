import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CompanyVerifyPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      setLoading(true);

      await api.post("/companies/verify", {
        code: code,
      });

      alert("Company verified successfully!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 shadow rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Company Verification</h2>

      <input
        className="w-full border p-3 rounded-lg mb-4"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
      >
        {loading ? "Verifying..." : "Verify Company"}
      </button>
    </div>
  );
}
