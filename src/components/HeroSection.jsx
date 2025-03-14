import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <img
          src="/assets/hero-bg.jpg"
          alt="Luxury home"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Dream Property in Bangalore
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Discover the perfect property across different zones of Bangalore - 
            North, South, East, West, or Central.
          </p>

          {/* Search Section */}
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select className="input pl-10">
                  <option value="">Select Zone</option>
                  <option value="north">North Bangalore</option>
                  <option value="south">South Bangalore</option>
                  <option value="east">East Bangalore</option>
                  <option value="west">West Bangalore</option>
                  <option value="central">Central Bangalore</option>
                </select>
              </div>

              {/* Property Type */}
              <div className="relative">
                <select className="input">
                  <option value="">Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                </select>
              </div>

              {/* Search Button */}
              <Link to="/browse" className="btn btn-primary flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Search Properties
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50k+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10k+</div>
              <div className="text-gray-300">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="absolute bottom-8 right-8 space-y-4 hidden lg:block">
        <div className="glass p-4 rounded-xl max-w-xs">
          <div className="text-sm font-medium mb-2">Featured Property</div>
          <div className="text-lg font-semibold">Luxury Villa in North Bangalore</div>
          <div className="text-sm text-gray-600 mt-1">Starting from ₹2.5 Cr</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 