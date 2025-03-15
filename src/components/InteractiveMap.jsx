import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { MapPin, Home, Building } from 'lucide-react';
import { motion } from 'framer-motion';

// Bangalore center coordinates
const center = {
  lat: 12.9716,
  lng: 77.5946
};

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '1rem',
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e9e9e9'
        },
        {
          lightness: 17
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5'
        },
        {
          lightness: 20
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 17
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 29
        },
        {
          weight: 0.2
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 18
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 16
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5'
        },
        {
          lightness: 21
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dedede'
        },
        {
          lightness: 21
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#6c6c6c'
        }
      ]
    }
  ]
};

// Mock data for locations (you'll replace this with real data)
const mockLocations = [
  {
    id: '1',
    title: 'Luxury Villa',
    location: 'Indiranagar, Bangalore',
    position: { lat: 12.9784, lng: 77.6408 },
    price: '₹2.5 Cr',
    propertyType: 'villa',
    listingType: 'sale',
    image: '/assets/1.png'
  },
  {
    id: '2',
    title: 'Modern Apartment',
    location: 'Koramangala, Bangalore',
    position: { lat: 12.9352, lng: 77.6245 },
    price: '₹35,000/month',
    propertyType: 'apartment',
    listingType: 'rent',
    image: '/assets/2.png'
  },
  {
    id: '3',
    title: 'Commercial Space',
    location: 'MG Road, Bangalore',
    position: { lat: 12.9758, lng: 77.6096 },
    price: '₹3.8 Cr',
    propertyType: 'commercial',
    listingType: 'sale',
    image: '/assets/3.png'
  },
  {
    id: '4',
    title: 'Spacious House',
    location: 'Whitefield, Bangalore',
    position: { lat: 12.9698, lng: 77.7499 },
    price: '₹1.9 Cr',
    propertyType: 'house',
    listingType: 'sale',
    image: '/assets/1.png'
  }
];

const markerColors = {
  apartment: '#4F46E5', // indigo
  house: '#10B981', // emerald
  villa: '#F59E0B', // amber
  commercial: '#EF4444', // red
  plot: '#8B5CF6', // purple
};

// Helper function to get geo coordinates from property data
const getGeoCoordinates = (property) => {
  // In a real application, you would use the property's actual coordinates
  // For now, we'll use the mockLocations if they match by ID, or generate random coordinates
  const mockLocation = mockLocations.find(loc => loc.id === property.id);
  
  if (mockLocation) {
    return mockLocation.position;
  }
  
  // Generate random coordinates near Bangalore center for demo
  return {
    lat: center.lat + (Math.random() - 0.5) * 0.1,
    lng: center.lng + (Math.random() - 0.5) * 0.1
  };
};

const InteractiveMap = ({ properties = [], height = '500px' }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD7f0S5DWkL-UMNbtW0wFmrYmAaJmcd7Jg' // Replace with your Google Maps API key
  });

  const [map, setMap] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Use provided properties or mock locations if none provided
  const displayProperties = properties.length > 0 
    ? properties.map(prop => ({
        ...prop,
        position: getGeoCoordinates(prop)
      })) 
    : mockLocations;

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Adjust bounds to fit all markers
  useEffect(() => {
    if (map && displayProperties.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      displayProperties.forEach(property => {
        bounds.extend(property.position);
      });
      map.fitBounds(bounds);
    }
  }, [map, displayProperties]);

  if (loadError) return <div className="p-4 text-red-600">Error loading maps</div>;
  if (!isLoaded) return <div className="p-4 flex justify-center items-center h-64 bg-gray-100 rounded-lg animate-pulse">Loading Maps...</div>;

  return (
    <div className="relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl overflow-hidden shadow-xl mb-4"
        style={{ height }}
      >
        <GoogleMap
          mapContainerStyle={{ ...mapContainerStyle, height }}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          {displayProperties.map((property) => (
            <Marker
              key={property.id}
              position={property.position}
              icon={{
                path: 'M12 0C7.31 0 3.5 3.81 3.5 8.5c0 5.94 7.77 14.59 8.06 14.93a.75.75 0 0 0 1.13 0c.29-.34 8.06-9 8.06-14.93C20.5 3.81 16.69 0 12 0z',
                fillColor: markerColors[property.propertyType] || '#6366F1',
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: '#ffffff',
                scale: 1.2,
                anchor: new window.google.maps.Point(12, 24),
                labelOrigin: new window.google.maps.Point(12, 12),
              }}
              onClick={() => setSelectedProperty(property)}
              animation={window.google.maps.Animation.DROP}
            />
          ))}

          {selectedProperty && (
            <InfoWindow
              position={selectedProperty.position}
              onCloseClick={() => setSelectedProperty(null)}
            >
              <div className="max-w-xs bg-white rounded-lg overflow-hidden">
                <div className="relative h-32 w-full">
                  <img
                    src={selectedProperty.image || selectedProperty.images?.[0] || '/assets/tentimage.png'}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      selectedProperty.listingType === 'rent' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-indigo-600 text-white'
                    }`}>
                      {selectedProperty.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{selectedProperty.title}</h3>
                  <div className="flex items-center text-xs text-gray-600 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{selectedProperty.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-indigo-600">{selectedProperty.price}</p>
                    <Link 
                      to={`/property/${selectedProperty.id}`}
                      className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </motion.div>
      
      {/* Property Type Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6 px-4 justify-center">
        {['All', 'Apartment', 'House', 'Villa', 'Commercial', 'Plot'].map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              type === 'All' 
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-indigo-50'
            }`}
          >
            {type === 'Apartment' && <Building className="inline w-4 h-4 mr-1" />}
            {type === 'House' && <Home className="inline w-4 h-4 mr-1" />}
            {type}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default InteractiveMap; 