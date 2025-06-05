import { useEffect, useState } from 'react';
import { auth } from '../../firebase.js';
import { sendEmailVerification } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          toast.success('Email verified successfully!');
          clearInterval(interval); 
          setTimeout(() => navigate('/login'), 2000);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleResendVerification = async () => {
    if (!auth.currentUser) {
      toast.error('No user is logged in.');
      return;
    }

    setSending(true);
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success('Verification email sent successfully!');
    } catch (error) {
      console.log(error.message);
      toast.error('Failed to send verification email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleBackToLogin = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Verify Your Email</h2>
        <p className="mb-6 text-gray-700">
          A verification email has been sent to your registered email address. Please check your inbox (or spam folder) and click the verification link to activate your account.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Didn't receive the email? You can resend it by clicking the button below.
        </p>
        <button
          onClick={handleResendVerification}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mb-4 disabled:opacity-50"
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Resend Verification Email'}
        </button>
        <button
          onClick={handleBackToLogin}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
