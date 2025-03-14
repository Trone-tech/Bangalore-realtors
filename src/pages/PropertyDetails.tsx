import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { MapPin, Phone, Mail, Share2, Heart, School, Building2, Train, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { propertyService, Property } from '../services/propertyService';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProperty = async () => {
      if (!id) {
        setError('Property not found');
        setLoading(false);
        return;
      }

      try {
        const propertyData = await propertyService.getPropertyById(id);
        if (!propertyData) {
          setError('Property not found');
          return;
        }
        setProperty(propertyData);
      } catch (error) {
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  const nextImage = () => {
    if (!property?.images?.length) return;
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!property?.images?.length) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg">
            {error || 'Property not found'}
          </div>
          <button
            onClick={() => navigate('/browse')}
            className="mt-4 text-violet-600 hover:text-violet-700"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-8 max-w-5xl">
        {/* Title Section */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
        <p className="text-gray-600 mb-6">{property.description}</p>

        {/* Price Section */}
        <div className="flex items-baseline mb-6">
          <span className="text-violet-600 text-3xl font-semibold">₹</span>
          <span className="text-3xl font-semibold">{property.price}</span>
          <span className="text-gray-500 text-lg ml-1">/month</span>
        </div>

        {/* Image Gallery */}
        {property.images && property.images.length > 0 && (
          <div className="bg-white rounded-xl p-4 mb-6">
            <div className="relative h-[400px] mb-4">
              <img 
                src={property.images[currentImageIndex]}
                alt={`${property.title} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              
              {property.images.length > 1 && (
                <>
                  {/* Navigation Arrows */}
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </button>

                  {/* Navigation Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentImageIndex === index 
                            ? 'bg-white w-4' 
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {property.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {property.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image}
                    alt={`${property.title} - View ${index + 1}`}
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition-all ${
                      currentImageIndex === index 
                        ? 'ring-2 ring-violet-600 opacity-100' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Details Section */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property.propertyType && (
              <div className="border-b pb-2">
                <p className="text-gray-500 text-sm">Property Type</p>
                <p className="font-medium capitalize">{property.propertyType}</p>
              </div>
            )}
            {property.constructionStatus && (
              <div className="border-b pb-2">
                <p className="text-gray-500 text-sm">Construction Status</p>
                <p className="font-medium capitalize">{property.constructionStatus}</p>
              </div>
            )}
            {property.furnishing && (
              <div className="border-b pb-2">
                <p className="text-gray-500 text-sm">Furnishing</p>
                <p className="font-medium capitalize">{property.furnishing}</p>
              </div>
            )}
            {property.facing && (
              <div className="border-b pb-2">
                <p className="text-gray-500 text-sm">Facing</p>
                <p className="font-medium capitalize">{property.facing}</p>
              </div>
            )}
            {property.floor && (
              <div className="border-b pb-2">
                <p className="text-gray-500 text-sm">Floor</p>
                <p className="font-medium">{property.floor}</p>
              </div>
            )}
            {property.totalFloors && (
              <div className="border-b pb-2">
                <p className="text-gray-500 text-sm">Total Floors</p>
                <p className="font-medium">{property.totalFloors}</p>
              </div>
            )}
            {property.area && (
              <div className="border-b pb-2">
                <p className="text-gray-500 text-sm">Area</p>
                <p className="font-medium">{property.area} m²</p>
              </div>
            )}
            {property.ageOfProperty && (
              <div className="border-b pb-2">
                <p className="text-gray-500 text-sm">Age of Property</p>
                <p className="font-medium">{property.ageOfProperty}</p>
              </div>
            )}
            {property.availableFrom && (
              <div className="border-b pb-2">
                <p className="text-gray-500 text-sm">Available From</p>
                <p className="font-medium">{new Date(property.availableFrom).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        {property.features && Object.keys(property.features).length > 0 && (
          <div className="bg-white rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(property.features)
                .filter(([_, value]) => value)
                .map(([key]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                    <span className="capitalize">{key.replace('-', ' ')}</span>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* Amenities Section */}
        {(property.amenities?.length > 0 || property.nearbyPlaces?.length > 0) && (
          <div className="bg-white rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Amenities & Nearby Places</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {property.amenities?.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Additional Amenities</h3>
                  <div className="space-y-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {property.nearbyPlaces?.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Nearby Places</h3>
                  <div className="space-y-2">
                    {property.nearbyPlaces.map((place, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                        <span>{place}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Information */}
        {property.contactInfo && (
          <div className="bg-white rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              {property.contactInfo.name && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-medium">{property.contactInfo.name}</p>
                    <p className="text-sm text-gray-500">Contact Person</p>
                  </div>
                </div>
              )}
              {property.contactInfo.phone && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-100 rounded-lg">
                    <Phone className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-medium">{property.contactInfo.phone}</p>
                    <p className="text-sm text-gray-500">Phone Number</p>
                  </div>
                </div>
              )}
              {property.contactInfo.email && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-100 rounded-lg">
                    <Mail className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-medium">{property.contactInfo.email}</p>
                    <p className="text-sm text-gray-500">Email Address</p>
                  </div>
                </div>
              )}
              {property.contactInfo.preferredContactMethod && (
                <p className="text-sm text-gray-500 mt-2">
                  Preferred contact method: {' '}
                  <span className="font-medium capitalize">
                    {property.contactInfo.preferredContactMethod}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Location Section */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <p className="text-gray-600 mb-2">{property.location}</p>
          <p className="text-violet-600 font-medium mb-4">
            Zone: {property.region.charAt(0).toUpperCase() + property.region.slice(1)} Bangalore
          </p>
          
          {/* Map */}
          <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
            <iframe 
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(property.location + ', Bangalore, Karnataka')}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 