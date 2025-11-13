import React, { useState, useContext } from 'react';
import { EyeIcon, EyeOffIcon, BookOpenIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Auth/AuthContext';

const LoginPage = () => {
  const { SignInUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);

    try {
      await SignInUser(email, password);
      toast.success('User logged in successfully!');
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch {
      toast.error('Login failed! Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      toast.success('Logged in with Google successfully!');
      navigate(location.state?.from || '/');

      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      };

      await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
    } catch {
      toast.error('Google Sign-In failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      toast.error('Please enter your email to reset password.');
      return;
    }

    const actionCodeSettings = {
      url: window.location.origin + '/login',
      handleCodeInApp: true,
    };

    try {
      await sendPasswordResetEmail(auth, resetEmail, actionCodeSettings);
      toast.success(
        `Password reset email sent! Check your inbox: ${resetEmail}`
      );
      window.open('https://mail.google.com', '_blank');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4E8] dark:bg-[#3B2A23] flex items-center justify-center px-4 py-10 transition-colors duration-500">
      <div className="w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row bg-white dark:bg-[#2A221D] transition-colors duration-500">
        {/* Left Side */}
        <div className="lg:w-1/2 bg-gradient-to-br from-[#C19A6B] to-[#B6864E] flex flex-col justify-center items-center text-white p-10">
          <BookOpenIcon size={60} className="mb-6" />
          <h2 className="text-4xl font-bold mb-3">Welcome Back</h2>
          <p className="text-center text-sm opacity-90 leading-relaxed max-w-xs">
            Sign in to continue exploring, reading, and collecting your favorite
            books from our library.
          </p>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#3B2F2F] dark:text-[#F8F4E8] transition-colors duration-500">
            Login to Your Account 📚
          </h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block font-medium mb-1 text-[#3B2F2F] dark:text-[#F8F4E8] transition-colors duration-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-[#3B2A23] dark:border-gray-600 text-[#3B2F2F] dark:text-[#F8F4E8] focus:ring-2 focus:ring-[#B6864E] outline-none transition-colors duration-500"
                required
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="block font-medium mb-1 text-[#3B2F2F] dark:text-[#F8F4E8] transition-colors duration-500">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-3 pr-10 bg-white dark:bg-[#3B2A23] dark:border-gray-600 text-[#3B2F2F] dark:text-[#F8F4E8] focus:ring-2 focus:ring-[#B6864E] outline-none transition-colors duration-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] text-[#B6864E] dark:text-[#D17E5E] hover:text-[#3B2F2F] dark:hover:text-[#F8F4E8] transition-colors duration-500"
              >
                {showPassword ? (
                  <EyeOffIcon size={20} />
                ) : (
                  <EyeIcon size={20} />
                )}
              </button>
            </div>

            <div className="text-right text-sm mt-1">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#B6864E] dark:text-[#D17E5E] hover:underline transition-colors duration-500"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B6864E] dark:bg-[#D17E5E] hover:bg-[#9C7243] dark:hover:bg-[#B35B3B] text-white py-3 rounded-lg text-lg font-semibold shadow-md transition-transform hover:scale-[1.02]"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="btn w-full flex items-center justify-center gap-2 bg-white dark:bg-[#3B2A23] text-black dark:text-[#F8F4E8] border border-[#e5e5e5] dark:border-gray-600 py-3 rounded-lg mt-3 hover:bg-gray-100 dark:hover:bg-[#2F221A] transition-colors duration-500"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff" />
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  />
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  />
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  />
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  />
                </g>
              </svg>
              Login with Google
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-[#3B2F2F] dark:text-[#F8F4E8] transition-colors duration-500">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-[#B6864E] dark:text-[#D17E5E] font-semibold hover:underline transition-colors duration-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default LoginPage;
