import React, { useState } from 'react';
import { Menu, Home, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-violet-600" />
            <span className="text-xl font-bold">Bangalore Realtors</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">Rent</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Buy</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Sell</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Manage Property</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Resources</a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-600 hover:text-gray-900">Login</button>
            <button className="hidden md:block bg-violet-600 text-white px-4 py-2 rounded-lg">Sign up</button>
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
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
          <div className="px-4 py-2 space-y-2">
            <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Rent</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Buy</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Sell</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Manage Property</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Resources</a>
            <div className="pt-2 border-t">
              <button className="w-full text-center py-2 text-gray-600 hover:text-gray-900">Login</button>
              <button className="w-full text-center py-2 bg-violet-600 text-white rounded-lg mt-2">Sign up</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;