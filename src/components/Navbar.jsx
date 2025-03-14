import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-violet-600">Bangalore Realtors</span>
            </Link>
          </div>
          
          <div className="flex space-x-8">
            <Link
              to="/admin"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                location.pathname === '/admin'
                  ? 'text-violet-600 border-b-2 border-violet-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Admin
            </Link>
            <Link
              to="/about"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                location.pathname === '/about'
                  ? 'text-violet-600 border-b-2 border-violet-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 