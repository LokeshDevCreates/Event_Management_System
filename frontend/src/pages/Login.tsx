import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        toast.error('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password.');
      }
      else if(error.code==='auth/invalid-credential'){
        toast.error('No user found with this email.Enter correct email or go to signup');
      }
       else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" autoClose={2000} />
      <form
        onSubmit={handleLogin}
        className="bg-white p-12 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>

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
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center mt-6 text-sm font-light">
          Don't have an account?
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="ml-1 text-cyan-600 font-medium hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
