import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { MapPin, Phone, Mail, Share2, Heart, School, Building2, Train, ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const property = {
    title: "COMMERCIAL PLOT",
    description: "2450 sq.ft for sale located on 100 ft road 1st Block HRBR Layout Kalyan Nagar Banswadi Bangalore",
    price: "2,095",
    details: {
      "Carpet Area": "2450 sq.ft",
      "Property Age": "Commercial plot",
      "Parking": "Yes",
      "Facing": "East",
      "Property Status": "For Sale",
      "Location Status": "Residential"
    },
    amenities: [
      {
        icon: School,
        name: "Schools",
        distance: "0.5 km",
        places: ["Delhi Public School", "Ryan International"]
      },
      {
        icon: Building2,
        name: "Hospitals",
        distance: "1.2 km",
        places: ["Apollo Hospital", "Fortis"]
      },
      {
        icon: Train,
        name: "Metro Station",
        distance: "2 km",
        places: ["Baiyappanahalli Metro"]
      }
    ],
    address: {
      full: "Near Delhi Public School (Behind Johnson Market), Banswadi, Bangalore, Karnataka",
      area: "Kalyan Nagar",
      zone: "Zone : Bangalore East"
    },
    images: [
      "/assets/tentimage.png",
      "/assets/tentimage.png",
      "/assets/tentimage.png",
      "/assets/tentimage.png",
      "/assets/tentimage.png"
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="bg-white rounded-xl p-4 mb-6">
          <div className="relative h-[400px] mb-4">
            <img 
              src={property.images[currentImageIndex]}
              alt="Main Property View"
              className="w-full h-full object-cover rounded-lg"
            />
            
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
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {property.images.map((image, index) => (
              <img 
                key={index}
                src={image}
                alt={`Property View ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition-all ${
                  currentImageIndex === index 
                    ? 'ring-2 ring-violet-600 opacity-100' 
                    : 'opacity-60 hover:opacity-100'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(property.details).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <p className="text-gray-500 text-sm">{key}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities Section */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <amenity.icon className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-medium">{amenity.name}</h3>
                  <p className="text-sm text-gray-500">{amenity.distance}</p>
                  {amenity.places.map((place, i) => (
                    <p key={i} className="text-sm text-gray-600">{place}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <p className="text-gray-600 mb-2">{property.address.full}</p>
          <p className="text-gray-600 mb-2">Area: {property.address.area}</p>
          <p className="text-violet-600 font-medium mb-4">{property.address.zone}</p>
          
          {/* Map */}
          <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2600678458396!2d77.64042937473893!3d13.020613987318565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17b1c6ff3edf%3A0x1e98e3e73d40c337!2sHRBR%20Layout%2C%20Kalyan%20Nagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1709799171599!5m2!1sen!2sin"
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