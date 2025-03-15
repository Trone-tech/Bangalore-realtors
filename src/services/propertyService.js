import { database } from '../firebase';
import { ref, get, query, orderByChild, equalTo, startAt, endAt, getDatabase } from 'firebase/database';

// Make sure database is initialized
let db = database;
if (!db) {
  try {
    console.warn("Database not initialized in propertyService, attempting to initialize...");
    db = getDatabase();
    console.log("Database initialization successful");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}

// Sample property data structure for reference
const sampleProperty = {
  id: '1',
  title: 'Modern Apartment',
  description: 'A beautiful modern apartment in the heart of the city',
  location: 'Banasawadi, Bangalore-560033',
  price: 25000,
  priceType: 'month', // 'month' for rent, 'total' for sale
  propertyType: 'apartment', // apartment, house, villa, etc.
  beds: 3,
  baths: 2,
  area: 1742,
  areaUnit: 'sqft',
  popular: true,
  featured: true,
  amenities: ['parking', 'gym', 'swimming pool', 'security'],
  images: ['/assets/1.png'],
  listingType: 'rent', // 'rent' or 'sale'
  status: 'available', // available, sold, rented
  createdAt: '2023-01-01'
};

// Get all properties
const getAllProperties = async () => {
  try {
    console.log("Fetching all properties...");
    const propertiesRef = ref(db, 'properties');
    const snapshot = await get(propertiesRef);
    
    console.log("Snapshot exists:", snapshot.exists());
    
    if (snapshot.exists()) {
      const propertiesData = snapshot.val();
      console.log("Properties data:", propertiesData);
      const propertiesList = Object.entries(propertiesData).map(([id, data]) => ({
        id,
        ...data,
      }));
      console.log("Processed properties list:", propertiesList);
      return propertiesList;
    } else {
      console.log("No properties found in database");
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// Get properties by listing type (rent or sale)
const getPropertiesByListingType = async (listingType) => {
  try {
    const propertiesRef = ref(db, 'properties');
    const listingQuery = query(propertiesRef, orderByChild('listingType'), equalTo(listingType));
    const snapshot = await get(listingQuery);
    
    if (snapshot.exists()) {
      const propertiesData = snapshot.val();
      return Object.entries(propertiesData).map(([id, data]) => ({
        id,
        ...data,
      }));
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching ${listingType} properties:`, error);
    return [];
  }
};

// Get properties by location
const getPropertiesByLocation = async (location) => {
  try {
    // First get all properties
    const allProperties = await getAllProperties();
    
    // Filter by location using JavaScript
    return allProperties.filter(property => 
      property.location.toLowerCase().includes(location.toLowerCase())
    );
  } catch (error) {
    console.error(`Error fetching properties by location:`, error);
    return [];
  }
};

// Get properties by price range
const getPropertiesByPriceRange = async (minPrice, maxPrice) => {
  try {
    // Firebase RTDB doesn't directly support range queries
    // So we'll get all properties and filter them with JavaScript
    const allProperties = await getAllProperties();
    
    return allProperties.filter(property => {
      const price = parseInt(property.price);
      return price >= minPrice && price <= maxPrice;
    });
  } catch (error) {
    console.error(`Error fetching properties by price range:`, error);
    return [];
  }
};

// Get properties by property type
const getPropertiesByPropertyType = async (propertyType) => {
  try {
    const propertiesRef = ref(db, 'properties');
    const typeQuery = query(propertiesRef, orderByChild('propertyType'), equalTo(propertyType));
    const snapshot = await get(typeQuery);
    
    if (snapshot.exists()) {
      const propertiesData = snapshot.val();
      return Object.entries(propertiesData).map(([id, data]) => ({
        id,
        ...data,
      }));
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching ${propertyType} properties:`, error);
    return [];
  }
};

// Get properties by number of bedrooms
const getPropertiesByBedrooms = async (beds) => {
  try {
    const propertiesRef = ref(db, 'properties');
    const bedsQuery = query(propertiesRef, orderByChild('beds'), equalTo(beds));
    const snapshot = await get(bedsQuery);
    
    if (snapshot.exists()) {
      const propertiesData = snapshot.val();
      return Object.entries(propertiesData).map(([id, data]) => ({
        id,
        ...data,
      }));
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching properties with ${beds} bedrooms:`, error);
    return [];
  }
};

// Get property by ID
const getPropertyById = async (propertyId) => {
  try {
    const propertyRef = ref(db, `properties/${propertyId}`);
    const snapshot = await get(propertyRef);
    
    if (snapshot.exists()) {
      return {
        id: propertyId,
        ...snapshot.val()
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching property with ID ${propertyId}:`, error);
    return null;
  }
};

// Advanced search with multiple filters
const searchProperties = async (filters) => {
  try {
    console.log("Search filters:", filters);
    // Start with all properties
    let properties = await getAllProperties();
    console.log("Initial properties count:", properties.length);
    
    // Apply filters one by one
    if (filters.listingType) {
      properties = properties.filter(property => property.listingType === filters.listingType);
      console.log("After listingType filter, properties count:", properties.length);
    }
    
    if (filters.location) {
      properties = properties.filter(property => 
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
      console.log("After location filter, properties count:", properties.length);
    }
    
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      properties = properties.filter(property => {
        const price = parseInt(property.price);
        return price >= filters.minPrice && price <= filters.maxPrice;
      });
      console.log("After price filter, properties count:", properties.length);
    }
    
    if (filters.propertyType) {
      properties = properties.filter(property => property.propertyType === filters.propertyType);
      console.log("After propertyType filter, properties count:", properties.length);
    }
    
    if (filters.zone) {
      properties = properties.filter(property => property.zone === filters.zone);
      console.log("After zone filter, properties count:", properties.length);
    }
    
    if (filters.beds) {
      properties = properties.filter(property => property.beds >= filters.beds);
      console.log("After beds filter, properties count:", properties.length);
    }
    
    if (filters.baths) {
      properties = properties.filter(property => property.baths >= filters.baths);
      console.log("After baths filter, properties count:", properties.length);
    }
    
    if (filters.minArea !== undefined && filters.maxArea !== undefined) {
      properties = properties.filter(property => {
        const area = parseInt(property.area);
        return area >= filters.minArea && area <= filters.maxArea;
      });
      console.log("After area filter, properties count:", properties.length);
    }
    
    return properties;
  } catch (error) {
    console.error('Error searching properties:', error);
    return [];
  }
};

export const propertyService = {
  getAllProperties,
  getPropertiesByListingType,
  getPropertiesByLocation,
  getPropertiesByPriceRange,
  getPropertiesByPropertyType,
  getPropertiesByBedrooms,
  getPropertyById,
  searchProperties
}; 