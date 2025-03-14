import { ref, get, set, push, update, remove } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { database } from '../firebase';

export interface Property {
  id?: string;
  title: string;
  price: string;
  priceNum: number;
  location: string;
  beds: string;
  baths: string;
  area: string;
  popular: boolean;
  region: string;
  description: string;
  amenities: string[];
  features: {
    [key: string]: boolean;
    parking: boolean;
    garden: boolean;
    security: boolean;
    gym: boolean;
    pool: boolean;
  };
  images: string[];
  propertyType: string;
  constructionStatus: string;
  possession: string;
  furnishing: string;
  facing: string;
  floor: string;
  totalFloors: string;
  ageOfProperty: string;
  maintenanceCharges: string;
  availableFrom: string;
  nearbyPlaces: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    preferredContactMethod: string;
  };
}

export const propertyService = {
  async getAllProperties(): Promise<Property[]> {
    try {
      const propertiesRef = ref(database, 'properties');
      const snapshot = await get(propertiesRef);
      
      if (snapshot.exists()) {
        const propertiesData = snapshot.val();
        return Object.entries(propertiesData).map(([id, data]) => ({
          id,
          ...(data as Omit<Property, 'id'>)
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },

  async getPopularProperties(): Promise<Property[]> {
    try {
      const properties = await this.getAllProperties();
      return properties.filter(property => property.popular);
    } catch (error) {
      console.error('Error fetching popular properties:', error);
      throw error;
    }
  },

  async getPropertyById(id: string): Promise<Property | null> {
    try {
      const propertyRef = ref(database, `properties/${id}`);
      const snapshot = await get(propertyRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        return {
          id,
          ...data
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  },

  async uploadImage(file: File, propertyId: string): Promise<string> {
    try {
      const storage = getStorage();
      const imageRef = storageRef(storage, `properties/${propertyId}/${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const storage = getStorage();
      const imageRef = storageRef(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },

  async addProperty(property: Omit<Property, 'id'>): Promise<string> {
    try {
      const propertiesRef = ref(database, 'properties');
      const newPropertyRef = push(propertiesRef);
      await set(newPropertyRef, property);
      return newPropertyRef.key as string;
    } catch (error) {
      console.error('Error adding property:', error);
      throw error;
    }
  },

  async updateProperty(id: string, property: Omit<Property, 'id'>): Promise<void> {
    try {
      const propertyRef = ref(database, `properties/${id}`);
      await update(propertyRef, property);
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  },

  async deleteProperty(id: string): Promise<void> {
    try {
      // First, delete all images associated with the property
      const property = await this.getPropertyById(id);
      if (property && property.images) {
        await Promise.all(property.images.map(imageUrl => this.deleteImage(imageUrl)));
      }
      
      // Then delete the property data
      const propertyRef = ref(database, `properties/${id}`);
      await remove(propertyRef);
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  }
}; 