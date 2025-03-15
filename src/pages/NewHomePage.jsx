import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Search, Home, Building, Star, ChevronRight, Clock } from 'lucide-react';
import { propertyService } from '../services/propertyService';

const NewHomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
      window.location.href = `/browse?location=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Updated with modern design and animations */}
      <div className="relative bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-indigo-300 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-300 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text and Search */}
              <div className="pr-8 animate-fadeIn">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
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
                <div className="flex gap-12 mb-8">
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
              
              {/* Right Column - Hero Image */}
              <div className="relative animate-fadeInRight">
                <img 
                  src="/assets/hero-house.png" 
                  alt="Modern Bangalore Home" 
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover transform transition-all duration-500 hover:scale-[1.02]"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-10 -left-10 bg-white rounded-lg shadow-xl p-4 w-64 animate-float">
                  <div className="flex items-center mb-2">
                    <Star className="text-yellow-500 h-5 w-5 mr-1" />
                    <Star className="text-yellow-500 h-5 w-5 mr-1" />
                    <Star className="text-yellow-500 h-5 w-5 mr-1" />
                    <Star className="text-yellow-500 h-5 w-5 mr-1" />
                    <Star className="text-yellow-500 h-5 w-5" />
                  </div>
                  <p className="text-gray-700 text-sm italic">"Found my dream home in Indiranagar through Bangalore Realtors. The process was seamless!"</p>
                  <p className="text-right text-indigo-600 text-sm mt-2 font-medium">- Rahul S.</p>
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
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked premium properties in the most desirable locations across Bangalore
            </p>
              </div>
              
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.filter(property => property.featured).slice(0, 3).map((property, index) => (
              <Link 
                key={property.id} 
                to={`/property/${property.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group animate-fadeInUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative">
                  <img 
                    src={property.images?.[0] || '/assets/tentimage.png'} 
                    alt={property.title} 
                    className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                  </div>
                  {property.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        Popular
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                    {property.title}
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="text-indigo-500 h-4 w-4 mr-1" />
                    <p className="text-gray-600 text-sm">{property.location}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Beds</p>
                      <p className="font-medium">{getBedsText(property)}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Baths</p>
                      <p className="font-medium">{getBathsText(property)}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Area</p>
                      <p className="font-medium">{getAreaText(property)}</p>
                    </div>
              </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-indigo-600">
                      {formatPrice(property.price)}{getListingTypeText(property)}
                    </p>
                    <div className="group-hover:translate-x-1 transition-transform duration-300">
                      <ChevronRight className="h-5 w-5 text-indigo-500" />
              </div>
              </div>
            </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/browse"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium inline-flex items-center transition-all duration-300 hover:shadow-lg transform hover:scale-105 animate-pulse"
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
                to="/browse?listingType=sale" 
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium inline-flex items-center shadow-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <Home className="mr-2 h-5 w-5" />
                Buy Property
              </Link>
            <Link 
                to="/browse?listingType=rent" 
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
      
      {/* Footer */}
      <footer>
        {/* White Footer */}
        <div className="bg-white py-16 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Column 1 */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Bangalore Realtors</h3>
                <p className="text-gray-600 mb-4">Your trusted partner in finding the perfect property in Bangalore.</p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Column 2 */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">SELL A HOME</h3>
                <ul className="space-y-2">
                  <li><Link to="/request" className="text-gray-600 hover:text-indigo-600 transition-colors">Request an offer</Link></li>
                  <li><Link to="/pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</Link></li>
                  <li><Link to="/reviews" className="text-gray-600 hover:text-indigo-600 transition-colors">Reviews</Link></li>
                </ul>
              </div>
              
              {/* Column 3 */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">BUY, RENT AND SELL</h3>
                <ul className="space-y-2">
                  <li><Link to="/buy" className="text-gray-600 hover:text-indigo-600 transition-colors">Buy and sell properties</Link></li>
                  <li><Link to="/rent" className="text-gray-600 hover:text-indigo-600 transition-colors">Rent homes</Link></li>
                  <li><Link to="/builders" className="text-gray-600 hover:text-indigo-600 transition-colors">Builder trade-up</Link></li>
                </ul>
              </div>
              
              {/* Column 4 */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">ABOUT</h3>
                <ul className="space-y-2">
                  <li><Link to="/company" className="text-gray-600 hover:text-indigo-600 transition-colors">Company</Link></li>
                  <li><Link to="/careers" className="text-gray-600 hover:text-indigo-600 transition-colors">Careers</Link></li>
                  <li><Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm">
                  ©2024 Bangalore Realtors. All rights reserved.
                </p>
                <div className="mt-4 md:mt-0">
                  <ul className="flex flex-wrap space-x-6">
                    <li><Link to="/terms" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Terms of Service</Link></li>
                    <li><Link to="/privacy" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Privacy Policy</Link></li>
                    <li><Link to="/trust" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Trust & Safety</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewHomePage; 