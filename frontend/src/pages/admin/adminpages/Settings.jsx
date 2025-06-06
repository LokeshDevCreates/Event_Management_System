import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../firebase.js"; // adjust path if needed
import { signOut } from "firebase/auth";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      signOut(auth)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error("Logout error:", error);
          alert("Failed to logout. Please try again.");
        });
    }
  };

  // Placeholder user data - replace with real user context if available
  const user = {
    displayName: auth.currentUser?.displayName || "Admin User",
    email: auth.currentUser?.email || "admin@example.com",
    role: "Admin",
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Admin Settings</h1>

      <section className="mb-8">
        <h2 className="text-xl font-medium mb-4 text-gray-700">Profile Information</h2>
        <div className="space-y-2 text-gray-600">
          <p>
            <strong>Name:</strong> {user.displayName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      </section>

      <section>
        <button
          onClick={handleLogout}
          className="w-full max-w-xs bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition-colors duration-200 font-semibold"
        >
          Logout
        </button>
      </section>
    </div>
  );
};

export default Settings;
