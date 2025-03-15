import React, { useState } from 'react';
import { Search, MapPin, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    priceRange: ''
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-[80vh] bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Search */}
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Buy, rent, or sell your property in Bangalore today!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find your dream home across different zones of Bangalore with our extensive property listings.
            </p>
            
            {/* Search Box */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Find Your Property</h2>
              
              <div className="space-y-4">
                {/* Location */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                      name="location"
                      value={searchParams.location}
                      onChange={handleSearchChange}
                      className="input pl-10 w-full"
                    >
                      <option value="">Select Zone</option>
                      <option value="north">North Bangalore</option>
                      <option value="south">South Bangalore</option>
                      <option value="east">East Bangalore</option>
                      <option value="west">West Bangalore</option>
                      <option value="central">Central Bangalore</option>
                    </select>
                  </div>
                </div>
                
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                      name="propertyType"
                      value={searchParams.propertyType}
                      onChange={handleSearchChange}
                      className="input pl-10 w-full"
                    >
                      <option value="">Select Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="plot">Plot</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                    <select 
                      name="priceRange"
                      value={searchParams.priceRange}
                      onChange={handleSearchChange}
                      className="input pl-10 w-full"
                    >
                      <option value="">Select Price Range</option>
                      <option value="0-5000000">Under ₹50 Lakhs</option>
                      <option value="5000000-10000000">₹50 Lakhs - ₹1 Cr</option>
                      <option value="10000000-20000000">₹1 Cr - ₹2 Cr</option>
                      <option value="20000000-50000000">₹2 Cr - ₹5 Cr</option>
                      <option value="50000000+">Above ₹5 Cr</option>
                    </select>
                  </div>
                </div>
                
                {/* Search Button */}
                <Link 
                  to="/browse" 
                  className="btn btn-primary w-full flex items-center justify-center gap-2 py-3"
                >
                  <Search size={18} />
                  Search Properties
                </Link>
              </div>
            </div>
            
            {/* Popular Searches */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Popular searches</h3>
              <div className="flex flex-wrap gap-2">
                <Link to="/browse?location=whitefield" className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200">
                  Whitefield
                </Link>
                <Link to="/browse?location=indiranagar" className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200">
                  Indiranagar
                </Link>
                <Link to="/browse?location=koramangala" className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200">
                  Koramangala
                </Link>
                <Link to="/browse?location=jayanagar" className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200">
                  Jayanagar
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Column - Map */}
          <div className="rounded-xl overflow-hidden shadow-lg h-[500px] relative">
            <img 
              src="/assets/map.png" 
              alt="Bangalore Map" 
              className="w-full h-full object-cover"
            />
            {/* Map Markers */}
            <div className="absolute top-1/4 left-1/3 bg-violet-600 w-4 h-4 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 bg-violet-600 w-4 h-4 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 bg-violet-600 w-4 h-4 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
