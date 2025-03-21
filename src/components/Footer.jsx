import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Bangalore Realtors</h3>
            <p className="text-gray-400 mt-2">
              Your trusted partner for finding the perfect property in Bangalore. We bring you the best listings with transparent pricing and expert guidance.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                <Linkedin size={20} />
              </a>
          </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/buy" className="text-gray-400 hover:text-white transition-colors">Buy</Link>
              </li>
              <li>
                <Link to="/rent" className="text-gray-400 hover:text-white transition-colors">Rent</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-400 hover:text-white transition-colors">Admin</Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Popular Areas */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Popular Areas</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/buy?zone=North%20Bangalore" className="text-gray-400 hover:text-white transition-colors">North Bangalore</Link>
              </li>
              <li>
                <Link to="/buy?zone=South%20Bangalore" className="text-gray-400 hover:text-white transition-colors">South Bangalore</Link>
              </li>
              <li>
                <Link to="/buy?zone=East%20Bangalore" className="text-gray-400 hover:text-white transition-colors">East Bangalore</Link>
              </li>
              <li>
                <Link to="/buy?zone=West%20Bangalore" className="text-gray-400 hover:text-white transition-colors">West Bangalore</Link>
              </li>
              <li>
                <Link to="/buy?zone=Central%20Bangalore" className="text-gray-400 hover:text-white transition-colors">Central Bangalore</Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mt-1 mr-3 text-indigo-400 flex-shrink-0" />
                <span className="text-gray-400">123 MG Road, Bangalore, Karnataka 560001, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-indigo-400 flex-shrink-0" />
                <a href="tel:+918012345678" className="text-gray-400 hover:text-white transition-colors">+91 80 1234 5678</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-indigo-400 flex-shrink-0" />
                <a href="mailto:info@bangalorerealtors.com" className="text-gray-400 hover:text-white transition-colors">info@bangalorerealtors.com</a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Bangalore Realtors. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">Sitemap</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 