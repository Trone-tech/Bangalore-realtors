import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { propertyService, Property } from '../services/propertyService';

const AdminDashboard = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialFormState: Omit<Property, 'id' | 'priceNum'> = {
    title: '',
    price: '',
    location: '',
    beds: '',
    baths: '',
    area: '',
    popular: false,
    region: 'north',
    description: '',
    amenities: [],
    features: {
      parking: false,
      garden: false,
      security: false,
      gym: false,
      pool: false,
    },
    images: [],
    propertyType: '',
    constructionStatus: '',
    possession: '',
    furnishing: '',
    facing: '',
    floor: '',
    totalFloors: '',
    ageOfProperty: '',
    maintenanceCharges: '',
    availableFrom: '',
    nearbyPlaces: [],
    contactInfo: {
      name: '',
      phone: '',
      email: '',
      preferredContactMethod: 'phone',
    },
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (error) {
      setError('Failed to log out');
    }
  };

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

  useEffect(() => {
    loadProperties();
  }, []);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleImageUpload = async (files: FileList) => {
    setUploadingImages(true);
    try {
      const propertyId = editingProperty?.id || 'temp';
      const uploadPromises = Array.from(files).map(file =>
        propertyService.uploadImage(file, propertyId)
      );
      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
      setSuccess('Images uploaded successfully');
    } catch (error) {
      setError('Failed to upload images');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleImageDelete = async (imageUrl: string) => {
    try {
      await propertyService.deleteImage(imageUrl);
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter(url => url !== imageUrl),
      }));
      setSuccess('Image deleted successfully');
    } catch (error) {
      setError('Failed to delete image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const priceNum = parseFloat(formData.price.replace(/,/g, ''));
      const propertyData = {
        ...formData,
        priceNum,
      };

      if (editingProperty?.id) {
        await propertyService.updateProperty(editingProperty.id, propertyData);
        setSuccess('Property updated successfully!');
      } else {
        const newPropertyId = await propertyService.addProperty(propertyData);
        setSuccess('Property added successfully!');
        
        // Verify the property was stored
        const newProperty = await propertyService.getPropertyById(newPropertyId);
        if (!newProperty) {
          throw new Error('Property verification failed');
        }
      }

      setFormData(initialFormState);
      setShowAddForm(false);
      setEditingProperty(null);
      await loadProperties();
    } catch (error) {
      setError('Failed to save property. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      ...initialFormState,
      ...property,
      features: {
        ...initialFormState.features,
        ...property.features,
      },
      contactInfo: {
        ...initialFormState.contactInfo,
        ...property.contactInfo,
      },
    });
    setShowAddForm(true);
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      setSubmitting(true);
      await propertyService.deleteProperty(id);
      setSuccess('Property deleted successfully');
      await loadProperties();
    } catch (error) {
      setError('Failed to delete property');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold p-20">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Messages */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
            {success}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          setShowAddForm(!showAddForm);
          setEditingProperty(null);
          setFormData(initialFormState);
          setError('');
          setSuccess('');
        }}
        className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 mb-8"
        disabled={submitting}
      >
        {showAddForm ? 'Cancel' : 'Add New Property'}
      </button>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingProperty ? 'Edit Property' : 'Add New Property'}
          </h2>
          
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="house">Independent House</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Construction Status
                </label>
                <select
                  value={formData.constructionStatus}
                  onChange={(e) => setFormData({ ...formData, constructionStatus: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="ready">Ready to Move</option>
                  <option value="under-construction">Under Construction</option>
                  <option value="pre-launch">Pre-Launch</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Region
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="north">North Bangalore</option>
                  <option value="south">South Bangalore</option>
                  <option value="east">East Bangalore</option>
                  <option value="west">West Bangalore</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nearby Places (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.nearbyPlaces.join(', ')}
                  onChange={(e) => setFormData({ ...formData, nearbyPlaces: e.target.value.split(',').map(item => item.trim()) })}
                  className="w-full p-2 border rounded"
                  placeholder="e.g. Metro Station, Shopping Mall, School"
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Property Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  value={formData.beds}
                  onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  value={formData.baths}
                  onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area (m²)
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Floor
                </label>
                <input
                  type="text"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Floors
                </label>
                <input
                  type="text"
                  value={formData.totalFloors}
                  onChange={(e) => setFormData({ ...formData, totalFloors: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facing
                </label>
                <select
                  value={formData.facing}
                  onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Facing</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                  <option value="north-east">North East</option>
                  <option value="north-west">North West</option>
                  <option value="south-east">South East</option>
                  <option value="south-west">South West</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age of Property
                </label>
                <input
                  type="text"
                  value={formData.ageOfProperty}
                  onChange={(e) => setFormData({ ...formData, ageOfProperty: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="e.g. 2 years"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Furnishing
                </label>
                <select
                  value={formData.furnishing}
                  onChange={(e) => setFormData({ ...formData, furnishing: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Furnishing</option>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi-furnished">Semi-Furnished</option>
                  <option value="fully-furnished">Fully Furnished</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available From
                </label>
                <input
                  type="date"
                  value={formData.availableFrom}
                  onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          </div>

          {/* Features and Amenities */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Features and Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                <div className="space-y-2">
                  {Object.keys(initialFormState.features).map((feature) => (
                    <div key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.features[feature]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            features: {
                              ...formData.features,
                              [feature]: e.target.checked,
                            },
                          })
                        }
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700 capitalize">
                        {feature.replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.amenities.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amenities: e.target.value.split(',').map((item) => item.trim()),
                    })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="e.g. Power Backup, Club House, Children's Play Area"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: { ...formData.contactInfo, name: e.target.value },
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.contactInfo.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: { ...formData.contactInfo, phone: e.target.value },
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: { ...formData.contactInfo, email: e.target.value },
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Contact Method
                </label>
                <select
                  value={formData.contactInfo.preferredContactMethod}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: {
                        ...formData.contactInfo,
                        preferredContactMethod: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Description</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Detailed Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded"
                rows={4}
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Property Images</h3>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                multiple
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 mb-4"
                disabled={uploadingImages}
              >
                {uploadingImages ? 'Uploading...' : 'Upload Images'}
              </button>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Property ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(url)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.popular}
                onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                className="mr-2"
                id="popularCheckbox"
              />
              <label htmlFor="popularCheckbox" className="text-sm font-medium text-gray-700">
                Mark as Popular
              </label>
            </div>
            <button
              type="submit"
              className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 disabled:opacity-50"
              disabled={submitting || uploadingImages}
            >
              {submitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {editingProperty ? 'Updating...' : 'Saving...'}
                </span>
              ) : (
                editingProperty ? 'Update Property' : 'Add Property'
              )}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No properties found. Add your first property!
                    </td>
                  </tr>
                ) : (
                  properties.map((property) => (
                    <tr key={property.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {property.images && property.images[0] && (
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="h-10 w-10 rounded-full object-cover mr-3"
                            />
                          )}
                          <div className="text-sm font-medium text-gray-900">
                            {property.title || 'Untitled'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹{property.price}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{property.location}</div>
                        <div className="text-sm text-gray-500">{property.region}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {property.beds} beds • {property.baths} baths • {property.area} m²
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.propertyType} • {property.constructionStatus}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(property)}
                          className="text-violet-600 hover:text-violet-900 mr-4"
                          disabled={submitting}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => property.id && handleDelete(property.id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={submitting}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 