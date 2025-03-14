import React from 'react';
import Navbar from '../components/Navbar';
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-violet-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Bangalore Realtors</h1>
          <p className="text-lg text-violet-100 max-w-2xl">
            Your trusted partner in finding the perfect property in Bangalore. We bring years of experience and local expertise to help you make informed real estate decisions.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide exceptional real estate services by combining local market expertise with cutting-edge technology, ensuring our clients find their perfect property match while maintaining the highest standards of professionalism and integrity.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the most trusted and innovative real estate company in Bangalore, known for our commitment to excellence, transparency, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                Deep understanding of Bangalore's real estate market and neighborhoods
              </p>
            </div>
            <div className="text-center">
              <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock assistance for all your property needs
              </p>
            </div>
            <div className="text-center">
              <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Properties</h3>
              <p className="text-gray-600">
                All listings are thoroughly verified for your peace of mind
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-violet-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Office Address</h3>
                  <p className="text-gray-600">123 Tech Park, Whitefield, Bangalore - 560066</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-violet-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-violet-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">info@bangalorerealtors.com</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 