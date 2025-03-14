import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Navbar Component
 * 
 * Main navigation component for the application.
 * Features:
 * - Primary navigation (Rent, Buy, Sell) in top-right corner
 * - Mobile menu for additional options
 * - Fixed positioning with shadow for better UX
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuClose = () => setIsMenuOpen(false);

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
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/browse" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Rent</Link>
            <Link to="/browse" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Buy</Link>
            <Link to="/browse" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Sell</Link>
            <Link to="/About" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About US</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={handleMenuToggle}
              className="text-gray-600 hover:text-gray-900"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-6 py-3 space-y-1">
            <Link 
              to="/browse"
              className="block py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded transition-colors"
              onClick={handleMenuClose}
            >
              Rent
            </Link>
            <Link 
              to="/browse"
              className="block py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded transition-colors"
              onClick={handleMenuClose}
            >
              Buy
            </Link>
            <Link 
              to="/browse"
              className="block py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded transition-colors"
              onClick={handleMenuClose}
            >
              Sell
            </Link>
            <div className="h-px bg-gray-200 mx-4"></div>
            <Link 
              to="/about"
              className="block py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded transition-colors"
              onClick={handleMenuClose}
            >
              About US
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 