import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Search, Filter, X, ChevronDown, Loader } from 'lucide-react';
import { propertyService } from '../services/propertyService';

const BrowseProperties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // State for properties and loading
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filters
  const [filters, setFilters] = useState({
    location: queryParams.get('location') || '',
    minPrice: queryParams.get('minPrice') ? parseInt(queryParams.get('minPrice')) : 0,
    maxPrice: queryParams.get('maxPrice') ? parseInt(queryParams.get('maxPrice')) : 1000000,
    propertyType: queryParams.get('propertyType') || '',
    zone: queryParams.get('zone') || '',
    beds: queryParams.get('beds') ? parseInt(queryParams.get('beds')) : 0,
    baths: queryParams.get('baths') ? parseInt(queryParams.get('baths')) : 0,
    minArea: queryParams.get('minArea') ? parseInt(queryParams.get('minArea')) : 0,
    maxArea: queryParams.get('maxArea') ? parseInt(queryParams.get('maxArea')) : 10000,
  });
  
  // State for UI
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.location);
  
  // Bangalore regions/zones
  const bangaloreRegions = [
    { value: '', label: 'All Bangalore' },
    { value: 'North Bangalore', label: 'North Bangalore' },
    { value: 'South Bangalore', label: 'South Bangalore' },
    { value: 'East Bangalore', label: 'East Bangalore' },
    { value: 'West Bangalore', label: 'West Bangalore' },
    { value: 'Central Bangalore', label: 'Central Bangalore' },
  ];
  
  // Property types for dropdown
  const propertyTypes = [
    { value: '', label: 'Any Type' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' },
    { value: 'plot', label: 'Plot' },
    { value: 'commercial', label: 'Commercial' },
  ];
  
  // Bed options for dropdown
  const bedOptions = [
    { value: 0, label: 'Any' },
    { value: 1, label: '1+' },
    { value: 2, label: '2+' },
    { value: 3, label: '3+' },
    { value: 4, label: '4+' },
    { value: 5, label: '5+' },
  ];
  
  // Bath options for dropdown
  const bathOptions = [
    { value: 0, label: 'Any' },
    { value: 1, label: '1+' },
    { value: 2, label: '2+' },
    { value: 3, label: '3+' },
    { value: 4, label: '4+' },
  ];
  
  // Price ranges
  const priceRanges = [
    { min: 0, max: 10000, label: 'Under ₹10,000' },
    { min: 10000, max: 25000, label: '₹10,000 - ₹25,000' },
    { min: 25000, max: 50000, label: '₹25,000 - ₹50,000' },
    { min: 50000, max: 100000, label: '₹50,000 - ₹1,00,000' },
    { min: 100000, max: 1000000, label: 'Above ₹1,00,000' },
  ];
  
  // Fetch properties based on filters
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Use the searchProperties function from propertyService
        const results = await propertyService.searchProperties(filters);
        setProperties(results);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to fetch properties. Please try again later.');
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
    
    // Update URL with filters
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== 0 && !(key.includes('max') && value === 1000000) && !(key.includes('maxArea') && value === 10000)) {
        params.append(key, value);
      }
    });
    
    navigate({ search: params.toString() }, { replace: true });
  }, [filters, navigate]);
  
  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    handleFilterChange('location', searchInput);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: 0,
      maxPrice: 1000000,
      propertyType: '',
      zone: '',
      beds: 0,
      baths: 0,
      minArea: 0,
      maxArea: 10000,
    });
    setSearchInput('');
  };
  
  // Format price for display
  const formatPrice = (price, priceType) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };
  
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Properties in Bangalore
          </h1>
          <p className="text-gray-600 mt-2">
            Find your perfect property in Bangalore
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Main Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by location, e.g., Banasawadi, Bangalore"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                {searchInput && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => {
                      setSearchInput('');
                      handleFilterChange('location', '');
                    }}
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-3 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
                >
                  <Filter size={18} />
                  <span>Filters</span>
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
                >
                  <Search size={18} />
                  <span>Search</span>
                </button>
              </div>
            </div>
            
            {/* Region Tabs */}
            <div className="flex flex-wrap gap-2">
              {bangaloreRegions.map((region) => (
                <button
                  key={region.value}
                  type="button"
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    filters.zone === region.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleFilterChange('zone', region.value)}
                >
                  {region.label}
                </button>
              ))}
            </div>
            
            {/* Advanced Filters */}
            {showFilters && (
              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    >
                      {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Range
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={`${filters.minPrice}-${filters.maxPrice}`}
                      onChange={(e) => {
                        const [min, max] = e.target.value.split('-').map(Number);
                        handleFilterChange('minPrice', min);
                        handleFilterChange('maxPrice', max);
                      }}
                    >
                      <option value="0-1000000">Any Price</option>
                      {priceRanges.map((range) => (
                        <option key={range.label} value={`${range.min}-${range.max}`}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bedrooms
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={filters.beds}
                      onChange={(e) => handleFilterChange('beds', parseInt(e.target.value))}
                    >
                      {bedOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Bathrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bathrooms
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={filters.baths}
                      onChange={(e) => handleFilterChange('baths', parseInt(e.target.value))}
                    >
                      {bathOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {loading ? 'Searching...' : `${properties.length} properties found`}
          </p>
          
          {/* Sort Options */}
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Sort by:</span>
            <select
              className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => {
                // Implement sorting logic here
                const value = e.target.value;
                let sortedProperties = [...properties];
                
                if (value === 'price-asc') {
                  sortedProperties.sort((a, b) => parseInt(a.price) - parseInt(b.price));
                } else if (value === 'price-desc') {
                  sortedProperties.sort((a, b) => parseInt(b.price) - parseInt(a.price));
                } else if (value === 'newest') {
                  sortedProperties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                }
                
                setProperties(sortedProperties);
              }}
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        {/* Properties Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader size={24} className="animate-spin text-indigo-600 mr-2" />
            <span>Loading properties...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-800 mb-6">
            <p>{error}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any properties matching your search criteria.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={property.images?.[0] || '/assets/tentimage.png'}
                    alt={property.title}
                    className="w-full h-48 object-cover"
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
                      {property.priceType === 'month' && (
                        <span className="text-gray-500 text-sm font-normal">/month</span>
                      )}
                    </h3>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-1">{property.title}</h4>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin size={14} className="mr-1" />
                    <span>{property.location}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
                    <div className="flex items-center">
                      <img src="/assets/Bed.png" alt="Beds" className="w-4 h-4 mr-1" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <img src="/assets/Bath.png" alt="Baths" className="w-4 h-4 mr-1" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <img src="/assets/Square Meters.png" alt="Area" className="w-4 h-4 mr-1" />
                      <span>{property.area} {property.areaUnit || 'sqft'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Pagination (if needed) */}
        {properties.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center">
              <button className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border-t border-b border-gray-300 bg-indigo-50 text-indigo-600">
                1
              </button>
              <button className="px-3 py-1 border-t border-b border-gray-300 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border-t border-b border-gray-300 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseProperties; 