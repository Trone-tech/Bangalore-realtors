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
  const [hoveredProperty, setHoveredProperty] = useState(null);

  const mapMarkers = [
    { id: 1, x: 25, y: 35, property: { title: "Luxury Villa", location: "North Bangalore", price: 9500000, beds: 4, baths: 3, propertyType: "villa" } },
    { id: 2, x: 65, y: 45, property: { title: "Modern Apartment", location: "South Bangalore", price: 7200000, beds: 3, baths: 2, propertyType: "apartment" } },
    { id: 3, x: 50, y: 70, property: { title: "Garden House", location: "East Bangalore", price: 8100000, beds: 4, baths: 3, propertyType: "house" } },
  ];

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

  // Compact property card component - improved for mobile responsiveness
  const CompactPropertyCard = ({ property }) => (
    <div className="absolute z-20 bg-white rounded-lg shadow-xl p-3 w-56 sm:w-64 transform -translate-x-28 sm:-translate-x-32 -translate-y-[8rem] sm:-translate-y-[9rem] transition-all duration-200 hover:scale-105">
      <div className="font-semibold text-gray-900 mb-1 truncate text-xs sm:text-sm">{property.title}</div>
      <div className="flex items-center text-xs text-gray-600 mb-2">
        <MapPin className="h-3 w-3 mr-1 text-indigo-500" />
        <span className="truncate text-xs">{property.location}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-indigo-600 font-bold text-xs sm:text-sm">{formatPrice(property.price)}</div>
        <div className="flex items-center text-xs text-gray-500">
          <span className="mr-2">{property.beds} bed</span>
          <span>{property.baths} bath</span>
        </div>
      </div>
      <Link 
        to="/buy" 
        className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 flex items-center justify-end"
      >
        View details <ArrowRight className="ml-1 h-3 w-3" />
      </Link>
    </div>
  );

  // Function to handle mobile marker click
  const handleMarkerClick = (id) => {
    if (window.innerWidth < 768) {
      setHoveredProperty(hoveredProperty === id ? null : id);
    }
  };

  // Add custom styles for different screen sizes
  const getCardPosition = (id) => {
    // Adjust card position based on marker location and screen size
    if (window.innerWidth < 640) { // Small mobile screens
      return {
        transform: 'translate(-50%, -100%)',
        left: '50%',
        top: '-5px',
        width: '180px'
      };
    } else {
      // Default positioning for larger screens
      return {};
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow">
        {/* Hero Section with Map */}
        <div className="relative bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-20 left-20 w-40 h-40 bg-indigo-300 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-300 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Column - Text and Search */}
                <div className="pr-0 lg:pr-8 animate-fadeIn order-2 lg:order-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                    Find Your <span className="text-indigo-600">Dream Home</span> in Bangalore
                  </h1>
                  <p className="text-gray-600 text-lg mb-8 max-w-xl">
                    Discover the perfect property in Bangalore's most sought-after neighborhoods. No commission, no hassle.
                  </p>
                  
                  {/* Search Bar */}
                  <div className="bg-white p-2 rounded-full shadow-lg mb-10 flex items-center max-w-lg transition-all duration-300 hover:shadow-xl">
                    <form onSubmit={handleSearch} className="flex w-full">
                      <div className="flex items-center px-4 flex-grow">
                        <MapPin className="text-indigo-500 mr-2 h-5 w-5" />
                        <input 
                          type="text" 
                          placeholder="Search by location, e.g., Koramangala..." 
                          className="w-full outline-none text-gray-700"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full flex items-center transition-all duration-300 transform hover:scale-105"
                      >
                        <Search className="mr-2 h-4 w-4" />
                        <span>Search</span>
                      </button>
                    </form>
                  </div>
                  
                  {/* Stats with animations */}
                  <div className="flex flex-wrap gap-4 md:gap-12 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm animate-fadeInUp animation-delay-300">
                      <h3 className="text-3xl font-bold text-indigo-600">50k+</h3>
                      <p className="text-sm text-gray-500">Happy Clients</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm animate-fadeInUp animation-delay-600">
                      <h3 className="text-3xl font-bold text-indigo-600">10k+</h3>
                      <p className="text-sm text-gray-500">Premium Properties</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm animate-fadeInUp animation-delay-900">
                      <h3 className="text-3xl font-bold text-indigo-600">15+</h3>
                      <p className="text-sm text-gray-500">Years of Experience</p>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Map Image with Markers */}
                <div className="relative animate-fadeInRight order-1 lg:order-2">
                  <div className="relative w-full rounded-2xl shadow-2xl overflow-hidden">
                    <img 
                      src="/assets/map.png" 
                      alt="Bangalore Property Map" 
                      className="w-full h-auto object-cover"
                    />
                    
                    {/* Map Markers with Popups */}
                    {mapMarkers.map((marker) => (
                      <div 
                        key={marker.id} 
                        className="absolute cursor-pointer transform transition-transform hover:scale-110"
                        style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                        onMouseEnter={() => setHoveredProperty(marker.id)}
                        onMouseLeave={() => window.innerWidth >= 768 ? setHoveredProperty(null) : null}
                        onClick={() => handleMarkerClick(marker.id)}
                      >
                        <div className="bg-indigo-600 h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center shadow-md">
                          <div className="bg-white h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full"></div>
                        </div>
                        
                        {/* Pulsing Effect */}
                        <div className="absolute top-0 left-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-indigo-400 opacity-70 animate-ping"></div>
                        
                        {/* Compact Property Card - Only show when hovered/clicked */}
                        {hoveredProperty === marker.id && (
                          <div className="absolute z-20 bg-white rounded-lg shadow-xl p-3 transform transition-all duration-200 hover:scale-105"
                               style={{
                                 width: window.innerWidth < 640 ? '180px' : (window.innerWidth < 768 ? '220px' : '250px'),
                                 ...(window.innerWidth < 640 
                                   ? { left: '-90px', top: '-120px' } 
                                   : { left: '-125px', top: '-150px' })
                               }}
                          >
                            <div className="font-semibold text-gray-900 mb-1 truncate text-xs sm:text-sm">{marker.property.title}</div>
                            <div className="flex items-center text-xs text-gray-600 mb-2">
                              <MapPin className="h-3 w-3 mr-1 text-indigo-500" />
                              <span className="truncate text-xs">{marker.property.location}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-indigo-600 font-bold text-xs sm:text-sm">{formatPrice(marker.property.price)}</div>
                              <div className="flex items-center text-xs text-gray-500">
                                <span className="mr-2">{marker.property.beds} bed</span>
                                <span>{marker.property.baths} bath</span>
                              </div>
                            </div>
                            <Link 
                              to="/buy" 
                              className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 flex items-center justify-end"
                            >
                              View details <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Mobile Instructions */}
                  <div className="md:hidden text-center mt-3 text-xs text-gray-500 italic">
                    Tap on markers to view property details
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
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
            
            {/* View Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-lg p-1 inline-flex">
                <button
                  type="button"
                  onClick={() => setFeaturedViewMode('grid')}
                  className={`px-4 py-2 rounded text-sm font-medium ${
                    featuredViewMode === 'grid' 
                      ? 'bg-white shadow-sm text-indigo-600' 
                      : 'text-gray-600'
                  }`}
                >
                  <span className="flex items-center">
                    <i className="fa fa-th mr-2"></i>
                    Grid View
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeaturedViewMode('map')}
                  className={`px-4 py-2 rounded text-sm font-medium ${
                    featuredViewMode === 'map' 
                      ? 'bg-white shadow-sm text-indigo-600' 
                      : 'text-gray-600'
                  }`}
                >
                  <span className="flex items-center">
                    <Map className="h-4 w-4 mr-1" />
                    Map View
                  </span>
                </button>
              </div>
            </div>
            
            {/* Map View */}
            {featuredViewMode === 'map' && (
              <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
                <InteractiveMap 
                  properties={properties.filter(property => property.featured)} 
                  height="600px" 
                />
              </div>
            )}
            
            {/* Grid View */}
            {featuredViewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.filter(property => property.featured).slice(0, 3).map((property, index) => (
                  <AnimatedPropertyCard 
                    key={property.id} 
                    property={property} 
                    index={index}
                  />
                ))}
              </div>
            )}
            
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