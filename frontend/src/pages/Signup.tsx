import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !displayName) {
      toast.warning('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: displayName,
      });

      toast.success('Signup successful!');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Please enter a valid email.');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password should be at least 6 characters.');
      } else {
        console.log(error.message);
        toast.error('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" autoClose={2000} />
      <form
        onSubmit={handleSignup}
        className="bg-white p-12 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Sign Up
        </h2>

        <input
          className="border p-3 w-full mb-4 mt-3 rounded"
          type="text"
          placeholder="User Name"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />

        <input
          className="border p-3 w-full mb-4 mt-3 rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="relative mb-4 mt-3">
          <input
            className="border p-3 w-full pr-20 rounded"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 focus:outline-none"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="text-center mt-6 text-sm font-light">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="ml-1 text-cyan-600 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
