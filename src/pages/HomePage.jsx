import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Bangalore Realtors
        </h1>
        <p className="text-xl text-gray-600">
          Find your perfect property in Bangalore
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          to="/admin"
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-2xl font-semibold text-violet-600 mb-2">
            Property Management
          </h2>
          <p className="text-gray-600">
            Manage your property listings and view analytics
          </p>
        </Link>
        
        <Link
          to="/about"
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-2xl font-semibold text-violet-600 mb-2">
            About Us
          </h2>
          <p className="text-gray-600">
            Learn more about Bangalore Realtors
          </p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 