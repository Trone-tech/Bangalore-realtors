import React from 'react';
import { Building2, Shield, Percent, Settings, Instagram, Twitter, Linkedin, Home } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';
import StatCard from './components/StatCard';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
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
              <p className="text-gray-600 mb-4 md:mb-0">©2025 Bangalore Realtors. All rights reserved</p>
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
  );
}

export default App;