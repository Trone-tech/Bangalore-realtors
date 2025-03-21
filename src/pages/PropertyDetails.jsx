import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Loader, Heart, ExternalLink } from 'lucide-react';
import { propertyService } from '../services/propertyService';
import { adminService } from '../services/adminService';
import { useAuth } from '../contexts/AuthContext';
import { ref, get } from 'firebase/database';
import { database } from '../firebase';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isPendingProperty, setIsPendingProperty] = useState(false);
  const { currentUser } = useAuth();
  
  // Helper function to check if image is from Google Drive
  const isGoogleDriveImage = (url) => {
    return url && (
      url.includes('drive.google.com') || 
      url.includes('googleusercontent.com')
    );
  };

  // Get original Google Drive link from image URL
  const getOriginalDriveLink = (url) => {
    if (!url) return null;
    
    if (url.includes('drive.google.com/uc?export=view&id=')) {
      const fileId = url.match(/id=([^&]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/view`;
      }
    }
    
    return url;
  };

  // Handle clicking on an image
  const handleImageClick = (imageUrl) => {
    if (isGoogleDriveImage(imageUrl)) {
      window.open(getOriginalDriveLink(imageUrl), '_blank');
    }
  };
  
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // First try to get from regular properties
        let propertyData = await propertyService.getPropertyById(id);
        
        // If not found and user is admin, check pending properties
        if (!propertyData && currentUser) {
          try {
            // Check pending properties using adminService instead
            const pendingProperty = await adminService.getPendingPropertyById(id);
            
            if (pendingProperty) {
              propertyData = { 
                ...pendingProperty,
                isPending: true 
              };
              setIsPendingProperty(true);
            }
          } catch (pendingError) {
            console.error('Error checking pending properties:', pendingError);
          }
        }
        
        if (propertyData) {
          setProperty(propertyData);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to fetch property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperty();
  }, [id, currentUser]);
  
  // Format price for display
  const formatPrice = (price) => {
    // Check if price is already formatted (string with ₹)
    if (typeof price === 'string' && price.includes('₹')) {
      return price;
    }
    
    // Convert to number if it's a string without ₹
    const numPrice = typeof price === 'string' ? parseInt(price.replace(/[^\d]/g, '')) : price;
    
    if (numPrice >= 10000000) {
      return `₹${(numPrice / 10000000).toFixed(2)} Cr`;
    } else if (numPrice >= 100000) {
      return `₹${(numPrice / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${numPrice.toLocaleString()}`;
    }
  };
  
  // Fallback property data for development/testing
  const fallbackProperty = {
    id: id,
    title: 'COMMERCIAL PLOT',
    subtitle: '2400 sq. ft plot located on 80ft Road in Bhuvi HRBR Layout Kalyan Nagar Bangalore',
    description: 'A beautiful modern commercial plot in the heart of Kalyan Nagar with stunning views and premium amenities. This property features spacious area, modern infrastructure, and is located in a prime area with easy access to shopping, dining, and entertainment.',
    location: 'Kalyan Nagar, Bangalore-560043',
    price: 15000000,
    propertyType: 'commercial',
    beds: 0,
    baths: 0,
    area: 2400,
    areaUnit: 'sqft',
    popular: true,
    featured: true,
    amenities: ['Parking', 'Security', 'Water Supply', 'Power Backup', 'Road Access', 'Corner Plot'],
    images: ['/assets/tentimage.png', '/assets/1.png', '/assets/2.png', '/assets/3.png', '/assets/tentimage.png'],
    listingType: 'sale',
    status: 'available',
    zone: 'North Bangalore',
    createdAt: '2023-01-01',
    yearBuilt: '2023',
    details: {
      length: '40 ft',
      width: '60 ft',
      facing: 'East',
      roadWidth: '80 ft',
      ownership: 'Freehold',
      approvals: 'BBMP, BDA',
      transactionType: 'New Property',
      possessionStatus: 'Ready to Move'
    },
    address: {
      full: '123, 80ft Road, HRBR Layout, Kalyan Nagar, Bangalore, Karnataka - 560043',
      landmark: 'Near Kalyan Nagar Metro Station'
    },
    contact: {
      name: 'John Doe',
      phone: '+91 9876543210',
      whatsapp: '+91 9876543210',
      alternatePhone: '+91 9876543211',
      email: 'john@example.com'
    }
  };
  
  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size={32} className="animate-spin text-indigo-600 mr-2" />
        <span className="text-lg">Loading property details...</span>
      </div>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Error</h2>
          <p className="text-red-700 mb-6">{error}</p>
          <Link
            to="/browse"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }
  
  // Use fallback property if no property data is available
  const propertyData = property || fallbackProperty;
  
  // Omit 'Beds' field for non-house listings
  const isResidential = ['house', 'apartment', 'villa'].includes(propertyData.propertyType);
  
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <div className="mb-6">
          {isPendingProperty && currentUser ? (
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <ArrowLeft size={18} className="mr-1" />
              <span>Back to Admin Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/browse"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <ArrowLeft size={18} className="mr-1" />
              <span>Back to Browse</span>
            </Link>
          )}
        </div>
        
        {/* Property Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{propertyData.title}</h1>
          <p className="text-gray-600 mb-4">{propertyData.subtitle}</p>
          
          {/* Show pending status for admin preview */}
          {isPendingProperty && currentUser && (
            <div className="bg-amber-100 border border-amber-300 text-amber-800 px-4 py-3 rounded mb-4 flex items-center">
              <span className="mr-2">⚠️</span>
              <span>This property is pending approval and not visible to the public yet.</span>
            </div>
          )}
        </div>

        {/* Contact Information - Moved to top with enhanced design */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-md p-6 mb-8 border border-indigo-100 transform transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {propertyData.contact?.name && (
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm transform transition-all duration-200 hover:translate-y-[-2px]">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Contact Person</p>
                  <p className="font-medium">{propertyData.contact.name}</p>
                </div>
              </div>
            )}
            
            {propertyData.contact?.phone && (
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm transform transition-all duration-200 hover:translate-y-[-2px]">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-500 text-sm">Phone Number</p>
                  <p className="font-medium">{propertyData.contact.phone}</p>
                </div>
                <a 
                  href={`tel:${propertyData.contact.phone.replace(/\s+/g, '')}`}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center ml-4 transform transition-all duration-200 hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call
                </a>
              </div>
            )}
            
            {propertyData.contact?.whatsapp && (
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm transform transition-all duration-200 hover:translate-y-[-2px]">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#25D366" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-500 text-sm">WhatsApp</p>
                  <p className="font-medium">{propertyData.contact.whatsapp}</p>
                </div>
                <a 
                  href={`https://wa.me/${propertyData.contact.whatsapp.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-[#25D366] text-white rounded-md hover:bg-[#20c55e] flex items-center ml-4 transform transition-all duration-200 hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-4 h-4 mr-1">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            )}
            
            {propertyData.contact?.alternatePhone && (
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm transform transition-all duration-200 hover:translate-y-[-2px]">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-500 text-sm">Alternate Phone</p>
                  <p className="font-medium">{propertyData.contact.alternatePhone}</p>
                </div>
                <a 
                  href={`tel:${propertyData.contact.alternatePhone.replace(/\s+/g, '')}`}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center ml-4 transform transition-all duration-200 hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call
                </a>
              </div>
            )}
            
            {propertyData.contact?.email && (
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm transform transition-all duration-200 hover:translate-y-[-2px]">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium">{propertyData.contact.email}</p>
                </div>
                <a 
                  href={`mailto:${propertyData.contact.email}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center ml-4 transform transition-all duration-200 hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              </div>
            )}
            
            {!propertyData.contact?.name && !propertyData.contact?.phone && !propertyData.contact?.email && (
              <div className="text-center py-4 text-gray-500 col-span-2">
                <p>Contact information not available for this property.</p>
                <p className="mt-2">Please check back later or browse other properties.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Main Image */}
        <div className="mb-4">
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={propertyData.images?.[activeImage] || '/assets/tentimage.png'}
              alt={propertyData.title}
              className="w-full h-full object-cover"
              onClick={() => handleImageClick(propertyData.images?.[activeImage])}
              style={{ cursor: isGoogleDriveImage(propertyData.images?.[activeImage]) ? 'pointer' : 'default' }}
            />
            {isGoogleDriveImage(propertyData.images?.[activeImage]) && (
              <div className="absolute top-2 right-2 bg-white bg-opacity-75 p-1 rounded-md">
                <ExternalLink size={18} className="text-indigo-600" />
              </div>
            )}
          </div>
        </div>
        
        {/* Thumbnail Images */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {propertyData.images?.map((image, index) => (
            <div 
              key={index}
              className={`relative h-20 bg-gray-200 rounded-lg overflow-hidden cursor-pointer ${
                activeImage === index ? 'ring-2 ring-indigo-600' : ''
              }`}
              onClick={() => setActiveImage(index)}
            >
              <img
                src={image}
                alt={`${propertyData.title} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {isGoogleDriveImage(image) && (
                <div className="absolute top-1 right-1 bg-white bg-opacity-75 p-0.5 rounded-md">
                  <ExternalLink size={12} className="text-indigo-600" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Price and Details */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{formatPrice(propertyData.price)}</h2>
              <p className="text-gray-600">{propertyData.location}</p>
            </div>
          </div>
        </div>
        
        {/* Details Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Property Type</p>
              <p className="font-medium">{propertyData.propertyType}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Zone</p>
              <p className="font-medium">{propertyData.zone}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Area</p>
              <p className="font-medium">{propertyData.area} {propertyData.areaUnit}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Length</p>
              <p className="font-medium">{propertyData.details.length}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Width</p>
              <p className="font-medium">{propertyData.details.width}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Facing</p>
              <p className="font-medium">{propertyData.details.facing}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Road Width</p>
              <p className="font-medium">{propertyData.details.roadWidth}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Ownership</p>
              <p className="font-medium">{propertyData.details.ownership}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Approvals</p>
              <p className="font-medium">{propertyData.details.approvals}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Transaction Type</p>
              <p className="font-medium">{propertyData.details.transactionType}</p>
            </div>
            {isResidential && (
              <div>
                <p className="text-gray-500 text-sm">Beds</p>
                <p className="font-medium">{propertyData.beds}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Amenities */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {propertyData.amenities?.map((amenity, index) => (
              <div key={index} className="flex items-center justify-center flex-col text-center p-4 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                  <img src={`/assets/s${index + 1}.png`} alt={amenity} className="w-6 h-6" />
                </div>
                <span className="text-gray-800">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Address */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Address</h3>
          <p className="text-gray-700 mb-2">{propertyData.address.full}</p>
          <p className="text-gray-600 mb-4">Landmark: {propertyData.address.landmark}</p>
          
          {/* Google Maps Link */}
          <div>
            <a 
              href={propertyData.mapLink || `https://www.google.com/maps/search/${encodeURIComponent(propertyData.address.full)}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <MapPin className="h-4 w-4 mr-2" />
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 