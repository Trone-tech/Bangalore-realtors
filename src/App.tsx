import React from 'react';
import { MapPin, Home, Building2, Shield, Percent, Settings, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import FeatureCard from './components/FeatureCard';
import StatCard from './components/StatCard';

function App() {
  const navigate = useNavigate();

  const handleBrowseProperties = () => {
    const propertiesSection = document.getElementById('properties');
    propertiesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        {/* Background Map Blur Effect */}
        <div 
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: 'cover',
            filter: 'blur(40px)'
          }}
        />

        {/* Main Content */}
        <div className="relative z-10">
          <Navbar />
          
          {/* Hero Section */}
          <section className="min-h-screen flex items-center">
            <div className="container mx-auto px-4 py-16 md:py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    Buy, rent, or sell<br />your property<br />easily
                  </h1>
                  <p className="text-gray-600 mb-8">
                    A great platform to buy, sell, or even rent your properties without any commissions.
                  </p>
                  <div className="flex gap-4 mb-8">
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold">50k+</div>
                      <div className="text-sm text-gray-500">Properties</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold">10k+</div>
                      <div className="text-sm text-gray-500">Happy Customers</div>
                    </div>
                  </div>

                  {/* Search Box */}
                  <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                      <button className="px-4 py-2 rounded-full bg-violet-100 text-violet-600">Rent</button>
                      <button className="px-4 py-2 rounded-full">Buy</button>
                      <button className="px-4 py-2 rounded-full">Sell</button>
                    </div>
                    <div className="flex justify-center">
                      <button 
                        onClick={handleBrowseProperties}
                        className="w-full px-6 py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors"
                      >
                        Browse Properties
                      </button>
                    </div>
                  </div>
                </div>

                <div className="relative hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    alt="Featured Property"
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="font-semibold">Lorem Ipsum</h3>
                    <p className="text-gray-600">Hill layout, Bangalore</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-violet-600 font-semibold">₹2,000</span>
                      <span className="text-sm text-gray-500">/ month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="min-h-screen flex items-center bg-gray-50">
            <div className="container mx-auto px-4 py-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-12">The new way to find<br />your new home</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard
                  icon={<Shield />}
                  title="Property Insurance"
                  description="Get complete property protection and liability coverage with our insurance."
                />
                <FeatureCard
                  icon={<Building2 />}
                  title="Best Price"
                  description="Find the best price for your property. No need to worry, let us do the calculations."
                />
                <FeatureCard
                  icon={<Percent />}
                  title="Lowest Commission"
                  description="You no longer have to pay high commissions to property agents, whether selling or buying."
                />
                <FeatureCard
                  icon={<Settings />}
                  title="Overall Control"
                  description="Get a total view and take control of your properties. Manage everything in one place."
                />
              </div>
            </div>
          </section>

          {/* Properties Section */}
          <section id="properties" className="min-h-screen flex items-center">
            <div className="container mx-auto px-4 py-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Based on your location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <PropertyCard key={i} />
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="min-h-screen flex items-center bg-navy-900 text-white">
            <div className="container mx-auto px-4 py-16">
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">Sell Fast, Buy Safe</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                  number="7.4%"
                  title="Property Return Rate"
                  description="Find the property that suits your needs and budget"
                />
                <StatCard
                  number="3,856"
                  title="Properties Sold"
                  description="Happy customers who found their dream homes"
                />
                <StatCard
                  number="2,540"
                  title="Daily Transactions"
                  description="Successful property transactions every day"
                />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-white border-t">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Home className="h-6 w-6 text-violet-600" />
                    <span className="text-xl font-bold">Bangalore Realtors</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">SELL A HOME</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Request an offer</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Reviews</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">BUY, RENT AND SELL</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Buy and sell properties</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Rent home</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Builder trade-up</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">ABOUT</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Company</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">How it works</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Investors</a></li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-600 mb-4 md:mb-0">©2021 Bangalore Realtors. All rights reserved</p>
                  <div className="flex space-x-6">
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;