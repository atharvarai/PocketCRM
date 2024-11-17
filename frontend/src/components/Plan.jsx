import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Plan = () => {
  return (
    <div className='bg-gradient-to-br from-blue-100 to-blue-50 text-center'>
      <h2 className="text-4xl mb-2 font-bold text-blue-600 text-blue-900">Manage your Customer Relations</h2>
      <p className='ml-8 mb-12 text-lg text-blue-700 animate-slide-up'>Get Control over your Data</p>


      <div className='flex justify-center gap-8 pb-20'>
        <img
          src='pie-chart.png'
          alt="pie-chart"
          style={{ filter: 'drop-shadow(1px 5px 1px rgba(0, 0, 0, 0.5))', width: '500px', height: '500px', float: 'left', position: 'absolute', left: '100px', bottom: '-420px' }}
        />
        <img
          src='analytics_img.png'
          alt="Analytics"
          style={{ filter: 'drop-shadow(1px 5px 1px rgba(0, 0, 0, 0.5))', width: '632px', height: '395px' }}
        />

        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-8 dark:bg-blue-950 border-gray-700">
          <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Start with our Free plan</h5>
          <div class="flex items-baseline text-gray-900 dark:text-white">
            <span class="text-3xl font-semibold">₹</span>
            <span class="text-5xl font-extrabold tracking-tight">0</span>
            <span class="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
          </div>
          <ul role="list" class="space-y-5 my-7">
            <li class="flex items-center">
              <svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Contact Management</span>
            </li>
            <li class="flex">
              <svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Campaign Management</span>
            </li>
            <li class="flex">
              <svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Audience Creation</span>
            </li>
            <li class="flex line-through decoration-gray-500">
              <svg class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span class="text-base font-normal leading-tight text-gray-500 ms-3">Sales Pipeline Management</span>
            </li>
            <li class="flex line-through decoration-gray-500">
              <svg class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span class="text-base font-normal leading-tight text-gray-500 ms-3">24×7 phone & email support</span>
            </li>
          </ul>
          <RouterLink to="/register">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Try Now</button>
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Plan;
