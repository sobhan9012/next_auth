"use client"

// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

// SignupPage component
export default function SignupPage() {
  const router = useRouter();

 
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to track whether the password is shown or hidden

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state between true and false
  };

  // Function to handle signup
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup Success', response.data);
      console.log(response);

      router.push('/login');

      toast.success('Signup Success');

      setLoading(false);
      setButtonDisabled(false);
    } catch (error : any) {
      console.log('Signup failed', error);
      toast.error(error.message);
    }
  };

  // Effect to enable/disable signup button based on form input
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // Render the SignupPage component
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Signup</h1>
      <form className="w-full max-w-md rounded-lg p-8">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            Username
          </label>
          <input
            className="w-full p-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:border-gray-500"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            className="w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            type="email"
          />
        </div>
        <div className="relative mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <div className="flex items-center">
            <input
              className="w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 pr-12"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 mr-4 focus:outline-none"
              >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button
          onClick={
            onSignup}
          disabled={buttonDisabled || loading}
          className={`w-full p-2 bg-blue-500 text-white font-bold rounded-lg focus:outline-none ${
            buttonDisabled || loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}