import React from 'react';

const Company = () => {
  return (
    <section className="bg-blue-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap">

          <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
            <h2 className="text-3xl font-semibold">See Xeno in Action!</h2>
            <p className="mt-4 text-blue-200">
              Catch us on YouTube talking about the CRM world
            </p>

            {/* Embedded YouTube Video */}
            <div className="mt-8">
              <iframe
                width="100%"
                height="300"
                src="https://www.youtube.com/embed/u14ps8LoptY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0 flex flex-col justify-center items-center">
            <h2 className="text-5xl font-semibold mb-16 text-center">Key Statistics</h2>
            <div className='flex justify-center'>
              <div className='flex flex-col items-center mx-4'>
                <div className='flex items-center py-2'>
                  <span className='mr-2 text-3xl text-green-500'>60x</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#22c55e" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"></path>
                  </svg>
                </div>
                <p className='text-xl'>ROI on Marketing Spends</p>
              </div>

              <div className='flex flex-col items-center mx-4'>
                <div className='flex items-center py-2'>
                  <span className='mr-2 text-3xl text-green-500'>12%</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#22c55e" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"></path>
                  </svg>
                </div>
                <p className='text-xl'>Repeat Sales</p>
              </div>

              <div className='flex flex-col items-center mx-4'>
                <div className='flex items-center py-2'>
                  <span className='mr-2 text-3xl text-green-500'>15%</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#22c55e" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path>
                  </svg>
                </div>
                <p className='text-xl'>Reduction in Single-Visit</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;