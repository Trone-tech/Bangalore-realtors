import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { propertyService } from '../services/propertyService';

const NewHomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text and Stats */}
            <div className="pr-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Buy, rent, or sell<br />your property<br />easily
              </h1>
              <p className="text-gray-600 mb-8">
                A great platform to buy, sell, or even rent your properties without any commissions.
              </p>
              
              {/* Stats */}
              <div className="flex gap-12 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-indigo-600">50k+</h3>
                  <p className="text-sm text-gray-500">renters</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-indigo-600">10k+</h3>
                  <p className="text-sm text-gray-500">properties</p>
                </div>
              </div>
              
              {/* Browse Button */}
              <Link 
                to="/browse" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium inline-block"
              >
                Browse Properties
              </Link>
            </div>
            
            {/* Right Column - Map */}
            <div className="relative">
              <img 
                src="/assets/map.png" 
                alt="Bangalore Map" 
                className="w-full h-auto rounded-lg"
              />
              
              {/* Map Markers */}
              <div className="absolute top-1/4 left-1/3 bg-indigo-600 w-3 h-3 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 bg-indigo-600 w-3 h-3 rounded-full"></div>
              <div className="absolute bottom-1/3 right-1/4 bg-indigo-600 w-3 h-3 rounded-full"></div>
              
              {/* Property Card on Map */}
              <div className="absolute bottom-16 right-16 bg-white rounded-lg shadow-lg p-3 w-48">
                <img 
                  src="/assets/1.png" 
                  alt="Property" 
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <h4 className="font-semibold text-sm">₹1.2 Cr</h4>
                <p className="text-xs text-gray-500">Luxury Apartment</p>
                <div className="flex items-center text-xs mt-1 text-gray-500">
                  <span className="mr-2">3 Beds</span>
                  <span className="mr-2">2 Baths</span>
                  <span>2400 sq.ft</span>
                </div>
              </div>
              
              {/* Circular Markers */}
              <div className="absolute top-1/4 right-1/4 bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center">
                <div className="bg-indigo-600 w-4 h-4 rounded-full"></div>
              </div>
              <div className="absolute top-1/3 left-1/4 bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center">
                <div className="bg-indigo-600 w-4 h-4 rounded-full"></div>
              </div>
              <div className="absolute bottom-1/4 left-1/3 bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center">
                <div className="bg-indigo-600 w-4 h-4 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Illustration */}
            <div className="flex justify-center">
              <img 
                src="/assets/Illustration.png" 
                alt="Property Illustration" 
                className="w-full max-w-md"
              />
            </div>
            
            {/* Right Column - Features */}
            <div>
              <div className="max-w-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {/* The new way to find your new Dream Property */}
                </h2>
                <p className="text-gray-600 mb-8">
                  {/* Find your dream place to live in with more than 10k+ properties listed. */}
                </p>
                
                {/* Features Box */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Feature 1 */}
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <img src="/assets/s1.png" alt="Property Insurance" className="w-10 h-10" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Property Insurance</h3>
                        <p className="text-gray-600 text-sm">
                          We offer our customer property protection of liability coverage and insurance for their better life.
                        </p>
                      </div>
                    </div>
                    
                    {/* Feature 2 */}
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <img src="/assets/s2.png" alt="Best Price" className="w-10 h-10" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Best Price</h3>
                        <p className="text-gray-600 text-sm">
                          Not sure what you should be charging for your property? No need to worry, let us do the numbers for you.
                        </p>
                      </div>
                    </div>
                    
                    {/* Feature 3 */}
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <img src="/assets/s3.png" alt="Lowest Commission" className="w-10 h-10" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Lowest Commission</h3>
                        <p className="text-gray-600 text-sm">
                          You no longer have to negotiate commissions and haggle with other agents; it only cost 2%!
                        </p>
                      </div>
                    </div>
                    
                    {/* Feature 4 */}
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <img src="/assets/s4.png" alt="Overall Control" className="w-10 h-10" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Overall Control</h3>
                        <p className="text-gray-600 text-sm">
                          Get a virtual tour and schedule visits before you rent or buy any properties. You get overall control.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Properties Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Based on your location</h2>
          <p className="text-gray-600 mb-8">Some of our picked properties near you location.</p>
          
          <div className="flex justify-end mb-6">
            <Link 
              to="/browse" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Browse more properties
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center py-12">
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
                <p className="mt-4 text-gray-600">Loading properties...</p>
              </div>
            ) : error ? (
              <div className="col-span-3 text-center py-12 text-red-600">
                {error}
              </div>
            ) : properties.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-600">No properties found. Please check back later.</p>
              </div>
            ) : (
              properties.slice(0, 6).map((property) => (
                <Link key={property.id} to={`/property/${property.id}`} className="block">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative">
                      <img 
                        src={property.images && property.images.length > 0 ? property.images[0] : '/assets/tentimage.png'} 
                        alt={property.title}
                        onError={(e) => {e.target.src = '/assets/tentimage.png'}}
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {property.popular && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-md flex items-center">
                            <img src="/assets/Vector.png" alt="Star" className="w-3 h-3 mr-1" />
                            POPULAR
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-indigo-600 font-bold">
                          {formatPrice(property.price)}
                          <span className="text-gray-500 text-sm font-normal">
                            {getListingTypeText(property)}
                          </span>
                        </h3>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 mb-1 hover:text-indigo-600 transition-colors duration-300">
                        {property.title}
                      </h4>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin size={14} className="mr-1" />
                        <span>{property.location}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
                        <div className="flex items-center group">
                          <img src="/assets/Bed.png" alt="Beds" className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                          <span className="group-hover:text-indigo-600 transition-colors duration-300">
                            {getBedsText(property)}
                          </span>
                        </div>
                        <div className="flex items-center group">
                          <img src="/assets/Bath.png" alt="Baths" className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                          <span className="group-hover:text-indigo-600 transition-colors duration-300">
                            {getBathsText(property)}
                          </span>
                        </div>
                        <div className="flex items-center group">
                          <img src="/assets/Square Meters.png" alt="Area" className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                          <span className="group-hover:text-indigo-600 transition-colors duration-300">
                            {getAreaText(property)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Sell Fast, Buy Safe Section */}
      <div className="bg-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Sell <span className="text-indigo-300">Fast</span>, Buy <span className="text-indigo-300">Safe</span></h2>
            <p className="text-indigo-100 max-w-3xl mx-auto">
              Whether it's selling your current home, getting financing, or buying a new home, we make it easy and efficient. The best part? You'll save a bunch of money and time with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-6">
                <img 
                  src="/assets/tentimage.png" 
                  alt="Smartphone with property app" 
                  className="w-full h-40 object-cover rounded-lg mb-6"
                />
                <h3 className="text-indigo-900 font-bold text-xl mb-2">Simplified without wait</h3>
                <p className="text-gray-600 mb-4">
                  Sell your property using our hassle-free service. We aim to make the process as smooth and efficient as possible.
                </p>
                <Link 
                  to="/sell" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-6">
                <img 
                  src="/assets/tentimage.png" 
                  alt="Person using laptop" 
                  className="w-full h-40 object-cover rounded-lg mb-6"
                />
                <h3 className="text-indigo-900 font-bold text-xl mb-2">Hassle-free property selling</h3>
                <p className="text-gray-600 mb-4">
                  List your property with us and let our experts handle everything, from marketing to closing the deal.
                </p>
                <Link 
                  to="/sell" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-6">
                <img 
                  src="/assets/tentimage.png" 
                  alt="Person on phone" 
                  className="w-full h-40 object-cover rounded-lg mb-6"
                />
                <h3 className="text-indigo-900 font-bold text-xl mb-2">Get assistance throughout</h3>
                <p className="text-gray-600 mb-4">
                  Receive assistance throughout your property purchase journey. We are with you at every step.
                </p>
                <Link 
                  to="/buy" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer>
        {/* White Footer */}
        <div className="bg-white py-10 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Column 1 */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Bangalore Realtors</h3>
              </div>
              
              {/* Column 2 */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">SELL A HOME</h3>
                <ul className="space-y-2">
                  <li><Link to="/request" className="text-gray-600 hover:text-indigo-600">Request an offer</Link></li>
                  <li><Link to="/pricing" className="text-gray-600 hover:text-indigo-600">Pricing</Link></li>
                  <li><Link to="/reviews" className="text-gray-600 hover:text-indigo-600">Reviews</Link></li>
                </ul>
              </div>
              
              {/* Column 3 */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">BUY, RENT AND SELL</h3>
                <ul className="space-y-2">
                  <li><Link to="/buy" className="text-gray-600 hover:text-indigo-600">Buy and sell properties</Link></li>
                  <li><Link to="/rent" className="text-gray-600 hover:text-indigo-600">Rent homes</Link></li>
                  <li><Link to="/builders" className="text-gray-600 hover:text-indigo-600">Builder trade-up</Link></li>
                </ul>
              </div>
              
              {/* Column 4 */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">ABOUT</h3>
                <ul className="space-y-2">
                  <li><Link to="/company" className="text-gray-600 hover:text-indigo-600">Company</Link></li>
                  <li><Link to="/careers" className="text-gray-600 hover:text-indigo-600">Careers</Link></li>
                  <li><Link to="/contact" className="text-gray-600 hover:text-indigo-600">Contact</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">TERMS & PRIVACY</h3>
                  <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                    <li><Link to="/trust" className="text-gray-600 hover:text-indigo-600">Trust & Safety</Link></li>
                    <li><Link to="/terms" className="text-gray-600 hover:text-indigo-600">Terms of Service</Link></li>
                    <li><Link to="/privacy" className="text-gray-600 hover:text-indigo-600">Privacy Policy</Link></li>
                  </ul>
                </div>
                
                <div className="mt-6 md:mt-0">
                  <h3 className="font-bold text-gray-900 mb-4">BUY A HOME</h3>
                  <ul>
                    <li><Link to="/buy" className="text-gray-600 hover:text-indigo-600">Buy</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-gray-500 text-sm">
                ©2024 Bangalore Realtors. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewHomePage; 