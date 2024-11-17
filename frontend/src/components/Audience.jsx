import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const Audience = () => {
  const { user, setUser } = useContext(AuthContext);
  const [criteria, setCriteria] = useState({});
  const [audienceSize, setAudienceSize] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  const handleCriteriaChange = (event) => {
    const { name, value } = event.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const checkAudienceSize = async () => {
    try {
      const res = await fetch('http://localhost:4000/audience/size', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(criteria),
      });
      const result = await res.json();
      setAudienceSize(result.size);
    } catch (err) {
      console.error(err);
    }
  };

  const createAudience = async () => {
    try {
      await fetch('http://localhost:4000/audience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(criteria),
      });
      alert('Audience created successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Navbar */}
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
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      {/* Audience Form */}
      <main className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gray-100">
        <h2 className="text-3xl font-semibold text-blue-900 mb-8">Create Audience</h2>
        <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Total Spends:
            </label>
            <input
              type="number"
              name="totalSpends"
              onChange={handleCriteriaChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Max Visits:
            </label>
            <input
              type="number"
              name="maxVisits"
              onChange={handleCriteriaChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Visit Before:
            </label>
            <input
              type="date"
              name="lastVisit"
              onChange={handleCriteriaChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={checkAudienceSize}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Check Audience Size
            </button>
            {audienceSize !== null && (
              <p className="text-blue-900 font-medium text-lg">Audience Size: {audienceSize}</p>
            )}
          </div>

          <button
            type="button"
            onClick={createAudience}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create Audience
          </button>
        </form>
      </main>
    </>
  );
};

export default Audience;
