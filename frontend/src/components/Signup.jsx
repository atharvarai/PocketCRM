import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';



const Signup = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!credentials.email || !credentials.password || !credentials.confirmPassword) {
        throw new Error('Please enter all required fields.');
      }

      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match. Please try again!');
      }

      await registerUser(credentials);
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const userObject = jwtDecode(response.credential);
      const googleUser = {
        name: userObject.name,
        email: userObject.email,
        password: 'google_auth',
        confirmPassword: 'google_auth'
      };

      await registerUser(googleUser);
      navigate('/login');
    } catch (error) {
      alert('Failed to register with Google: ' + error.message);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-in error:', error);
    alert('Google login failed');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col'>
      <Navbar />
      <div
        className="flex-grow flex items-center justify-center"
      >
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center mb-6">
            <div>
              <a href="#" className="w-inline-block">
                <img src="https://cdn.prod.website-files.com/620353a026ae70e21288308a/6536204e44d00a50cb63e6a4_Vector.svg" loading="lazy" width="90" alt="" className="image-136" />
              </a>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold my-2 text-center">Create Your New Account</h2>
            <p className="text-gray-500 text-center text-sm sm:text-base">
              Already have an account?{' '}
              <RouterLink to="/login" className="text-blue-600 hover:underline">
                Sign in
              </RouterLink>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Name"
                value={credentials.name}
                onChange={handleInputChange}
                required
              />
            </div>
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
            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
                value={credentials.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>
          <div className="flex justify-center mt-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
