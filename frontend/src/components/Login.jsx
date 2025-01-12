import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(credentials);
      if (response.ok) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/dashboard');
      } else {
        throw new Error(response.error || 'Unknown error');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const userObject = jwtDecode(response.credential);
      const googleResponse = await loginUser({
        email: userObject.email,
        password: 'google-auth'
      });
      if (googleResponse.ok) {
        localStorage.setItem('token', googleResponse.token);
        localStorage.setItem('user', JSON.stringify(googleResponse.user));
        navigate('/dashboard');
      } else {
        throw new Error(googleResponse.message);
      }
    } catch (error) {
      console.error("Google Sign-in Error: ", error);
      alert('Google login failed: ' + (error.message || "Unknown error"));
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign-in Error:", error);
    alert('Google sign-in failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white pb-10 pt-8 px-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center mb-8">
            <a href="#" className="w-inline-block pb-2">
              <img
                src="https://cdn.prod.website-files.com/620353a026ae70e21288308a/6536204e44d00a50cb63e6a4_Vector.svg"
                loading="lazy"
                width="90"
                alt="Logo"
                className="image-136"
              />
            </a>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">Log In</h2>
            <p className="text-gray-500 text-center text-sm sm:text-base">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <input
                type="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
                value={credentials.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <div className="flex justify-center mt-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
