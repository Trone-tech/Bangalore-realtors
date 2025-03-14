// This line imports React, which helps us create web pages
import React from 'react';
// This line imports special icons we want to use in our footer
import { Instagram, Twitter, Linkedin, Home } from 'lucide-react';
// This line imports Link, which helps us make clickable links to other pages
import { Link } from 'react-router-dom';

// This is our Footer component - like a reusable piece of a webpage
const Footer = () => {
  return (
    // This is the main footer container with a white background and a border on top
    <footer className="bg-white border-t">
      {/* This container helps keep everything centered and adds some space around the content */}
      <div className="container mx-auto px-4 py-12">
        {/* This creates a grid layout that changes based on screen size */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* This is the first column with our logo */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {/* This adds our home icon */}
              <Home className="h-6 w-6 text-violet-600" />
              {/* This is our company name */}
              <span className="text-xl font-bold">Bangalore Realtors</span>
            </div>
          </div>
          
          {/* This is the second column for selling options */}
          <div>
            {/* This is the title for this section */}
            <h3 className="font-semibold mb-4">SELL A HOME</h3>
            {/* This is a list of links */}
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Request an offer</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Reviews</Link></li>
            </ul>
          </div>

          {/* This is the third column for buying and renting options */}
          <div>
            <h3 className="font-semibold mb-4">BUY, RENT AND SELL</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Buy and sell properties</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Rent home</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Builder trade-up</Link></li>
            </ul>
          </div>

          {/* This is the fourth column for company information */}
          <div>
            <h3 className="font-semibold mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900">Company</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">How it works</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900">Investors</Link></li>
            </ul>
          </div>
        </div>

        {/* This is the bottom section of our footer */}
        <div className="mt-12 pt-8 border-t">
          {/* This makes the content stack on small screens and be side by side on larger screens */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* This is our copyright text */}
            <p className="text-gray-600 mb-4 md:mb-0">©2025 Bangalore Realtors. All rights reserved</p>
            {/* This is our social media links container */}
            <div className="flex space-x-6">
              {/* These are our social media icons that link to our profiles */}
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// This line makes our Footer available to use in other files
export default Footer; 