import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Percent, Settings, Instagram, Twitter, Linkedin, Home } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { getDatabase, ref, get, query, limitToFirst } from 'firebase/database';
import { app } from '../firebase';

interface Property {
  id?: string;
  price: string;
  location: string;
  beds: string;
  baths: string;
  area: string;
  popular: boolean;
  region: string;
  priceNum: number;
  title: string;
  description: string;
  amenities: string[];
}

function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFeaturedProperties = async () => {
      try {
        const db = getDatabase(app);
        const propertiesRef = ref(db, 'properties');
        const snapshot = await get(propertiesRef);
        
        if (snapshot.exists()) {
          const propertiesData = snapshot.val();
          const propertiesList = Object.entries(propertiesData)
            .map(([id, data]) => ({
              id,
              ...(data as Omit<Property, 'id'>)
            }))
            .filter(property => property.popular)
            .slice(0, 3);
          setFeaturedProperties(propertiesList);
        }
      } catch (error) {
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProperties();
  }, []);

  return (
    <>
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16">
            <div className="w-full md:w-5/12">
              <div className="bg-gray-50 rounded-lg p-8">
                <img 
                  src="/assets/Illustration.png" 
                  alt="Property Illustration" 
                  className="w-full cursor-pointer transition-transform hover:scale-105"
                  onClick={() => {
                    document.getElementById('section-3')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-6/12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <img src="/assets/s1.png" alt="Property Insurance" className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Property Insurance</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">We offer our customers property protection and liability coverage with insurance for their better life.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <img src="/assets/s2.png" alt="Best Price" className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Best Price</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Not sure what you should be charging for your property? No need to worry, let us do the numbers for you!</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <img src="/assets/s3.png" alt="Lowest Commission" className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Lowest Commission</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">You no longer have to negotiate commissions and haggle with other agents! Only costs 2%!</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <img src="/assets/s4.png" alt="Overall Control" className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Overall Control</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Get a virtual tour and schedule visits before you rent or buy any properties. You get overall control.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Property Listings */}
      <section id="section-3" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Based on your location</h2>
              <p className="text-gray-600">Some of our picked properties near you location.</p>
            </div>
            <Link to="/browse" className="mt-4 md:mt-0 bg-violet-600 text-white px-6 py-2 rounded-md hover:bg-violet-700 transition-colors">
              Browse more properties
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">Loading featured properties...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProperties.map((property) => (
                <div key={property.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    {property.popular && (
                      <div className="absolute left-4 top-4 bg-violet-600 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 font-medium">
                        <img src="/assets/Vector.png" alt="Star" className="w-4 h-4" />
                        <span>POPULAR</span>
                      </div>
                    )}
                    <img src="/assets/tentimage.png" alt={property.title || 'Property'} className="w-full h-52 object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline">
                        <span className="text-violet-600 text-2xl font-semibold">₹</span>
                        <span className="text-2xl font-semibold">{property.price}</span>
                        <span className="text-gray-500 text-sm ml-1">/month</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{property.title || 'Modern Apartment'}</h3>
                      <p className="text-gray-500 text-sm">{property.location}</p>
                    </div>
                    <div className="flex items-center gap-6 mt-6">
                      <div className="flex items-center gap-2">
                        <img src="/assets/Bed.png" alt="Beds" className="w-5 h-5" />
                        <span className="text-gray-600">{property.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="/assets/Bath.png" alt="Bathrooms" className="w-5 h-5" />
                        <span className="text-gray-600">{property.baths} Bathrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="/assets/Square Meters.png" alt="Area" className="w-5 h-5" />
                        <span className="text-gray-600">{property.area} m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 4 - Services */}
      <section className="py-20 bg-[#1C1C4D] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sell <span className="text-[#4A3AFF]">Fast</span>, Buy <span className="text-[#4A3AFF]">Safe</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Whether it's selling your current home, getting financing, or buying a new home, we make it easy and efficient. The best part? you'll save a bunch of money and time with our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Service Box 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all">
              <img src="/assets/1.png" alt="Shortlist without visit" className="w-full h-48 object-cover rounded-xl mb-6" />
              <h3 className="text-xl font-semibold mb-3">Shortlist without visit</h3>
              <p className="text-gray-300 text-sm mb-4">Find your property using the Search Engine to locate them on MAP & visit the property at your convenience.</p>
              <button className="bg-[#4A3AFF] text-white px-6 py-2 rounded-lg hover:bg-[#3A2ECC] transition-colors">
                Learn More
              </button>
            </div>

            {/* Service Box 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all">
              <img src="/assets/2.png" alt="Hassle-free property selling" className="w-full h-48 object-cover rounded-xl mb-6" />
              <h3 className="text-xl font-semibold mb-3">Hassle-free property selling</h3>
              <p className="text-gray-300 text-sm mb-4">Post your residential or commercial property, and we'll help you navigate the path to successful sales.</p>
              <button className="bg-[#4A3AFF] text-white px-6 py-2 rounded-lg hover:bg-[#3A2ECC] transition-colors">
                Learn More
              </button>
            </div>

            {/* Service Box 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all">
              <img src="/assets/3.png" alt="Get assistance" className="w-full h-48 object-cover rounded-xl mb-6" />
              <h3 className="text-xl font-semibold mb-3">Get assistance</h3>
              <p className="text-gray-300 text-sm mb-4">Get assistance throughout your property purchase journey till you close the deal with us.</p>
              <button className="bg-[#4A3AFF] text-white px-6 py-2 rounded-lg hover:bg-[#3A2ECC] transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
            <div>
              <h3 className="text-3xl font-bold mb-2">7.4%</h3>
              <p className="text-gray-300">Property Return Rate</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">3,856</h3>
              <p className="text-gray-300">Property in Sell & Rent</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">2,540</h3>
              <p className="text-gray-300">Daily Completed Transactions</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage; 