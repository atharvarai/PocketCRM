import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import CampaignStats from './CampaignStats';
import { Link as RouterLink } from 'react-router-dom';

const Campaigns = () => {
  const { setUser } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({ audienceCriteria: {}, message: '' });

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('http://localhost:4000/campaigns', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await res.json();
      setCampaigns(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCriteriaChange = (event) => {
    const { name, value } = event.target;
    setNewCampaign({ ...newCampaign, audienceCriteria: { ...newCampaign.audienceCriteria, [name]: value } });
  };

  const handleMessageChange = (event) => {
    const { name, value } = event.target;
    setNewCampaign({ ...newCampaign, [name]: value });
  };

  const createCampaign = async () => {
    try {
      await fetch('http://localhost:4000/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newCampaign),
      });
      alert('Campaign created successfully');
      fetchCampaigns();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
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

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Campaign</h2>
          <form className="space-y-4">
            <label className="block text-gray-700">
              Total Spends:
              <input
                type="number"
                name="totalSpends"
                onChange={handleCriteriaChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block text-gray-700">
              Max Visits:
              <input
                type="number"
                name="maxVisits"
                onChange={handleCriteriaChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block text-gray-700">
              Last Visit Before:
              <input
                type="date"
                name="lastVisit"
                onChange={handleCriteriaChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block text-gray-700">
              Message:
              <textarea
                name="message"
                onChange={handleMessageChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </label>
            <button
              type="button"
              onClick={createCampaign}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
            >
              Create Campaign
            </button>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Previous Campaigns</h2>
          {campaigns.length > 0 ? (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign._id} className="p-4 bg-gray-100 rounded-lg hover:shadow-lg transition duration-200">
                  <p className="text-gray-700">Message: {campaign.message}</p>
                  <CampaignStats campaignId={campaign._id} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No previous campaigns found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Campaigns;
