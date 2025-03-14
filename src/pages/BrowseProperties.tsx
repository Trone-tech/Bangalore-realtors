import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Home, Instagram, Twitter, Linkedin, Search, SlidersHorizontal } from 'lucide-react';
import { propertyService, Property } from '../services/propertyService';

const BrowseProperties = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const propertiesList = await propertyService.getAllProperties();
        setProperties(propertiesList);
      } catch (error) {
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(property =>
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by region
    if (selectedRegion !== 'all') {
      result = result.filter(property => property.region === selectedRegion);
    }

    // Sort properties
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.priceNum - b.priceNum);
        break;
      case 'price-high':
        result.sort((a, b) => b.priceNum - a.priceNum);
        break;
      case 'newest':
      default:
        // Keep original order for newest
        break;
    }

    return result;
  }, [searchTerm, selectedRegion, sortBy, properties]);

  const handlePropertyClick = (id: string) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-violet-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Property</h1>
          <p className="text-lg text-violet-100 mb-8">Browse through our extensive collection of premium properties</p>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location or title..."
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-violet-800 hover:bg-violet-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-violet-600" />
              <h2 className="text-lg font-semibold">Filter by Region</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setSelectedRegion('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedRegion === 'all' 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Regions
              </button>
              <button 
                onClick={() => setSelectedRegion('north')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedRegion === 'north' 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                North Bangalore
              </button>
              <button 
                onClick={() => setSelectedRegion('south')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedRegion === 'south' 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                South Bangalore
              </button>
              <button 
                onClick={() => setSelectedRegion('east')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedRegion === 'east' 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                East Bangalore
              </button>
              <button 
                onClick={() => setSelectedRegion('west')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedRegion === 'west' 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                West Bangalore
              </button>
            </div>
          </div>
        </div>

        {/* Results Count and Sort */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredProperties.length} Properties Available
            {selectedRegion !== 'all' && ` in ${selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)} Bangalore`}
          </h2>
          <select 
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        ) : (
          /* Property Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                onClick={() => property.id && handlePropertyClick(property.id)}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative">
                  {property.popular && (
                    <div className="absolute left-4 top-4 bg-violet-600 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 font-medium">
                      <img src="/assets/Vector.png" alt="Star" className="w-4 h-4" />
                      <span>POPULAR</span>
                    </div>
                  )}
                  <img 
                    src={property.images?.[0] || "/assets/tentimage.png"} 
                    alt={property.title} 
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline">
                      <span className="text-violet-600 text-2xl font-semibold">₹</span>
                      <span className="text-2xl font-semibold">{property.price}</span>
                      <span className="text-gray-500 text-sm ml-1">/month</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
                    <p className="text-gray-500 text-sm">{property.location}</p>
                  </div>
                  <div className="flex items-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                      <img src="/assets/Bed.png" alt="Beds" className="w-5 h-5" />
                      <span className="text-gray-600">{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/assets/Bath.png" alt="Bathrooms" className="w-5 h-5" />
                      <span className="text-gray-600">{property.baths} Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/assets/Square Meters.png" alt="Area" className="w-5 h-5" />
                      <span className="text-gray-600">{property.area} m²</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseProperties; 