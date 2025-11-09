import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, BookOpenIcon } from "lucide-react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F4E8] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row">
        

        <div className="lg:w-1/2 bg-gradient-to-br from-[#C19A6B] to-[#B6864E] flex flex-col justify-center items-center text-white p-10">
          <BookOpenIcon size={60} className="mb-6" />
          <h2 className="text-4xl font-bold mb-3">Join the Library</h2>
          <p className="text-center text-sm opacity-90 leading-relaxed max-w-xs">
            Create your account to borrow, explore, and track your favorite books in one elegant space.
          </p>
        </div>


        <div className="lg:w-1/2 p-10 bg-[#FFFDF8]">
          <h2 className="text-3xl font-bold text-[#3B2F2F] mb-6 text-center">
            Create Your Account ✨
          </h2>

          <form className="space-y-5">

            <div>
              <label className="block text-[#3B2F2F] font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-[#E8DCC2] rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-[#B6864E] outline-none"
              />
            </div>

 
            <div>
              <label className="block text-[#3B2F2F] font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-[#E8DCC2] rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-[#B6864E] outline-none"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-[#3B2F2F] font-medium mb-1">Photo URL</label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full border border-[#E8DCC2] rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-[#B6864E] outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-[#3B2F2F] font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-[#E8DCC2] rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-[#B6864E] outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] text-[#B6864E] hover:text-[#3B2F2F]"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-[#B6864E] hover:bg-[#9C7243] text-white py-3 rounded-lg text-lg font-semibold shadow-md transition-transform hover:scale-[1.02]"
            >
              Register
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-[#3B2F2F] mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#B6864E] font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
