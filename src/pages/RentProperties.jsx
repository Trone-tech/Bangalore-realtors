import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchIcon, Loader, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPropertyCard from '../components/AnimatedPropertyCard';
import Footer from '../components/Footer';
import { propertyService } from '../services/propertyService';

const RentProperties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    propertyType: searchParams.get('propertyType') || '',
    zone: searchParams.get('zone') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    beds: searchParams.get('beds') || '',
    baths: searchParams.get('baths') || '',
  });

  // Property types
  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' },
    { value: 'plot', label: 'Plot' },
    { value: 'commercial', label: 'Commercial' }
  ];

  // Bangalore zones
  const zones = [
    { value: '', label: 'All Zones' },
    { value: 'North Bangalore', label: 'North Bangalore' },
    { value: 'South Bangalore', label: 'South Bangalore' },
    { value: 'East Bangalore', label: 'East Bangalore' },
    { value: 'West Bangalore', label: 'West Bangalore' },
    { value: 'Central Bangalore', label: 'Central Bangalore' }
  ];

  // Price ranges for rent (monthly)
  const priceRanges = [
    { min: '', max: '', label: 'Any Price' },
    { min: '0', max: '15000', label: 'Under ₹15,000' },
    { min: '15000', max: '25000', label: '₹15,000 - ₹25,000' },
    { min: '25000', max: '50000', label: '₹25,000 - ₹50,000' },
    { min: '50000', max: '100000', label: '₹50,000 - ₹1,00,000' },
    { min: '100000', max: '', label: 'Above ₹1,00,000' }
  ];

  // Fetch properties on component mount or when filters change
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        // Only fetch properties for rent (listingType: 'rent')
        const allProperties = await propertyService.getAllProperties();
        
        // Filter properties by listingType = 'rent'
        let filteredProperties = allProperties.filter(prop => prop.listingType === 'rent');
        
        // Apply additional filters
        if (filters.propertyType) {
          filteredProperties = filteredProperties.filter(prop => prop.propertyType === filters.propertyType);
        }
        
        if (filters.zone) {
          filteredProperties = filteredProperties.filter(prop => prop.zone === filters.zone);
        }
        
        if (filters.minPrice) {
          const minPrice = parseFloat(filters.minPrice);
          filteredProperties = filteredProperties.filter(prop => 
            typeof prop.price === 'number' ? prop.price >= minPrice : 
            parseFloat(prop.price.replace(/[^\d.-]/g, '')) >= minPrice);
        }
        
        if (filters.maxPrice) {
          const maxPrice = parseFloat(filters.maxPrice);
          filteredProperties = filteredProperties.filter(prop => 
            typeof prop.price === 'number' ? prop.price <= maxPrice : 
            parseFloat(prop.price.replace(/[^\d.-]/g, '')) <= maxPrice);
        }
        
        if (filters.beds) {
          filteredProperties = filteredProperties.filter(prop => 
            prop.beds && prop.beds.toString() === filters.beds);
        }
        
        if (filters.baths) {
          filteredProperties = filteredProperties.filter(prop => 
            prop.baths && prop.baths.toString() === filters.baths);
        }
        
        setProperties(filteredProperties);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    
    // Update URL with new filter
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  // Handle price range change
  const handlePriceRangeChange = (min, max) => {
    setFilters({ ...filters, minPrice: min, maxPrice: max });
    
    if (min) {
      searchParams.set('minPrice', min);
    } else {
      searchParams.delete('minPrice');
    }
    
    if (max) {
      searchParams.set('maxPrice', max);
    } else {
      searchParams.delete('maxPrice');
    }
    
    setSearchParams(searchParams);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      propertyType: '',
      zone: '',
      minPrice: '',
      maxPrice: '',
      beds: '',
      baths: ''
    });
    
    navigate('/rent');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url(/assets/total-map.png)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Find your perfect rental property
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore the best rental options in Bangalore
          </motion.p>
          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              to="/buy" 
              className="w-full md:w-auto px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Buy
            </Link>
            <Link 
              to="/rent" 
              className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Rent
            </Link>
            <Link 
              to="/admin/property/new" 
              className="w-full md:w-auto px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Sell
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Properties for Rent</h2>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>
        </div>

        {/* Filters Section */}
        {filterOpen && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                <select
                  name="zone"
                  value={filters.zone}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {zones.map((zone) => (
                    <option key={zone.value} value={zone.value}>{zone.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent Range</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={`${filters.minPrice || ''}-${filters.maxPrice || ''}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-');
                    handlePriceRangeChange(min, max);
                  }}
                >
                  {priceRanges.map((range, index) => (
                    <option key={index} value={`${range.min}-${range.max}`}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Show beds/baths filters only if property type is residential */}
              {(filters.propertyType === 'apartment' || filters.propertyType === 'house' || filters.propertyType === 'villa' || !filters.propertyType) && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <select
                      name="beds"
                      value={filters.beds}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <select
                      name="baths"
                      value={filters.baths}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </>
              )}

              <div className="md:col-span-3 flex justify-end mt-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 mr-4"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div>
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader size={32} className="animate-spin text-indigo-600 mr-2" />
              <span className="text-lg">Loading properties...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-red-700">{error}</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-600 mb-4">No rental properties match your search criteria.</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-lg text-gray-600 mb-6">Found {properties.length} properties for rent</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Link key={property.id} to={`/property/${property.id}`}>
                    <AnimatedPropertyCard property={property} />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RentProperties; 