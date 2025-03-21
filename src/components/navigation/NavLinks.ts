/**
 * Navigation Link Interface
 * Defines the structure for navigation links used throughout the application
 */
interface NavLink {
  label: string;
  path: string;
}

/**
 * Navigation Links Configuration
 * 
 * Centralized configuration for all navigation links in the application.
 * Used by both desktop and mobile navigation components to maintain consistency.
 * Order of the links determines their display order in the navigation menus.
 */
export const NavLinks: NavLink[] = [
  { label: 'Rent', path: '/rent' },
  { label: 'Buy', path: '/buy' },
  { label: 'Sell', path: '/sell' },
  { label: 'About Us', path: '/about' },
  { label: 'Admin', path: '/admin/dashboard' }
]; 