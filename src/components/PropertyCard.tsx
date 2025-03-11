import React from 'react';
import { Heart, Bed, Bath, Square } from 'lucide-react';

const PropertyCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="Property"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-violet-600 text-white px-3 py-1 rounded-full text-sm">
          POPULAR
        </div>
        <button className="absolute top-3 right-3 p-1.5 hover:bg-violet-100 rounded-full transition-colors">
          <Heart className="h-5 w-5 text-violet-600" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-violet-600 text-xl font-semibold">₹2,095</span>
              <span className="text-gray-500">/month</span>
            </div>
            <h3 className="font-semibold text-gray-900 mt-1">Lorem Ipsum</h3>
            <p className="text-gray-500 text-sm">Banaswadi, Bangalore-xxx</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>3 Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>2 Bathrooms</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>5x7 m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;