import React from 'react';
import "../index.css";

const Info = () => {
  const companies = Array.from({ length: 12 }, (_, i) => ({
    name: `Company ${i + 1}`,
    imgSrc: `company${i + 1}.webp`,
  }));

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900">Join Our Esteemed Clients</h2>
        <p className="text-lg text-blue-700 mt-4">
          Our CRM software is trusted by top companies worldwide
        </p>
      </div>

      <div className="overflow-hidden whitespace-nowrap relative">
        <div className="flex animate-marquee">
          {companies.map((company, index) => (
            <div
              key={index}
              className="text-blue-900 font-medium text-lg min-w-max bg-gray-100 border border-gray-300 rounded-md p-6 flex items-center justify-center mx-2"
            >
              <img
                src={company.imgSrc}
                alt={company.name}
                className="h-20 w-20 object-contain"
              />
            </div>
          ))}
          {companies.map((company, index) => (
            <div
              key={`duplicate-${index}`}
              className="text-blue-900 font-medium text-lg min-w-max bg-gray-100 border border-gray-300 rounded-md p-6 flex items-center justify-center mx-2"
            >
              <img
                src={company.imgSrc}
                alt={company.name}
                className="h-20 w-20 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Info;