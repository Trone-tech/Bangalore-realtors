import React from 'react';
import { Link } from 'react-router-dom';
import { NavLinks } from './NavLinks';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileNav Component
 * 
 * Renders the mobile version of the navigation menu.
 * Only visible on small screens (below md: breakpoint).
 * Includes a dropdown menu with navigation links and styling for mobile view.
 * 
 * @param {boolean} isOpen - Controls the visibility of the mobile menu
 * @param {() => void} onClose - Callback function to close the mobile menu
 */
const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-14 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
      <div className="container mx-auto px-6 py-3 space-y-1">
        {NavLinks.map((link, index) => (
          <React.Fragment key={link.path}>
            <Link 
              to={link.path}
              className="block py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded transition-colors"
              onClick={onClose}
            >
              {link.label}
            </Link>
            {/* Add divider before Admin link */}
            {link.label === 'About Us' && <div className="h-px bg-gray-200 mx-4"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MobileNav; 