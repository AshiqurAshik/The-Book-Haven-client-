import React, { useState, useContext } from 'react';
import { EyeIcon, EyeOffIcon, BookOpenIcon } from 'lucide-react';
import { AuthContext } from '../../Auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, addProfileInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (!/[A-Z]/.test(password))
      return 'Password must contain an uppercase letter.';
    if (!/[a-z]/.test(password))
      return 'Password must contain a lowercase letter.';
    return '';
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationError('');

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    const error = validatePassword(password);
    if (error) {
      setValidationError(error);
      toast.error(error);
      setLoading(false);
      return;
    }

    try {
      await createUser(email, password);
      toast.success('User registered successfully!');
      await addProfileInfo(name, photoURL);
      toast.success('Profile updated successfully!');
      navigate('/');
    } catch (err) {
      console.error(err.message);
      toast.error('Registration failed! ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4E8] dark:bg-[#3B2A23] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white dark:bg-[#4C3A2F] shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side */}
        <div className="lg:w-1/2 bg-gradient-to-br from-[#C19A6B] to-[#B6864E] flex flex-col justify-center items-center text-white p-10">
          <BookOpenIcon size={60} className="mb-6" />
          <h2 className="text-4xl font-bold mb-3">Join the Library</h2>
          <p className="text-center text-sm opacity-90 leading-relaxed max-w-xs">
            Create your account to borrow, explore, and track your favorite
            books in one elegant space.
          </p>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 p-10 bg-[#FFFDF8] dark:bg-[#3B2A23]">
          <h2 className="text-3xl font-bold text-[#3B2F2F] dark:text-[#FFF8F1] mb-6 text-center">
            Create Your Account ✨
          </h2>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-[#3B2F2F] dark:text-[#FFF8F1] font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full border border-[#E8DCC2] dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-[#5A4638] focus:ring-2 focus:ring-[#B6864E] focus:border-[#B6864E] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#3B2F2F] dark:text-[#FFF8F1] font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border border-[#E8DCC2] dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-[#5A4638] focus:ring-2 focus:ring-[#B6864E] focus:border-[#B6864E] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#3B2F2F] dark:text-[#FFF8F1] font-medium mb-1">
                Photo URL
              </label>
              <input
                type="url"
                name="photoURL"
                placeholder="https://example.com/photo.jpg"
                className="w-full border border-[#E8DCC2] dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-[#5A4638] focus:ring-2 focus:ring-[#B6864E] focus:border-[#B6864E] outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-[#3B2F2F] dark:text-[#FFF8F1] font-medium mb-1">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                className="w-full border border-[#E8DCC2] dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-[#5A4638] focus:ring-2 focus:ring-[#B6864E] focus:border-[#B6864E] outline-none pr-10"
                required
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] text-[#B6864E] hover:text-[#3B2F2F]"
              >
                {showPassword ? (
                  <EyeOffIcon size={20} />
                ) : (
                  <EyeIcon size={20} />
                )}
              </button>
            </div>

            {validationError && (
              <p className="text-red-600 text-sm">{validationError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B6864E] hover:bg-[#9C7243] dark:hover:bg-[#8B5E3C] text-white py-3 rounded-lg text-lg font-semibold shadow-md transition-transform hover:scale-[1.02]"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-center text-sm text-[#3B2F2F] dark:text-[#FFF8F1] mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#B6864E] dark:text-[#D1A169] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default RegisterPage;
