import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Logo Component
 * 
 * Renders the company logo/name as a link to the homepage.
 * Maintains consistent styling and branding across the application.
 */
const Logo: React.FC = () => {
  return (
    <div>
      <Link to="/" className="text-lg font-semibold text-[#1E1B39]">
        Bangalore Realtors
      </Link>
    </div>
  );
};

export default Logo; 