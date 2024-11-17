import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
        <div className='logoGroup flex gap-4 items-center'>
          <img src='../xeno.png' className='w-12 h-12' alt="Logo" />
          <h1 className="text-xl font-bold">
            <RouterLink to="/" className="hover:text-gray-300 transition duration-200">
              PocketCRM
            </RouterLink>
          </h1>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <div className="flex-grow container mx-auto flex flex-col items-center justify-center py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-gray-600">
            Select an option from the menu to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
          <RouterLink to="/audience">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transform hover:-translate-y-1 transition duration-200">
              Create Audience
            </button>
          </RouterLink>
          <RouterLink to="/campaigns">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transform hover:-translate-y-1 transition duration-200">
              Manage Campaigns
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
