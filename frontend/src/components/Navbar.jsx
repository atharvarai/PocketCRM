import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">

        <RouterLink to="/" className="flex gap-4 items-center justify-between">
          <img src='../xeno.png' className='w-12 h-12' alt="Logo" />
          <h1 className='text-white text-xl font-bold'>PocketCRM</h1>
        </RouterLink>

        <div className="flex space-x-4">
          <RouterLink to="/login">
            <button className="text-white bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md">
              Login
            </button>
          </RouterLink>
          <RouterLink to="/register">
            <button className="text-white bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md">
              Create Account
            </button>
          </RouterLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
