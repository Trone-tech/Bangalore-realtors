import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Search, Home, Building, Star, ChevronRight, Clock, Map } from 'lucide-react';
import { propertyService } from '../services/propertyService';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/InteractiveMap';
import AnimatedPropertyCard from '../components/AnimatedPropertyCard';

const NewHomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredViewMode, setFeaturedViewMode] = useState('grid');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Fetch properties from Firebase
        const fetchedProperties = await propertyService.getAllProperties();
        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Format price for display
  const formatPrice = (price) => {
    // Check if price is already formatted (string with ₹)
    if (typeof price === 'string' && price.includes('₹')) {
      return price;
    }
    
    // Convert to number if it's a string without ₹
    const numPrice = typeof price === 'string' ? parseInt(price.replace(/[^\d]/g, '')) : price;
    
    if (numPrice >= 10000000) {
      return `₹${(numPrice / 10000000).toFixed(2)} Cr`;
    } else if (numPrice >= 100000) {
      return `₹${(numPrice / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${numPrice.toLocaleString()}`;
    }
  };

  // Helper function to get property beds/baths text
  const getBedsText = (property) => {
    return property.beds ? `${property.beds} Bed${property.beds > 1 ? 's' : ''}` : 'N/A';
  };

  const getBathsText = (property) => {
    return property.baths ? `${property.baths} Bath${property.baths > 1 ? 's' : ''}` : 'N/A';
  };

  const getAreaText = (property) => {
    return property.area ? `${property.area} ${property.areaUnit || 'sqft'}` : 'N/A';
  };
  
  // Helper function to determine listing type text
  const getListingTypeText = (property) => {
    return property.listingType === 'rent' ? '/month' : '';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/buy?location=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow">
        {/* Hero Section with Map Background */}
        <div 
          style={{ 
            position: 'relative',
            minHeight: '600px',
            backgroundImage: 'url(/assets/total_map.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay for better text readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          }}></div>
          
          <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '600px',
            margin: '0',
            padding: '48px 0 48px 8%'
          }}>
            <div style={{
              maxWidth: '768px',
              margin: '0',
              textAlign: 'left'
            }}>
              <motion.h1 
                style={{
                  fontSize: 'clamp(1.875rem, 5vw, 3.75rem)',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '24px',
                  lineHeight: '1.2'
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Buy, rent, or sell your property easily
              </motion.h1>
              <motion.p 
                style={{
                  color: '#e5e7eb',
                  fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                  marginBottom: '40px' /* Reduced margin for button */
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                A great platform to buy, sell or even rent your properties.
              </motion.p>
              
              {/* Browse Properties Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link 
                  to="/buy" 
                  style={{
                    display: 'inline-block',
                    padding: '14px 32px',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                    transition: 'all 300ms',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#4338ca';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#4f46e5';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Browse properties
                </Link>
              </motion.div>
              
              {/* Stats with animations */}
              <motion.div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  gap: '16px',
                  marginTop: '40px'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5' }}>50k+</h3>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Happy Clients</p>
                </div>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5' }}>10k+</h3>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Premium Properties</p>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Wave Divider */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" style={{ width: '100%', height: 'auto' }}>
              <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
            </svg>
          </div>
        </div>
        
        {/* Featured Properties Section */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 animate-fadeIn">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Handpicked premium properties in the most desirable locations across Bangalore
              </p>
            </div>
            
            {/* Featured Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.filter(property => property.featured).slice(0, 3).map((property, index) => (
                <AnimatedPropertyCard 
                  key={property.id} 
                  property={property} 
                  index={index}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/buy"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium inline-flex items-center transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                View All Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="bg-gray-50 py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-20 right-20 w-40 h-40 bg-indigo-300 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-300 rounded-full filter blur-3xl animate-blob"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Illustration */}
              <div className="flex justify-center animate-fadeInLeft">
                <img 
                  src="/assets/Illustration.png" 
                  alt="Property Illustration" 
                  className="w-full max-w-md transform transition-all duration-700 hover:-translate-y-4"
                />
              </div>
              
              {/* Right Column - Features */}
              <div className="animate-fadeInRight">
                <div className="max-w-lg">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Why Choose Bangalore Realtors?
                  </h2>
                  <p className="text-gray-600 mb-10">
                    We offer a seamless property experience with exclusive benefits designed for our clients.
                  </p>
                  
                  {/* Features Box */}
                  <div className="space-y-8">
                      {/* Feature 1 */}
                    <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                        <div className="mr-4 mt-1">
                        <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center">
                          <img src="/assets/s1.png" alt="Property Insurance" className="w-8 h-8" />
                        </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Property Insurance</h3>
                          <p className="text-gray-600">
                            We offer our customers property protection and liability coverage for their peace of mind.
                            </p>
                          </div>
                        </div>
                        
                        {/* Feature 2 */}
                      <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                          <div className="mr-4 mt-1">
                          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center">
                            <img src="/assets/s2.png" alt="Best Price" className="w-8 h-8" />
                          </div>
                          </div>
                          <div>
                          <h3 className="font-semibold text-lg mb-2">Best Price Guarantee</h3>
                          <p className="text-gray-600">
                            Not sure what you should be charging for your property? Our market experts provide accurate valuations.
                            </p>
                          </div>
                        </div>
                        
                        {/* Feature 3 */}
                      <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                          <div className="mr-4 mt-1">
                          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center">
                            <img src="/assets/s3.png" alt="Cash Back" className="w-8 h-8" />
                            </div>
                          </div>
                          <div>
                          <h3 className="font-semibold text-lg mb-2">No Commission</h3>
                          <p className="text-gray-600">
                            Unlike traditional agents, we charge no commission. Keep more money in your pocket.
                          </p>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Banner */}
        <div className="bg-indigo-600 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">Ready to find your dream home?</h2>
                <p className="text-indigo-100 max-w-xl">
                  Browse our extensive collection of properties across Bangalore.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  to="/buy" 
                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium inline-flex items-center shadow-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Buy Property
                </Link>
                <Link 
                  to="/rent" 
                  className="bg-transparent text-white border-2 border-white px-6 py-3 rounded-lg font-medium inline-flex items-center hover:bg-white hover:text-indigo-600 transition-colors duration-300"
                >
                  <Building className="mr-2 h-5 w-5" />
                  Rent Property
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* How It Works */}
        <div className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fadeIn">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our simple process makes finding your next property a breeze
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-sm animate-fadeInUp">
                <div className="relative mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <Search className="h-8 w-8 text-indigo-600" />
                  <div className="absolute -right-2 -top-2 w-8 h-8 bg-indigo-600 rounded-full text-white flex items-center justify-center font-bold">1</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Browse Properties</h3>
                <p className="text-gray-600">
                  Search for properties based on your preferences, budget, and desired location.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-sm animate-fadeInUp animation-delay-300">
                <div className="relative mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-indigo-600" />
                  <div className="absolute -right-2 -top-2 w-8 h-8 bg-indigo-600 rounded-full text-white flex items-center justify-center font-bold">2</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Schedule Viewings</h3>
                <p className="text-gray-600">
                  Book property viewings at your convenience through our platform.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-sm animate-fadeInUp animation-delay-600">
                <div className="relative mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <Home className="h-8 w-8 text-indigo-600" />
                  <div className="absolute -right-2 -top-2 w-8 h-8 bg-indigo-600 rounded-full text-white flex items-center justify-center font-bold">3</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Move In</h3>
                <p className="text-gray-600">
                  Complete the paperwork and move into your dream property with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewHomePage; 