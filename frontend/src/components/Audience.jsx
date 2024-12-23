import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const Audience = () => {
  const { setUser } = useContext(AuthContext);
  const [criteria, setCriteria] = useState({
    totalSpends: {},
    maxVisits: {}
  });
  const [audienceName, setAudienceName] = useState('');
  const [visitCutoffDate, setVisitCutoffDate] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  const handleCriteriaChange = (event) => {
    const { name, value } = event.target;

    if (name === 'lastVisit') {
      setCriteria({ ...criteria, [name]: value });
    } else {
      setCriteria((prev) => ({
        ...prev,
        [name]: { [`$gt`]: value },
      }));
    }
  };

  const handleNameChange = (event) => {
    setAudienceName(event.target.value);
  };

  const handleVisitCutoffChange = (event) => {
    setVisitCutoffDate(new Date(event.target.value).toISOString());
  };

  const createAudience = async () => {
    const audienceData = {
      name: audienceName,
      criteria: criteria,
      createdAt: new Date().toISOString(),
      visitCutoffDate: visitCutoffDate,
    };

    try {
      await fetch('http://localhost:4000/audience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(audienceData),
      });
      alert('Audience created successfully');
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      <nav className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
        <div className="logoGroup flex gap-4 items-center">
          <img src="../xeno.png" className="w-12 h-12" alt="Logo" />
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

      <div className="flex flex-grow items-center justify-around gap-50">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4">Create Your Audience</h2>
          <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Audience Name:
              </label>
              <input
                type="text"
                value={audienceName}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter audience name"
                required
              />
            </div>

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
                Visit Cutoff Date:
              </label>
              <input
                type="date"
                name="lastVisit"
                onChange={handleVisitCutoffChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={createAudience}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Create Audience
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4">View Your Audience</h1>
          <p className="text-lg text-blue-700 mb-8 max-w-xl text-center">
            Get a detailed view of your Audience!
          </p>
          <RouterLink to="/viewaudience">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition transform duration-200">
              View
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Audience;
