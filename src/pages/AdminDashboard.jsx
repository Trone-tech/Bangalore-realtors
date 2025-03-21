import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminService } from '../services/adminService';
import { propertyService } from '../services/propertyService';
import { 
  Loader, Edit, Trash2, Plus, LogOut, Search, 
  CheckCircle, XCircle, Clock, RefreshCw, FileText, 
  BarChart2, Eye, Home, Settings, Bell
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [pendingProperties, setPendingProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingLoading, setPendingLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('published');
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  const fetchData = async () => {
    try {
      setRefreshing(true);
      
      // Fetch published properties
      const fetchedProperties = await adminService.getAllProperties();
      setProperties(fetchedProperties);
      setLoading(false);
      
      // Fetch pending properties
      const fetchedPendingProperties = await adminService.getAllPendingProperties();
      setPendingProperties(fetchedPendingProperties);
      setPendingLoading(false);
    } catch (err) {
      console.error('Error in dashboard initialization:', err);
      setError('Failed to load dashboard data. Please try again.');
      setLoading(false);
      setPendingLoading(false);
    } finally {
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    fetchData();
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
        // Show success toast
        showNotification('Property deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting property:', error);
        setError('Failed to delete property. Please try again.');
        showNotification('Failed to delete property', 'error');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleApproveProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to approve this property?')) {
      setPendingLoading(true);
      try {
        // Approve the property
        await adminService.approvePendingProperty(propertyId);
        
        // Update the local state
        setPendingProperties(pendingProperties.filter(p => p.id !== propertyId));
        
        // Refresh the published properties
        const fetchedProperties = await adminService.getAllProperties();
        setProperties(fetchedProperties);
        
        // Show success notification
        showNotification('Property approved successfully', 'success');
      } catch (error) {
        console.error('Error approving property:', error);
        setError('Failed to approve property. Please try again.');
        showNotification('Failed to approve property', 'error');
      } finally {
        setPendingLoading(false);
      }
    }
  };
  
  const handleRejectProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to reject this property? This action cannot be undone.')) {
      setPendingLoading(true);
      try {
        await adminService.rejectPendingProperty(propertyId);
        setPendingProperties(pendingProperties.filter(p => p.id !== propertyId));
        // Show success notification
        showNotification('Property rejected successfully', 'success');
      } catch (error) {
        console.error('Error rejecting property:', error);
        setError('Failed to reject property. Please try again.');
        showNotification('Failed to reject property', 'error');
      } finally {
        setPendingLoading(false);
      }
    }
  };
  
  // Simple notification function (you might want to replace with a proper toast library)
  const showNotification = (message, type = 'info') => {
    // This is a placeholder - in a real app, you'd use a toast library or custom implementation
    alert(message);
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
  
  // Filter pending properties based on search term
  const filteredPendingProperties = pendingProperties.filter(property => {
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
  
  if (loading && pendingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader size={32} className="animate-spin text-indigo-600 mr-2" />
        <span className="text-lg">Loading dashboard...</span>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Admin Dashboard Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchData}
                disabled={refreshing}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RefreshCw size={16} className={`mr-1.5 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <Link 
                to="/add-property" 
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus size={16} className="mr-1.5" />
                Add Property
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut size={16} className="mr-1.5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Properties</p>
                  <p className="text-2xl font-semibold text-gray-900">{properties.length}</p>
                </div>
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Home size={24} className="text-indigo-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-amber-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                  <p className="text-2xl font-semibold text-gray-900">{pendingProperties.length}</p>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock size={24} className="text-amber-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Listings</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {properties.filter(p => p.status === 'available').length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Tabs Navigation */}
            <div className="px-6 border-b border-gray-200">
              <div className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('published')}
                  className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'published'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } focus:outline-none transition duration-150 ease-in-out`}
                >
                  <FileText size={18} className="inline mr-1.5" />
                  Published Properties
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`py-4 px-4 text-center border-b-2 font-medium text-sm flex items-center ${
                    activeTab === 'pending'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } focus:outline-none transition duration-150 ease-in-out`}
                >
                  <Clock size={18} className="mr-1.5" />
                  Pending Approval
                  {pendingProperties.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      {pendingProperties.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search properties by title, location or type..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Property Listings */}
            {activeTab === 'published' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                  <FileText size={20} className="mr-2 text-indigo-600" />
                  Published Property Listings
                </h2>
                
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
                  <div className="text-center py-8 px-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                    <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus size={20} className="text-indigo-600" />
                    </div>
                    <p className="text-gray-600 mb-4">No properties found. Add your first property to get started.</p>
                    <Link 
                      to="/add-property" 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Your First Property
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
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
                        {filteredProperties.map((property) => (
                          <tr key={property.id} className="hover:bg-gray-50 transition duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden">
                                  <img 
                                    className="h-10 w-10 object-cover" 
                                    src={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/150'} 
                                    alt={property.title} 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                  <div className="text-sm text-gray-500">
                                    {property.beds > 0 && `${property.beds} bed, ${property.baths} bath`}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{property.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 font-medium">{formatPrice(property.price)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {property.propertyType}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {property.zone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Link 
                                  to={`/property/${property.id}`} 
                                  className="text-indigo-600 hover:text-indigo-900 flex items-center"
                                  target="_blank"
                                >
                                  <Eye size={14} className="mr-1" />
                                  View
                                </Link>
                                <Link 
                                  to={`/edit-property/${property.id}`} 
                                  className="text-blue-600 hover:text-blue-900 flex items-center"
                                >
                                  <Edit size={14} className="mr-1" />
                                  Edit
                                </Link>
                                <button
                                  onClick={() => handleDeleteProperty(property.id)}
                                  className="text-red-600 hover:text-red-900 flex items-center"
                                >
                                  <Trash2 size={14} className="mr-1" />
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
            )}
            
            {/* Pending Properties */}
            {activeTab === 'pending' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                  <Clock size={20} className="mr-2 text-amber-600" />
                  Properties Pending Approval
                </h2>
                
                {pendingLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader size={24} className="animate-spin text-indigo-600 mr-2" />
                    <span>Loading pending properties...</span>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 p-4 rounded-md text-red-800 mb-6">
                    <p>{error}</p>
                  </div>
                ) : pendingProperties.length === 0 ? (
                  <div className="text-center py-8 px-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <p className="text-gray-600">No properties pending approval.</p>
                    <p className="text-gray-500 text-sm mt-2">All submitted properties have been processed.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
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
                        {filteredPendingProperties.map((property) => (
                          <tr key={property.id} className="hover:bg-gray-50 transition duration-150 bg-amber-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden">
                                  <img 
                                    className="h-10 w-10 object-cover" 
                                    src={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/150'} 
                                    alt={property.title} 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                  <div className="flex items-center">
                                    <Clock size={14} className="text-amber-500 mr-1" />
                                    <span className="text-xs text-amber-700">Pending since {new Date(property.createdAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{property.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 font-medium">{formatPrice(property.price)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {property.propertyType}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {property.zone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex flex-wrap gap-2">
                                <Link 
                                  to={`/property/${property.id}`} 
                                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 flex items-center"
                                  target="_blank"
                                >
                                  <Eye size={14} className="mr-1" />
                                  Preview
                                </Link>
                                <button
                                  onClick={() => handleApproveProperty(property.id)}
                                  className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 flex items-center"
                                >
                                  <CheckCircle size={14} className="mr-1" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectProperty(property.id)}
                                  className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 flex items-center"
                                >
                                  <XCircle size={14} className="mr-1" />
                                  Reject
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