import { 
  ref, 
  get, 
  set, 
  push, 
  update, 
  remove, 
  serverTimestamp,
  getDatabase 
} from 'firebase/database';
import { database as firebaseDatabase, logAction, ADMIN_EMAIL, ADMIN_PASSWORD } from '../firebase';

// Get database reference
let database = firebaseDatabase;

// Re-initialize database if needed
if (!database) {
  try {
    console.log("Trying to initialize database again");
    database = getDatabase();
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// Property Management functions
const createProperty = async (propertyData) => {
  if (!database) {
    console.error("Database is not initialized");
    throw new Error("Database service is not available");
  }

  try {
    const propertiesRef = ref(database, 'properties');
    const newPropertyRef = push(propertiesRef);
    
    // Add metadata
    const propertyWithMetadata = {
      ...propertyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await set(newPropertyRef, propertyWithMetadata);
    
    // Log property creation
    try {
      await logAction('property_created', {
        propertyId: newPropertyRef.key,
        propertyTitle: propertyData.title,
        email: ADMIN_EMAIL
      });
    } catch (logError) {
      console.warn("Could not log property creation:", logError);
    }
    
    return {
      id: newPropertyRef.key,
      ...propertyWithMetadata
    };
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};

const getAllProperties = async () => {
  if (!database) {
    console.error("Database is not initialized");
    throw new Error("Database service is not available");
  }

  try {
    const propertiesRef = ref(database, 'properties');
    const snapshot = await get(propertiesRef);
    
    if (snapshot.exists()) {
      const propertiesData = snapshot.val();
      return Object.entries(propertiesData).map(([id, data]) => ({
        id,
        ...data,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

const getPropertyById = async (propertyId) => {
  if (!database) {
    console.error("Database is not initialized");
    throw new Error("Database service is not available");
  }

  try {
    const propertyRef = ref(database, `properties/${propertyId}`);
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
    throw error;
  }
};

const updateProperty = async (propertyId, propertyData) => {
  if (!database) {
    console.error("Database is not initialized");
    throw new Error("Database service is not available");
  }

  try {
    const propertyRef = ref(database, `properties/${propertyId}`);
    
    // Add metadata
    const propertyWithMetadata = {
      ...propertyData,
      updatedAt: serverTimestamp()
    };
    
    await update(propertyRef, propertyWithMetadata);
    
    // Log property update
    try {
      await logAction('property_updated', {
        propertyId,
        propertyTitle: propertyData.title,
        email: ADMIN_EMAIL
      });
    } catch (logError) {
      console.warn("Could not log property update:", logError);
    }
    
    return {
      id: propertyId,
      ...propertyWithMetadata
    };
  } catch (error) {
    console.error(`Error updating property with ID ${propertyId}:`, error);
    throw error;
  }
};

const deleteProperty = async (propertyId) => {
  if (!database) {
    console.error("Database is not initialized");
    throw new Error("Database service is not available");
  }

  try {
    // Get property data for logging
    let property = null;
    try {
      property = await getPropertyById(propertyId);
    } catch (error) {
      console.warn(`Could not fetch property with ID ${propertyId} for logging:`, error);
    }
    
    const propertyRef = ref(database, `properties/${propertyId}`);
    await remove(propertyRef);
    
    // Log property deletion
    try {
      await logAction('property_deleted', {
        propertyId,
        propertyTitle: property?.title || 'Unknown property',
        email: ADMIN_EMAIL
      });
    } catch (logError) {
      console.warn("Could not log property deletion:", logError);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting property with ID ${propertyId}:`, error);
    throw error;
  }
};

export const adminService = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
}; 