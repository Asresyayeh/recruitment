// Profile.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios"; // your axios instance with token

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/me");
        setUser(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch profile:",
          error.response?.data || error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user data found.</p>;

  return (
    <div className="profile-page p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="user-info mb-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>

      {user.company && (
        <div className="company-info border-t pt-4">
          <h3 className="text-xl font-semibold mb-2">Company Info</h3>
          <p>
            <strong>Name:</strong> {user.company.name}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={user.company.website} target="_blank" rel="noreferrer">
              {user.company.website}
            </a>
          </p>
          <p>
            <strong>Address:</strong> {user.company.address}
          </p>
          <p>
            <strong>Description:</strong> {user.company.description}
          </p>
          <p>
            <strong>Status:</strong> {user.company.verification_status}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
