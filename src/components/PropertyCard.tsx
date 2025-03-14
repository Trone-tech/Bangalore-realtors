import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, Bed, Bath, Square } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  area: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  zone: 'north' | 'south' | 'east' | 'west' | 'central';
  type: 'rent' | 'sale';
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  location,
  area,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  imageUrl,
  zone,
  type
}) => {
  return (
    <Link to={`/property/${id}`} className="property-card group">
      <div className="relative overflow-hidden">
        {/* Property Image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover"
        />
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full">
          <span className="font-semibold text-[--text-primary]">
            ₹{price}{type === 'rent' ? '/month' : ''}
          </span>
        </div>

        {/* Location Badge */}
        <div className={`absolute top-4 left-4 location-badge location-${zone}`}>
          {zone.charAt(0).toUpperCase() + zone.slice(1)} Bangalore
        </div>
      </div>

      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[--text-primary] mb-2">{title}</h3>
          <div className="flex items-center text-[--text-secondary]">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{area}, {location}</span>
          </div>
        </div>

        {/* Property Features */}
        <div className="flex items-center justify-between text-[--text-secondary] border-t border-gray-100 pt-4">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span className="text-sm">{bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span className="text-sm">{bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span className="text-sm">{squareFeet} sq.ft</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
export default PropertyCard;