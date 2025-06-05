import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleDisplayName, setGoogleDisplayName] = useState("");
  const [googleRole, setGoogleRole] = useState("");

  // Helper to navigate based on role
  const navigateByRole = (userRole) => {
    if (userRole === "Organizer") {
      navigate("/organizer-dashboard");
    } else if (userRole === "Attendee") {
      navigate("/attendee-dashboard");
    } else {
      toast.error("Unknown role. Please contact support.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !displayName || !role) {
      toast.warning("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName });

      // Send email verification
      await sendEmailVerification(res.user);
      toast.info("A verification email has been sent. Please verify your email.");

      const token = await res.user.getIdToken();

      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: displayName, email, role, password }),
      });

      if (response.ok) {
        toast.success("Signup successful!");
        navigate("/verify-email"); // Redirect to a verification page
      } else {
        toast.error("Failed to save user data. Please try again.");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please enter a valid email.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters.");
      } else {
        console.log(error.message);
        toast.error("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const googleEmail = result.user.email;
      const token = await result.user.getIdToken();

      if (!googleDisplayName || !googleRole) {
        toast.warning("Please provide additional details for Google Signup.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: googleDisplayName,
          email: googleEmail,
          role: googleRole,
          password: null,
        }),
      });

      if (response.ok) {
        toast.success("Signup with Google successful!");
        const userData = await response.json();
        navigateByRole(userData.role);
      } else {
        toast.error("Failed to save Google user data.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Google signup failed. Please try again.");
    } finally {
      setShowGoogleModal(false);
      setGoogleDisplayName("");
      setGoogleRole("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg"
      >
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-center text-blue-600">
          Create an Account
        </h2>

        {/* Standard Signup Inputs */}
        <input
          className="border p-3 w-full mb-3 sm:mb-4 rounded"
          type="text"
          placeholder="User Name"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
        <input
          className="border p-3 w-full mb-3 sm:mb-4 rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="relative mb-3 sm:mb-4">
          <input
            className="border p-3 w-full pr-20 rounded"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <select
          className="border p-3 w-full mb-3 sm:mb-4 rounded"
          onChange={(e) => setRole(e.target.value)}
          value={role}
        >
          <option value="">Select Role</option>
          <option value="Attendee">Attendee</option>
          <option value="Organizer">Organizer</option>
        </select>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-3 text-gray-500 font-medium">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Google Signup Button */}
        <button
          type="button"
          onClick={() => setShowGoogleModal(true)}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"
        >
          Sign Up with Google
        </button>
        <p className="text-center mt-6 text-sm sm:text-base font-light">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="ml-1 text-cyan-600 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </form>

      {/* Google Signup Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4 text-center text-blue-600">
              Complete Google Signup
            </h3>
            <input
              type="text"
              placeholder="Google User Name"
              value={googleDisplayName}
              onChange={(e) => setGoogleDisplayName(e.target.value)}
              className="border p-3 w-full mb-4 rounded"
            />
            <select
              value={googleRole}
              onChange={(e) => setGoogleRole(e.target.value)}
              className="border p-3 w-full mb-4 rounded"
            >
              <option value="">Select Role</option>
              <option value="Attendee">Attendee</option>
              <option value="Organizer">Organizer</option>
            </select>
            <button
              onClick={handleGoogleSignup}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full mb-2"
            >
              Sign Up with Google
            </button>
            <button
              onClick={() => setShowGoogleModal(false)}
              className="w-full py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
