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
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [customAmenity, setCustomAmenity] = useState('');
  const [formData, setFormData] = useState({
    propertyType: 'commercial',
    location: '',
    address: '',
    mapLink: '',
    contact: {
      name: '',
      phone: '',
      email: ''
    },
    amenities: ['Parking', 'Security', 'Water Supply'],
    images: ['']
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
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
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
  
  // Only add beds/baths fields for residential properties and only when not in edit mode
  const shouldShowResidentialFields = !isEditMode && ['apartment', 'house', 'villa'].includes(formData.propertyType);
  
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    setLoading(true);
    setError(null);
    
    try {
      console.log("Starting form validation and submission");
      
      // Convert price to string if it's not already
      const formDataCopy = {
        ...formData,
        price: formData.price.toString()
      };
      
      // Validate required fields
      const requiredFields = ['title', 'location', 'price', 'propertyType', 'zone'];
      const missingFields = requiredFields.filter(field => !formDataCopy[field]);
      
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
      const cleanedData = Object.fromEntries(
        Object.entries(formDataCopy).filter(([_, v]) => v !== null && v !== undefined)
      );
      
      // Filter out empty images
      cleanedData.images = (cleanedData.images || []).filter(url => url && url.trim() !== '');
      
      // Ensure there's at least one image
      if (!cleanedData.images || cleanedData.images.length === 0) {
        cleanedData.images = ['/assets/tentimage.png'];
      }
      
      // Make sure nested objects are defined
      cleanedData.details = cleanedData.details || {};
      cleanedData.address = cleanedData.address || {};
      cleanedData.contact = cleanedData.contact || {};
      
      console.log("About to save property with data:", cleanedData);
      
      // Save the property
      if (isEditMode) {
        console.log(`Updating property with ID: ${id}`);
        const updatedProperty = await adminService.updateProperty(id, cleanedData);
        console.log("Property updated successfully:", updatedProperty);
      } else {
        console.log("Creating new property");
        const newProperty = await adminService.createProperty(cleanedData);
        console.log("Property created successfully:", newProperty);
      }
      
      console.log("Navigating to dashboard");
      navigate('/admin/dashboard');
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
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
            >
              <ArrowLeft size={18} className="mr-1" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">
              {isEditMode ? 'Edit Property' : 'Add New Property'}
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
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type <span className="text-red-500">*</span></label>
                <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Kalyan Nagar, Bangalore-560043" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} rows={2} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., 123, 80ft Road, HRBR Layout, Kalyan Nagar, Bangalore, Karnataka - 560043" required></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link</label>
                <input type="url" name="mapLink" value={formData.mapLink} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., https://goo.gl/maps/example" />
                <p className="text-xs text-gray-500 mt-1">Optional: Paste a direct Google Maps link to the property location</p>
              </div>
              {shouldShowResidentialFields && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <input
                      type="number"
                      min="0"
                      name="beds"
                      value={formData.beds || 0}
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
                      value={formData.baths || 0}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person Name <span className="text-red-500">*</span></label>
                <input type="text" name="contact.name" value={formData.contact.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., John Doe" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" name="contact.phone" value={formData.contact.phone} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., +91 9876543210" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="contact.email" value={formData.contact.email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., john@example.com" required />
              </div>
            </div>
          </div>
          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {commonAmenities.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input type="checkbox" id={`amenity-${amenity}`} checked={formData.amenities.includes(amenity)} onChange={() => handleAmenityToggle(amenity)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor={`amenity-${amenity}`} className="ml-2 block text-sm font-medium text-gray-700">{amenity}</label>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <input type="text" value={customAmenity} onChange={(e) => setCustomAmenity(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Add custom amenity" />
              <button type="button" onClick={addCustomAmenity} className="mt-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Add Amenity</button>
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-8 border-t pt-6">
            <button type="submit" disabled={loading} className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}> <Save size={18} className="mr-2" /> {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Property' : 'Create Property')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm; 