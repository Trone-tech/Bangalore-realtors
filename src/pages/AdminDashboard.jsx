import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminService } from '../services/adminService';
import { propertyService } from '../services/propertyService';
import { Loader, Edit, Trash2, Plus, LogOut, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Fetch properties from Firebase
        const fetchedProperties = await adminService.getAllProperties();
        setProperties(fetchedProperties);
        setLoading(false);
      } catch (err) {
        console.error('Error in dashboard initialization:', err);
        setError('Failed to load dashboard data. Please try again.');
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout. Please try again.');
    }
  };
  
  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setLoading(true);
      try {
        await adminService.deleteProperty(propertyId);
        setProperties(properties.filter(p => p.id !== propertyId));
        // Show success message
      } catch (error) {
        console.error('Error deleting property:', error);
        setError('Failed to delete property. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  // Filter properties based on search term
  const filteredProperties = properties.filter(property => {
    const searchString = searchTerm.toLowerCase();
    return (
      property.title?.toLowerCase().includes(searchString) ||
      property.location?.toLowerCase().includes(searchString) ||
      property.propertyType?.toLowerCase().includes(searchString)
    );
  });
  
  // Format price for display
  const formatPrice = (price) => {
    if (typeof price === 'string' && price.includes('₹')) {
      return price;
    }
    
    const numPrice = typeof price === 'string' ? parseInt(price.replace(/[^\d]/g, '')) : price;
    
    if (numPrice >= 10000000) {
      return `₹${(numPrice / 10000000).toFixed(2)} Cr`;
    } else if (numPrice >= 100000) {
      return `₹${(numPrice / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${numPrice.toLocaleString()}`;
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader size={32} className="animate-spin text-indigo-600 mr-2" />
        <span className="text-lg">Loading dashboard...</span>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Admin Dashboard</h1>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/add-property" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-center">
                  Add New Property
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 text-center"
                >
                  Logout
                </button>
              </div>
            </div>
            
            {/* Actions Bar */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Property Listings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Property Listings</h2>
            
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
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No properties found.</p>
                <Link to="/add-property" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Add Your First Property
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map((property) => (
                      <tr key={property.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img 
                                className="h-10 w-10 rounded-md object-cover" 
                                src={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/150'} 
                                alt={property.title} 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{property.title}</div>
                              <div className="text-sm text-gray-500">{property.beds} bed, {property.baths} bath</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{property.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">₹{parseInt(property.price).toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {property.propertyType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {property.zone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link 
                              to={`/edit-property/${property.id}`} 
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteProperty(property.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default AdminDashboard; 