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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16">
            <div className="w-full md:w-5/12">
              <div className="bg-gray-50 rounded-lg p-8">
                {/* <h2 className="text-2xl font-bold text-indigo-900 mb-2">The new way to find your new Dream Property</h2> */}
                {/* <p className="text-gray-600 mb-6">Find your dream place to live in with more than 10k+ properties listed.</p> */}
                {/* <button className="bg-indigo-900 text-white px-6 py-2 rounded-md hover:bg-indigo-800 transition-colors mb-8"> */}
                  {/* Browse Properties */}
                {/* </button> */}
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
                  <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Property Insurance</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">We offer our customers property protection and liability coverage with insurance for their better life.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    <Building2 className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Best Price</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Not sure what you should be charging for your property? No need to worry, let us do the numbers for you!</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    <Percent className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Lowest Commission</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">You no longer have to negotiate commissions and haggle with other agents! Only costs 2%!</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    <Settings className="w-5 h-5 text-violet-600" />
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
            <button className="mt-4 md:mt-0 bg-violet-600 text-white px-6 py-2 rounded-md hover:bg-violet-700 transition-colors">
              Browse more properties
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                price: "2,095",
                location: "Bommasandra, Bangalore -xxx",
                beds: "3",
                baths: "2",
                area: "5x7",
                popular: true
              },
              {
                price: "2,700",
                location: "RamMurthy Nagar, Bangalore -xxx",
                beds: "4",
                baths: "2",
                area: "6x7.5",
                popular: true
              },
              {
                price: "4,550",
                location: "Kaggadaspur, Bangalore -xxx",
                beds: "4",
                baths: "3",
                area: "8x7",
                popular: true
              },
              {
                price: "2,400",
                location: "NRI Layout, Bangalore -xxx",
                beds: "4",
                baths: "2",
                area: "6x7"
              },
              {
                price: "1,200",
                location: "HBR layout, Bangalore -xxx",
                beds: "2",
                baths: "1",
                area: "5x5"
              },
              {
                price: "1,600",
                location: "Whitefield, Bangalore -xxx",
                beds: "3",
                baths: "1",
                area: "5x7"
              }
            ].map((property, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  {property.popular && (
                    <div className="absolute left-4 top-4 bg-violet-600 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 font-medium">
                      <img src="../public/assets/Vector.png" alt="Star" className="w-4 h-4" />
                      <span>POPULAR</span>
                    </div>
                  )}
                  <img src="/assets/tentimage.png" alt={`Property ${index + 1}`} className="w-full h-52 object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline">
                      <span className="text-violet-600 text-2xl font-semibold">₹</span>
                      <span className="text-2xl font-semibold">{property.price}</span>
                      <span className="text-gray-500 text-sm ml-1">/month</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Lorem Ipsum</h3>
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