import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Phone, Mail, Star, ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const AnimatedPropertyCard = ({ property, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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
  const handleImageClick = (e, imageUrl) => {
    if (isGoogleDriveImage(imageUrl)) {
      e.preventDefault();
      e.stopPropagation();
      window.open(getOriginalDriveLink(imageUrl), '_blank');
    }
  };

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

  // Helper function to get property beds/baths text
  const getBedsText = (property) => {
    return property.beds ? `${property.beds} Bed${property.beds > 1 ? 's' : ''}` : 'N/A';
  };

  const getBathsText = (property) => {
    return property.baths ? `${property.baths} Bath${property.baths > 1 ? 's' : ''}` : 'N/A';
  };

  const getAreaText = (property) => {
    return property.area ? `${property.area} ${property.areaUnit || 'sqft'}` : 'N/A';
  };
  
  // Helper function to determine listing type text
  const getListingTypeText = (property) => {
    return property.listingType === 'rent' ? '/month' : '';
  };

  // Check if the property is a residential property (house, apartment, villa)
  const isResidential = () => {
    const residentialTypes = ['house', 'apartment', 'villa'];
    return residentialTypes.includes(property.propertyType?.toLowerCase());
  };

  const imageUrl = property.images?.[0] || '/assets/tentimage.png';
  const isGoogleDrive = isGoogleDriveImage(imageUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden h-60">
          <motion.img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onClick={(e) => handleImageClick(e, imageUrl)}
            style={{ cursor: isGoogleDrive ? 'pointer' : 'default' }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Google Drive Indicator */}
          {isGoogleDrive && (
            <div className="absolute top-4 right-4 bg-white bg-opacity-75 p-1 rounded-full z-10">
              <ExternalLink size={16} className="text-indigo-600" />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className={`text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm ${
              property.listingType === 'rent' 
                ? 'bg-blue-600/90 text-white' 
                : 'bg-indigo-600/90 text-white'
            }`}>
              {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
            
            {property.zone && (
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-white/80 text-gray-800 backdrop-blur-sm">
                {property.zone}
              </span>
            )}
          </div>

          {/* Wishlist heart button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-700 backdrop-blur-sm'
            } transition-colors duration-300`}
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          </motion.button>
          
          {/* Quick actions - visible on hover */}
          <motion.div 
            className="absolute bottom-4 right-4 flex gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            {property.contact?.phone && (
              <a
                href={`tel:${property.contact.phone.replace(/\s+/g, '')}`}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
            
            {property.contact?.email && (
              <a
                href={`mailto:${property.contact.email}`}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1">
            {property.title}
          </h3>
          
          <div className="flex items-center mb-3 text-gray-500">
            <MapPin className="w-4 h-4 mr-1 text-indigo-500" />
            <p className="text-sm line-clamp-1">{property.location}</p>
          </div>
          
          {/* Amenities */}
          <div className={`grid ${isResidential() ? 'grid-cols-3' : 'grid-cols-1'} gap-2 mb-4`}>
            {isResidential() && (
              <>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Beds</p>
                  <p className="font-medium">{getBedsText(property)}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Baths</p>
                  <p className="font-medium">{getBathsText(property)}</p>
                </div>
              </>
            )}
            <div className={`text-center p-2 bg-gray-50 rounded-lg ${!isResidential() ? 'col-span-1' : ''}`}>
              <p className="text-xs text-gray-500">Area</p>
              <p className="font-medium">{getAreaText(property)}</p>
            </div>
          </div>
          
          {/* Features */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {property.amenities.slice(0, 3).map((amenity, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                    {amenity}
                  </span>
                ))}
                {property.amenities.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    +{property.amenities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-auto">
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <div>
                <p className="text-xl font-bold text-indigo-600">
                  {formatPrice(property.price)}{getListingTypeText(property)}
                </p>
                {property.popular && (
                  <div className="flex items-center text-amber-500 text-xs">
                    <Star className="w-3 h-3 fill-amber-500 mr-1" />
                    <span>Popular Choice</span>
                  </div>
                )}
              </div>
              
              <Link 
                to={`/property/${property.id}`}
                className="group-hover:bg-indigo-600 group-hover:text-white bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center transition-colors duration-300"
              >
                Details
                <motion.span
                  initial={{ x: 0 }}
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="ml-1 w-4 h-4" />
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedPropertyCard; 