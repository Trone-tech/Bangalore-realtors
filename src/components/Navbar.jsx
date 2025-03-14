import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/" className="text-sm font-medium text-[#1E1B39]">
              Bangalore Realtors
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/browse" className="text-sm text-gray-600 hover:text-gray-900">Rent</Link>
            <Link to="/browse" className="text-sm text-gray-600 hover:text-gray-900">Buy</Link>
            <Link to="/browse" className="text-sm text-gray-600 hover:text-gray-900">Sell</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 py-3">
            <Link to="/browse" className="block py-2 text-sm text-gray-600 hover:text-gray-900">Rent</Link>
            <Link to="/browse" className="block py-2 text-sm text-gray-600 hover:text-gray-900">Buy</Link>
            <Link to="/browse" className="block py-2 text-sm text-gray-600 hover:text-gray-900">Sell</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 