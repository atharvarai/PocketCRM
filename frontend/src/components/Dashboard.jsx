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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
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

      <div className='flex flex-grow items-center justify-around gap-50'>
        <div className="flex items-center">
          <div className="flex items-center justify-center">
            <img src="dashboard_welcome.png" alt="Welcome Dashboard" />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <RouterLink to="/clients">
              <button className="relative right-20 w-40 h-40 border border-[#3C91A2] text-lg font-bold text-[#3C91A2] rounded-full shadow-md flex items-center justify-center transition duration-200 transform hover:bg-[#3C91A2] hover:text-white hover:-translate-y-1">
                Add Clients
              </button>
            </RouterLink>
            <RouterLink to="/audience">
              <button className="w-40 h-40 border border-[#3C91A2] text-lg font-bold text-[#3C91A2] rounded-full shadow-md flex items-center justify-center transition duration-200 transform hover:bg-[#3C91A2] hover:text-white hover:-translate-y-1">
                Create Audience
              </button>
            </RouterLink>
            <RouterLink to="/campaigns">
              <button className="relative right-20 w-40 h-40 border border-[#3C91A2] text-lg font-bold text-[#3C91A2] rounded-full shadow-md flex items-center justify-center transition duration-200 transform hover:bg-[#3C91A2] hover:text-white hover:-translate-y-1">
                Manage Campaigns
              </button>
            </RouterLink>
          </div>
        </div>


        <div class="p-6 bg-white border border-gray-200 rounded-xl dark:bg-blue-950 border-gray-700">
          <h5 class="mb-10 text-5xl font-medium text-gray-500 dark:text-gray-400">Data Summary</h5>

          <div className='text-white text-2xl font-bold mb-6'>
            <div className='pb-4'>Total Clients:</div>
            <div className='pb-4'>Audiences Created:</div>
            <div className='pb-4'>Campaigns started:</div>
          </div>

          <RouterLink to="/detailstats">
            <button
              type="button"
              className="mb-3 flex gap-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center group dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-transform duration-700 scale-150"
            >
              <p className="text-md">View Detailed Report</p>
              <div
                className="text-blue-800 bg-white border-2 rounded-full text-sm p-1 text-center inline-flex items-center group-hover:scale-110 transition-transform duration-200"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
                <span className="sr-only">Icon description</span>
              </div>
            </button>
          </RouterLink>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;