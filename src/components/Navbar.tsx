import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white fixed w-full top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/" className="text-lg font-semibold text-[#1E1B39]">
              Bangalore Realtors
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/browse" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Rent</Link>
            <Link to="/browse" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Buy</Link>
            <Link to="/browse" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Sell</Link>
            <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About Us</Link>
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
        <div className="md:hidden absolute top-14 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-6 py-3">
            <Link 
              to="/browse" 
              className="block py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Rent
            </Link>
            <Link 
              to="/browse" 
              className="block py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Buy
            </Link>
            <Link 
              to="/browse" 
              className="block py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sell
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 