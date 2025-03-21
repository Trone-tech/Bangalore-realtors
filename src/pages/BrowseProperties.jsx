import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Search, Filter, X, ChevronDown, Loader, Check } from 'lucide-react';
import { propertyService } from '../services/propertyService';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import AnimatedPropertyCard from '../components/AnimatedPropertyCard';
import InteractiveMap from '../components/InteractiveMap';

const BrowseProperties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // State for properties and loading
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filters - Updated to support multiple zones
  const [filters, setFilters] = useState({
    location: queryParams.get('location') || '',
    minPrice: queryParams.get('minPrice') ? parseInt(queryParams.get('minPrice')) : 0,
    maxPrice: queryParams.get('maxPrice') ? parseInt(queryParams.get('maxPrice')) : 1000000,
    propertyType: queryParams.get('propertyType') || '',
    zones: queryParams.get('zones') ? queryParams.get('zones').split(',') : [],
    beds: queryParams.get('beds') ? parseInt(queryParams.get('beds')) : 0,
    baths: queryParams.get('baths') ? parseInt(queryParams.get('baths')) : 0,
    minArea: queryParams.get('minArea') ? parseInt(queryParams.get('minArea')) : 0,
    maxArea: queryParams.get('maxArea') ? parseInt(queryParams.get('maxArea')) : 10000,
  });
  
  // State for UI
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.location);
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Bangalore regions/zones
  const bangaloreRegions = [
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
        // Prepare filter object for API
        const apiFilters = {
          ...filters,
          zone: filters.zones.length === 1 ? filters.zones[0] : undefined, // For backward compatibility
        };

        // If multiple zones are selected, we need to fetch all properties and filter client-side
        const results = await propertyService.searchProperties(apiFilters);
        
        // If we have multiple zones, filter client-side
        let filteredResults = results;
        if (filters.zones.length > 1) {
          filteredResults = results.filter(property => 
            filters.zones.includes(property.zone)
          );
        }
        
        setProperties(filteredResults);
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
      if (key === 'zones' && value.length > 0) {
        params.append(key, value.join(','));
      }
      else if (value !== '' && value !== 0 && !(key.includes('max') && value === 1000000) && !(key.includes('maxArea') && value === 10000)) {
        params.append(key, value);
      }
    });
    
    navigate({ search: params.toString() }, { replace: true });
  }, [filters, navigate]);
  
  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle zone toggle - New function for multi-select zones
  const toggleZone = (zoneValue) => {
    setFilters(prev => {
      const currentZones = [...prev.zones];
      if (currentZones.includes(zoneValue)) {
        return {
          ...prev,
          zones: currentZones.filter(z => z !== zoneValue)
        };
      } else {
        return {
          ...prev,
          zones: [...currentZones, zoneValue]
        };
      }
    });
  };
  
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    handleFilterChange('location', searchInput);
    setMobileSidebarOpen(false);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: 0,
      maxPrice: 1000000,
      propertyType: '',
      zones: [],
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow">
        {/* Mobile Sidebar Toggle - New for responsive design */}
        <div className="md:hidden bg-white sticky top-0 z-20 px-4 py-2 border-b shadow-sm flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-900">Browse Properties</h1>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-md bg-gray-100 text-gray-700"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Filter size={20} />}
          </button>
        </div>
        
        {/* Mobile Filters Sidebar - New for responsive design */}
        <div className={`fixed inset-0 z-30 transform transition-transform duration-300 md:hidden ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="bg-white h-full w-80 shadow-lg flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-bold text-lg">Filters</h2>
              <button 
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 flex-grow overflow-y-auto">
          <form onSubmit={handleSearch} className="space-y-6">
                {/* Mobile search input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="flex">
                <input
                  type="text"
                      placeholder="Search by location..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                      className="p-2 flex-grow border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700"
                    >
                      <Search size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Mobile zone selection with checkboxes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zones (Select multiple)
                  </label>
                  <div className="space-y-2">
                    {bangaloreRegions.map((region) => (
                      <div key={region.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`mobile-zone-${region.value}`}
                          checked={filters.zones.includes(region.value)}
                          onChange={() => toggleZone(region.value)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`mobile-zone-${region.value}`} className="ml-2 block text-sm text-gray-700">
                          {region.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Rest of mobile filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
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
                
                {/* Apply & Reset buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Reset Filters
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Apply Filters
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Desktop Search Bar */}
          <div className="hidden md:block mb-8">
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Find Your Dream Property</h1>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by location, e.g., Indiranagar, Koramangala..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="pl-10 p-3 w-full border border-gray-300 rounded-md"
                    />
                  </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-2"
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
            
              {/* Zone Dropdown - Multi-Select */}
              <div className="mt-4">
                <div className="relative">
                <button
                  type="button"
                    onClick={() => setShowZoneDropdown(!showZoneDropdown)}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white flex justify-between items-center"
                  >
                    <span className="text-gray-700">
                      {filters.zones.length === 0 
                        ? 'Select zones' 
                        : filters.zones.length === 1 
                          ? bangaloreRegions.find(r => r.value === filters.zones[0])?.label 
                          : `${filters.zones.length} zones selected`}
                    </span>
                    <ChevronDown size={16} className={`transform transition-transform ${showZoneDropdown ? 'rotate-180' : ''}`} />
                </button>
                  
                  {showZoneDropdown && (
                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                      <div className="py-2 max-h-60 overflow-auto">
                        {bangaloreRegions.map((region) => (
                          <div 
                            key={region.value}
                            onClick={() => toggleZone(region.value)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          >
                            <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                              filters.zones.includes(region.value) 
                                ? 'bg-indigo-600 border-indigo-600' 
                                : 'border-gray-300'
                            }`}>
                              {filters.zones.includes(region.value) && (
                                <Check size={14} className="text-white" />
                              )}
                  </div>
                            <span>{region.label}</span>
                  </div>
                        ))}
                  </div>
                </div>
                  )}
                </div>
              </div>
          </form>
        </div>
          
          {/* Active Filters Display */}
          <div className="mb-6 flex flex-wrap gap-2">
            {filters.zones.map(zone => (
              <span key={zone} className="bg-indigo-100 text-indigo-800 text-xs font-medium py-1 px-2 rounded-full flex items-center">
                {bangaloreRegions.find(r => r.value === zone)?.label}
                <button 
                  onClick={() => toggleZone(zone)}
                  className="ml-1 text-indigo-600 hover:text-indigo-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
        </div>
        
        {/* Properties Grid */}
          <div className="mb-12">
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
                {properties.map((property, index) => (
                  <AnimatedPropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BrowseProperties; 