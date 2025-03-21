import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { adminService } from '../services/adminService';
import { useAuth } from '../contexts/AuthContext';

const PropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { currentUser } = useAuth();
  
  // Check if this is an admin view based on the URL path
  const isAdminView = window.location.pathname.includes('/admin') || 
                      window.location.pathname.includes('/add-property') || 
                      window.location.pathname.includes('/edit-property');
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [customAmenity, setCustomAmenity] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    location: '',
    price: '',
    propertyType: 'commercial',
    beds: 0,
    baths: 0,
    area: '',
    areaUnit: 'sqft',
    popular: false,
    featured: false,
    amenities: ['Parking', 'Security', 'Water Supply'],
    images: [''],
    listingType: 'sale',
    status: 'available',
    zone: 'North Bangalore',
    mapLink: '',
    details: {
      length: '',
      width: '',
      facing: 'East',
      roadWidth: '',
      ownership: 'Freehold',
      approvals: '',
      transactionType: 'New Property',
      possessionStatus: 'Ready to Move'
    },
    address: {
      full: '',
      landmark: ''
    },
    contact: {
      name: '',
      phone: '',
      whatsapp: '',
      alternatePhone: '',
      email: ''
    }
  });
  
  // Property types
  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' },
    { value: 'plot', label: 'Plot' },
    { value: 'commercial', label: 'Commercial' }
  ];
  
  // Bangalore zones
  const zones = [
    'North Bangalore',
    'South Bangalore',
    'East Bangalore',
    'West Bangalore',
    'Central Bangalore'
  ];
  
  // Facing options
  const facingOptions = [
    'North', 'South', 'East', 'West', 
    'North-East', 'North-West', 'South-East', 'South-West'
  ];
  
  // Ownership types
  const ownershipTypes = [
    'Freehold', 'Leasehold', 'Co-operative Society', 'Power of Attorney'
  ];
  
  // Transaction types
  const transactionTypes = [
    'New Property', 'Resale'
  ];
  
  // Possession status
  const possessionStatusOptions = [
    'Ready to Move', 'Under Construction'
  ];
  
  // Common amenities
  const commonAmenities = [
    'Parking', 'Security', 'Water Supply', 'Power Backup', 
    'Garden', 'Road Access', 'Corner Plot', 'Gated Community',
    'Swimming Pool', 'Gym', 'Club House', 'Children\'s Play Area'
  ];
  
  // Check if property is residential
  const isResidentialProperty = ['apartment', 'house', 'villa'].includes(formData.propertyType);
  const isPlotProperty = formData.propertyType === 'plot';
  const isCommercialProperty = formData.propertyType === 'commercial';
  
  // Add console log for debugging
  useEffect(() => {
    console.log("PropertyForm component mounted");
    console.log("isEditMode:", isEditMode);
    console.log("currentUser:", currentUser);
    
    return () => {
      console.log("PropertyForm component unmounted");
    };
  }, [isEditMode, currentUser]);
  
  // Fetch property data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchPropertyData = async () => {
        setLoading(true);
        setError(null);
        
        try {
          console.log(`Fetching property with ID: ${id}`);
          const propertyData = await adminService.getPropertyById(id);
          
          if (propertyData) {
            // Ensure all required properties exist in the data
            const completeData = {
              ...formData, // Default values
              ...propertyData, // Overwrite with actual data
              details: {
                ...formData.details, // Default details
                ...(propertyData.details || {}) // Overwrite with actual details if any
              },
              address: {
                ...formData.address, // Default address
                ...(propertyData.address || {}) // Overwrite with actual address if any
              },
              contact: {
                ...formData.contact, // Default contact
                ...(propertyData.contact || {}) // Overwrite with actual contact if any
              }
            };
            
            // Ensure images array exists
            if (!completeData.images || !Array.isArray(completeData.images) || completeData.images.length === 0) {
              completeData.images = [''];
            }
            
            setFormData(completeData);
          } else {
            throw new Error('Property not found');
          }
        } catch (err) {
          console.error('Error fetching property data:', err);
          setError('Failed to load property data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchPropertyData();
    }
  }, [id, isEditMode]);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name.includes('.')) {
      // Handle nested objects (e.g., "details.length")
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  // Handle amenities toggle
  const handleAmenityToggle = (amenity) => {
    const updatedAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    
    setFormData({ ...formData, amenities: updatedAmenities });
  };
  
  // Handle image URL changes
  const handleImageChange = (index, value) => {
    // Check if it's a Google Drive link and transform it if needed
    let transformedValue = value;
    
    // Detect Google Drive sharing links
    if (value.includes('drive.google.com/file/d/')) {
      // Extract the file ID from the Google Drive URL
      const fileIdMatch = value.match(/\/file\/d\/([^\/]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        // Transform to direct link format
        transformedValue = `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    } else if (value.includes('drive.google.com/open?id=')) {
      // Extract the file ID from the Google Drive URL (alternative format)
      const fileIdMatch = value.match(/id=([^&]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        // Transform to direct link format
        transformedValue = `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }
    
    const updatedImages = [...formData.images];
    updatedImages[index] = transformedValue;
    setFormData({ ...formData, images: updatedImages });
  };
  
  // Add a new image field
  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };
  
  // Remove an image field
  const removeImageField = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages.length ? updatedImages : [''] });
  };
  
  // Handle custom amenity addition
  const addCustomAmenity = () => {
    if (customAmenity.trim() !== '' && !formData.amenities.includes(customAmenity)) {
      setFormData({ ...formData, amenities: [...formData.amenities, customAmenity] });
      setCustomAmenity('');
    }
  };
  
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    setLoading(true);
    setError(null);
    
    try {
      console.log("Starting form validation and submission");
      
      // Convert price to number if it's not already
      const formDataCopy = {
        ...formData,
        price: formData.price ? (isNaN(formData.price) ? formData.price : Number(formData.price)) : 0,
        area: formData.area ? (isNaN(formData.area) ? formData.area : Number(formData.area)) : 0
      };
      
      // Validate required fields
      const requiredFields = ['title', 'location', 'propertyType', 'zone', 'address.full', 'contact.name', 'contact.phone', 'contact.email'];
      const missingFields = [];
      
      requiredFields.forEach(field => {
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          if (!formDataCopy[parent] || !formDataCopy[parent][child]) {
            missingFields.push(field);
          }
        } else {
          if (!formDataCopy[field]) {
            missingFields.push(field);
          }
        }
      });
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }
      
      // Validate email format if provided
      if (formDataCopy.contact?.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formDataCopy.contact.email)) {
          throw new Error('Please enter a valid email address');
        }
      }
      
      // Remove any undefined or null values
      const cleanedData = JSON.parse(JSON.stringify(formDataCopy)); // Deep copy to remove undefined
      
      // Filter out empty images
      cleanedData.images = (cleanedData.images || []).filter(url => url && url.trim() !== '');
      
      // Ensure there's at least one image
      if (!cleanedData.images || cleanedData.images.length === 0) {
        cleanedData.images = ['/assets/tentimage.png'];
      }
      
      console.log("About to save property with data:", cleanedData);
      
      // Determine if this is an admin submission or a public submission
      const isAdminSubmission = currentUser && isAdminView;
      
      // Save the property
      if (isEditMode) {
        console.log(`Updating property with ID: ${id}`);
        const updatedProperty = await adminService.updateProperty(id, cleanedData);
        console.log("Property updated successfully:", updatedProperty);
        navigate('/admin/dashboard');
      } else if (isAdminSubmission) {
        // Admin is creating a new property - directly add to properties
        console.log("Admin creating new property");
        const newProperty = await adminService.createProperty(cleanedData);
        console.log("Property created successfully by admin:", newProperty);
        navigate('/admin/dashboard');
      } else {
        // Public user is submitting a property - add to pending properties
        console.log("User submitting property for approval");
        const pendingProperty = await adminService.createPendingProperty(cleanedData);
        console.log("Property submitted for approval:", pendingProperty);
        navigate('/property-submission-success');
      }
    } catch (err) {
      console.error('Error saving property:', err);
      setError(err.message || 'Failed to save property. Please try again.');
      setLoading(false);
    }
  };
  
  if (loading && isEditMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader size={32} className="animate-spin text-indigo-600 mr-2" />
        <span className="text-lg">Loading property data...</span>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            {isAdminView ? (
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
              >
                <ArrowLeft size={18} className="mr-1" />
                <span>Back to Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
              >
                <ArrowLeft size={18} className="mr-1" />
                <span>Back to Home</span>
              </button>
            )}
            <h1 className="text-2xl font-bold text-gray-900 mt-2">
              {isEditMode ? 'Edit Property' : (isAdminView ? 'Add New Property' : 'Sell Your Property')}
            </h1>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        {/* Property Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type <span className="text-red-500">*</span></label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type <span className="text-red-500">*</span></label>
                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., COMMERCIAL PLOT"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 2400 sq. ft plot located on 80ft Road..."
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Detailed description of the property..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Kalyan Nagar, Bangalore-560043"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 15000000"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zone <span className="text-red-500">*</span></label>
                <select
                  name="zone"
                  value={formData.zone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  {zones.map((zone) => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area <span className="text-red-500">*</span></label>
                <div className="flex">
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 2400"
                    required
                  />
                  <select
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleInputChange}
                    className="p-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="sqft">sqft</option>
                    <option value="sqm">sqm</option>
                    <option value="acres">acres</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                </select>
              </div>
              
              {isResidentialProperty && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <input
                      type="number"
                      min="0"
                      name="beds"
                      value={formData.beds}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <input
                      type="number"
                      min="0"
                      name="baths"
                      value={formData.baths}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </>
              )}
              
              {isPlotProperty && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plot Type</label>
                  <select
                    name="plotType"
                    value={formData.plotType || 'residential'}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="agricultural">Agricultural</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
              )}
              
              {isCommercialProperty && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commercial Type</label>
                  <select
                    name="commercialType"
                    value={formData.commercialType || 'office'}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="office">Office Space</option>
                    <option value="retail">Retail Space</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="industrial">Industrial Space</option>
                    <option value="showroom">Showroom</option>
                  </select>
                </div>
              )}
              
              <div className="flex space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="popular"
                    name="popular"
                    checked={formData.popular}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="popular" className="ml-2 block text-sm font-medium text-gray-700">Popular</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm font-medium text-gray-700">Featured</label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(isPlotProperty || isCommercialProperty) && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                    <input
                      type="text"
                      name="details.length"
                      value={formData.details.length}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., 40 ft"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                    <input
                      type="text"
                      name="details.width"
                      value={formData.details.width}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., 60 ft"
                    />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facing</label>
                <select
                  name="details.facing"
                  value={formData.details.facing}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {facingOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Road Width</label>
                <input
                  type="text"
                  name="details.roadWidth"
                  value={formData.details.roadWidth}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 80 ft"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ownership</label>
                <select
                  name="details.ownership"
                  value={formData.details.ownership}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {ownershipTypes.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approvals</label>
                <input
                  type="text"
                  name="details.approvals"
                  value={formData.details.approvals}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., BBMP, BDA"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                <select
                  name="details.transactionType"
                  value={formData.details.transactionType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {transactionTypes.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Possession Status</label>
                <select
                  name="details.possessionStatus"
                  value={formData.details.possessionStatus}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {possessionStatusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {isResidentialProperty && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                  <input
                    type="text"
                    name="yearBuilt"
                    value={formData.yearBuilt || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 2020"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Address Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Address Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address <span className="text-red-500">*</span></label>
                <textarea
                  name="address.full"
                  value={formData.address.full}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 123, 80ft Road, HRBR Layout, Kalyan Nagar, Bangalore, Karnataka - 560043"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                <input
                  type="text"
                  name="address.landmark"
                  value={formData.address.landmark}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Near Kalyan Nagar Metro Station"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link</label>
                <input
                  type="url"
                  name="mapLink"
                  value={formData.mapLink}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., https://goo.gl/maps/example"
                />
                <p className="text-xs text-gray-500 mt-1">Optional: Paste a direct Google Maps link to the property location</p>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="contact.name"
                  value={formData.contact.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="contact.phone"
                  value={formData.contact.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., +91 9876543210"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  name="contact.whatsapp"
                  value={formData.contact.whatsapp}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., +91 9876543210"
                />
                <p className="text-xs text-gray-500 mt-1">If different from phone number</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone Number</label>
                <input
                  type="tel"
                  name="contact.alternatePhone"
                  value={formData.contact.alternatePhone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., +91 9876543210"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="contact.email"
                  value={formData.contact.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., john@example.com"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {commonAmenities.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`amenity-${amenity}`}
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`amenity-${amenity}`} className="ml-2 block text-sm font-medium text-gray-700">{amenity}</label>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Add custom amenity"
              />
              <button
                type="button"
                onClick={addCustomAmenity}
                className="mt-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Amenity
              </button>
            </div>
          </div>
          
          {/* Property Images */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Property Images</h2>
            <div className="space-y-3">
              {formData.images.map((url, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter image URL or Google Drive link"
                  />
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    disabled={formData.images.length === 1}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addImageField}
                className="inline-flex items-center mt-2 px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus size={16} className="mr-2" />
                Add Image
              </button>
              
              <div className="text-sm text-gray-500 mt-2">
                <p>How to use Google Drive images:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Upload your image to Google Drive</li>
                  <li>Right-click the image and select "Share"</li>
                  <li>Change permission to "Anyone with the link"</li>
                  <li>Copy the link and paste it here - it will be automatically converted to work properly</li>
                  <li>Images will be clickable on the property details page to view the original file</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="mt-8 border-t pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <Save size={18} className="mr-2" />
              {loading 
                ? (isEditMode ? 'Updating...' : 'Creating...') 
                : (isEditMode 
                   ? 'Update Property' 
                   : (isAdminView ? 'Create Property' : 'Submit Property for Approval'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm; 