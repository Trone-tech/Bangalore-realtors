import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, MoreVertical, X, Train, Hospital, School, ShoppingCart } from 'lucide-react';
import { getDatabase, ref, onValue, remove, set } from 'firebase/database';
import { app } from '../firebase';

const AdminDashboard = () => {
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, MoreVertical, X, Train, Hospital } from 'lucide-react';
import { getDatabase, ref, onValue, remove, set } from 'firebase/database';
import { app } from '../firebase';

const AdminDashboard = () => {
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    zone: 'north',
    beds: '',
    baths: '',
    area: '',
    propertyType: 'rent',
    description: '',
    popular: false,
    details: {
      facing: '',
      ownership: '',
      furnished: 'unfurnished',
      carParking: '',
      propertyAge: '',
    },
    amenities: {
      security: false,
      lift: false,
      powerBackup: false,
      waterSupply: false,
      garden: false,
      clubhouse: false,
      swimmingPool: false,
      gym: false,
    },
    nearbyFacilities: {
      metroStation: '',
      metroDistance: '',
      hospital: '',
      hospitalDistance: '',
      school: '',
      schoolDistance: '',
      market: '',
      marketDistance: '',
    },
    address: {
      fullAddress: '',
      googleMapsLink: '',
    }
  });

  const zones = [
    { value: 'all', label: 'All Zones' },
    { value: 'north', label: 'North Bangalore' },
    { value: 'south', label: 'South Bangalore' },
    { value: 'east', label: 'East Bangalore' },
    { value: 'west', label: 'West Bangalore' },
    { value: 'central', label: 'Central Bangalore' },
  ];

  useEffect(() => {
    const db = getDatabase(app);
    const propertiesRef = ref(db, 'properties');

    const unsubscribe = onValue(propertiesRef, (snapshot) => {
      if (snapshot.exists()) {
        const propertiesData = snapshot.val();
        const propertiesList = Object.entries(propertiesData).map(([id, data]) => ({
          id,
          ...data,
        }));
        setProperties(propertiesList);
      } else {
        setProperties([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If you want to handle nested objects, you'll need a custom approach, 
    // but here's the simple version for flat fields:
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = getDatabase(app);
      const newPropertyRef = ref(db, `properties/${Date.now()}`);
      await set(newPropertyRef, {
        ...formData,
        priceNum: parseFloat(formData.price.replace(/[^0-9.]/g, '')),
        createdAt: Date.now(),
      });
      setShowAddProperty(false);
      // Reset form
      setFormData({
        title: '',
        price: '',
        location: '',
        zone: 'north',
        beds: '',
        baths: '',
        area: '',
        propertyType: 'rent',
        description: '',
        popular: false,
        details: {
          facing: '',
          ownership: '',
          furnished: 'unfurnished',
          carParking: '',
          propertyAge: '',
        },
        amenities: {
          security: false,
          lift: false,
          powerBackup: false,
          waterSupply: false,
          garden: false,
          clubhouse: false,
          swimmingPool: false,
          gym: false,
        },
        nearbyFacilities: {
          metroStation: '',
          metroDistance: '',
          hospital: '',
          hospitalDistance: '',
          school: '',
          schoolDistance: '',
          market: '',
          marketDistance: '',
        },
        address: {
          fullAddress: '',
          googleMapsLink: '',
        }
      });
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const db = getDatabase(app);
        await remove(ref(db, `properties/${id}`));
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  const filteredProperties = properties.filter(
    (property) =>
      (selectedZone === 'all' || property.zone === selectedZone) &&
      (property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="relative z-20 min-h-screen bg-gray-50">
      {/* Increase top padding to avoid the fixed header overlapping */}
      <div className="pt-24 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your properties across different zones in Bangalore
            </p>
          </div>
          <button
            onClick={() => setShowAddProperty(!showAddProperty)}
            className="mt-4 sm:mt-0 btn bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm"
          >
            {showAddProperty ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showAddProperty ? 'Cancel' : 'Add Property'}
          </button>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Zone Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent appearance-none bg-white"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
            >
              {zones.map((zone) => (
                <option key={zone.value} value={zone.value}>
                  {zone.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Property Form */}
        {showAddProperty && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            {/* ... your form code here ... */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Details, Property Details, Amenities, etc. */}
              {/* (Your existing form fields) */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Property List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location & Amenities
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      Loading properties...
                    </td>
                  </tr>
                ) : filteredProperties.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No properties found
                    </td>
                  </tr>
                ) : (
                  filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* ... property title & type ... */}
                      </td>
                      <td className="px-6 py-4">
                        {/* ... property details ... */}
                      </td>
                      <td className="px-6 py-4">
                        {/* ... location & amenities ... */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{property.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            property.popular
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {property.popular ? 'Popular' : 'Regular'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <button className="text-violet-600 hover:text-violet-900">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

    title: '',
    price: '',
    location: '',
    zone: 'north',
    beds: '',
    baths: '',
    area: '',
    propertyType: 'rent',
    description: '',
    popular: false,
    details: {
      facing: '',
      ownership: '',
      furnished: 'unfurnished',
      carParking: '',
      propertyAge: '',
    },
    amenities: {
      security: false,
      lift: false,
      powerBackup: false,
      waterSupply: false,
      garden: false,
      clubhouse: false,
      swimmingPool: false,
      gym: false,
    },
    nearbyFacilities: {
      metroStation: '',
      metroDistance: '',
      hospital: '',
      hospitalDistance: '',
      school: '',
      schoolDistance: '',
      market: '',
      marketDistance: '',
    },
    address: {
      fullAddress: '',
      googleMapsLink: '',
    }
  });

  const zones = [
    { value: 'all', label: 'All Zones' },
    { value: 'north', label: 'North Bangalore' },
    { value: 'south', label: 'South Bangalore' },
    { value: 'east', label: 'East Bangalore' },
    { value: 'west', label: 'West Bangalore' },
    { value: 'central', label: 'Central Bangalore' },
  ];

  useEffect(() => {
    const db = getDatabase(app);
    const propertiesRef = ref(db, 'properties');

    const unsubscribe = onValue(propertiesRef, (snapshot) => {
      if (snapshot.exists()) {
        const propertiesData = snapshot.val();
        const propertiesList = Object.entries(propertiesData).map(([id, data]) => ({
          id,
          ...data,
        }));
        setProperties(propertiesList);
      } else {
        setProperties([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = getDatabase(app);
      const newPropertyRef = ref(db, `properties/${Date.now()}`);
      await set(newPropertyRef, {
        ...formData,
        priceNum: parseFloat(formData.price.replace(/[^0-9.]/g, '')),
        createdAt: Date.now(),
      });
      setShowAddProperty(false);
      setFormData({
        title: '',
        price: '',
        location: '',
        zone: 'north',
        beds: '',
        baths: '',
        area: '',
        propertyType: 'rent',
        description: '',
        popular: false,
        details: {
          facing: '',
          ownership: '',
          furnished: 'unfurnished',
          carParking: '',
          propertyAge: '',
        },
        amenities: {
          security: false,
          lift: false,
          powerBackup: false,
          waterSupply: false,
          garden: false,
          clubhouse: false,
          swimmingPool: false,
          gym: false,
        },
        nearbyFacilities: {
          metroStation: '',
          metroDistance: '',
          hospital: '',
          hospitalDistance: '',
          school: '',
          schoolDistance: '',
          market: '',
          marketDistance: '',
        },
        address: {
          fullAddress: '',
          googleMapsLink: '',
        }
      });
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const db = getDatabase(app);
        await remove(ref(db, `properties/${id}`));
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  const filteredProperties = properties.filter(
    (property) =>
      (selectedZone === 'all' || property.zone === selectedZone) &&
      (property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const furnishingOptions = ['unfurnished', 'semi-furnished', 'fully-furnished'];
  const facingOptions = ['north', 'south', 'east', 'west', 'north-east', 'north-west', 'south-east', 'south-west'];
  const ownershipOptions = ['freehold', 'leasehold', 'co-operative society'];
  const parkingOptions = ['0', '1', '2', '3', '4+'];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Add top padding to ensure content isn't hidden behind a fixed header */}
      <div className="pt-16 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your properties across different zones in Bangalore
            </p>
          </div>
          <button
            onClick={() => setShowAddProperty(!showAddProperty)}
            className="mt-4 sm:mt-0 btn bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm"
          >
            {showAddProperty ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showAddProperty ? 'Cancel' : 'Add Property'}
          </button>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Zone Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent appearance-none bg-white"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
            >
              {zones.map((zone) => (
                <option key={zone.value} value={zone.value}>
                  {zone.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Property Form */}
        {showAddProperty && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Basic Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                    <select
                      name="zone"
                      value={formData.zone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    >
                      {zones.slice(1).map((zone) => (
                        <option key={zone.value} value={zone.value}>
                          {zone.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <input
                      type="number"
                      name="beds"
                      value={formData.beds}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <input
                      type="number"
                      name="baths"
                      value={formData.baths}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq ft)</label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    >
                      <option value="rent">For Rent</option>
                      <option value="sale">For Sale</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent h-32 resize-none"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Facing</label>
                    <select
                      name="details.facing"
                      value={formData.details.facing}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    >
                      <option value="">Select Facing</option>
                      {facingOptions.map(option => (
                        <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ownership</label>
                    <select
                      name="details.ownership"
                      value={formData.details.ownership}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    >
                      <option value="">Select Ownership</option>
                      {ownershipOptions.map(option => (
                        <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Furnished Status</label>
                    <select
                      name="details.furnished"
                      value={formData.details.furnished}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    >
                      {furnishingOptions.map(option => (
                        <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Car Parking</label>
                    <select
                      name="details.carParking"
                      value={formData.details.carParking}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    >
                      <option value="">Select Parking Slots</option>
                      {parkingOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Age</label>
                    <input
                      type="text"
                      name="details.propertyAge"
                      value={formData.details.propertyAge}
                      onChange={handleInputChange}
                      placeholder="e.g., 2 years"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.keys(formData.amenities).map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        name={`amenities.${amenity}`}
                        checked={formData.amenities[amenity]}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        {amenity.charAt(0).toUpperCase() + amenity.slice(1).replace(/([A-Z])/g, ' $1')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Facilities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Nearby Facilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nearest Metro Station</label>
                      <input
                        type="text"
                        name="nearbyFacilities.metroStation"
                        value={formData.nearbyFacilities.metroStation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        placeholder="Station name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Distance to Metro</label>
                      <input
                        type="text"
                        name="nearbyFacilities.metroDistance"
                        value={formData.nearbyFacilities.metroDistance}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        placeholder="e.g., 1.5 km"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nearest Hospital</label>
                      <input
                        type="text"
                        name="nearbyFacilities.hospital"
                        value={formData.nearbyFacilities.hospital}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        placeholder="Hospital name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Distance to Hospital</label>
                      <input
                        type="text"
                        name="nearbyFacilities.hospitalDistance"
                        value={formData.nearbyFacilities.hospitalDistance}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        placeholder="e.g., 2 km"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                    <textarea
                      name="address.fullAddress"
                      value={formData.address.fullAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      rows="3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link</label>
                    <input
                      type="url"
                      name="address.googleMapsLink"
                      value={formData.address.googleMapsLink}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Property List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location & Amenities
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      Loading properties...
                    </td>
                  </tr>
                ) : filteredProperties.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No properties found
                    </td>
                  </tr>
                ) : (
                  filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={property.images?.[0] || '/assets/tentimage.png'}
                              alt={property.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {property.title}
                            </div>
                            <div className="text-sm text-gray-500">{property.propertyType}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {property.beds} Beds • {property.baths} Baths
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.details?.furnished} • {property.details?.facing}
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.area} sq ft
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{property.location}</div>
                        <div className="text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-violet-100 text-violet-800">
                            {property.zone}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {property.nearbyFacilities?.metroStation && (
                            <span className="mr-2">
                              <Train className="w-4 h-4 inline-block mr-1" />
                              {property.nearbyFacilities.metroDistance}
                            </span>
                          )}
                          {property.nearbyFacilities?.hospital && (
                            <span>
                              <Hospital className="w-4 h-4 inline-block mr-1" />
                              {property.nearbyFacilities.hospitalDistance}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{property.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            property.popular
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {property.popular ? 'Popular' : 'Regular'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <button className="text-violet-600 hover:text-violet-900">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
