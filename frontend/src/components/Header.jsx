import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className="w-full flex text-center py-20 bg-gradient-to-br from-blue-50 to-blue-100 gap-40">

      <div className="flex flex-col m-8">

        <div className='mb-8'>
          <h1 className="text-left me-auto ml-8 text-5xl font-extrabold text-blue-900 mb-4 animate-fade-in">
            Getting Started
          </h1>
          <p className="text-left me-auto ml-8 text-lg text-blue-700 mb-2 max-w-xl animate-slide-up">
            Dive into features that enhance your workflow and drive growth
          </p>
        </div>

        <div className="me-auto features-section pb-16 px-8">
          <div className="flex flex-col">

            <div className="flex feature-box gap-6">
              <h4 className="w-72 text-xl font-semibold p-3 text-blue-600 mb-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-blue-50">
                Analytics Reporting
              </h4>
              <p className="content-center text-xl font-semibold text-blue-900">
                Generate reports and gain insights with analytics
              </p>
            </div>

            <div className="flex feature-box gap-6">
              <h4 className="w-72 text-xl font-semibold p-3 text-blue-600 mb-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-blue-50">
                Contact Organization
              </h4>
              <p className="content-center text-xl font-semibold text-blue-900">
                Organize and access all your contacts in one place
              </p>
            </div>

            <div className="flex feature-box gap-6">
              <h4 className="w-72 text-xl font-semibold p-3 text-blue-600 mb-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-blue-50">
                Task Automation
              </h4>
              <p className="content-center text-xl font-semibold text-blue-900">
                Automate tasks to save time and improve efficiency
              </p>
            </div>

            <div className="flex feature-box gap-6">
              <h4 className="w-72 text-xl font-semibold p-3 text-blue-600 mb-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-blue-50">
                Sales Tracking
              </h4>
              <p className="content-center text-xl font-semibold text-blue-900">
                Visualize and manage your sales pipeline efficiently
              </p>
            </div>
          </div>
        </div>
      </div>


















      <div className="flex flex-col  items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4 animate-fade-in">
            Enhance Your Customer<br />Connections
          </h1>
        </div>
        <p className="text-lg text-blue-700 mb-8 max-w-xl animate-slide-up text-center">
          Optimize Your Engagement with Our Comprehensive CRM Solution
        </p>
        <div className="flex justify-center">
          <RouterLink to="/register">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 focus:ring-4 focus:ring-blue-300 transition transform duration-200 ease-out">
              Get Started
            </button>
          </RouterLink>
          <Link
            activeClass="active"
            to="faq-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
          </Link>
        </div>
      </div>






    </div>
  );
};

export default Header;