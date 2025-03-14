import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-16">
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column */}
          <div className="max-w-xl">
            <h1 className="text-[32px] md:text-[40px] font-bold mb-3 text-[#1E1B39] leading-tight">
              Buy, rent, or sell<br />your property<br />easily
            </h1>
            <p className="text-[#6B7280] text-base mb-8">
              A great platform to buy, sell, or even rent your properties.
            </p>
            
            <div className="flex gap-12 mb-8">
              <div>
                <div className="text-violet-600 text-2xl font-bold">50k+</div>
                <div className="text-[#6B7280] text-sm">renters</div>
              </div>
              <div>
                <div className="text-violet-600 text-2xl font-bold">10k+</div>
                <div className="text-[#6B7280] text-sm">properties</div>
              </div>
            </div>

            <Link to="/browse">
              <button className="bg-violet-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-violet-700 transition-colors w-full sm:w-auto">
                Browse Properties
              </button>
            </Link>
          </div>

          {/* Right Column - Map and Property */}
          <div className="relative block">
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] mt-8 lg:mt-0">
              {/* Map */}
              <div className="absolute inset-0">
                <img 
                  src="/assets/map.png" 
                  alt="Map" 
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Property Images */}
                <div className="absolute top-[5%] md:top-[10%] right-[5%] md:right-[10%] w-36 md:w-48 transform transition-transform hover:scale-105">
                  <img 
                    src="/assets/tentimage.png" 
                    alt="Property 1" 
                    className="w-full rounded-lg shadow-lg property-image"
                  />
                  <div className="bg-white p-2 rounded-lg mt-2 shadow-sm">
                    <div className="text-sm font-medium">₹22,000/month</div>
                    <div className="text-xs text-gray-500">Lorem Ipsum</div>
                  </div>
                </div>
                <div className="absolute bottom-[5%] md:bottom-[10%] left-[5%] md:left-[10%] w-36 md:w-48 transform transition-transform hover:scale-105">
                  <img 
                    src="/assets/tentimage.png" 
                    alt="Property 2" 
                    className="w-full rounded-lg shadow-lg property-image"
                  />
                  <div className="bg-white p-2 rounded-lg mt-2 shadow-sm">
                    <div className="text-sm font-medium">₹20,000/month</div>
                    <div className="text-xs text-gray-500">Lorem Ipsum</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 