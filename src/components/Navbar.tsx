import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-lg font-medium">Bangalore Realtors</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">Rent</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Buy</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Sell</a>
          </div>

          <div className="flex items-center">
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg">
          <div className="px-4 py-2 space-y-2">
            <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Rent</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Buy</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Sell</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;