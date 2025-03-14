import React from 'react';
import { Users, Award, Clock, Building } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Bangalore Realtors</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner in finding the perfect property in Bangalore. We combine local expertise with modern technology to make your property journey seamless.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="bg-violet-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">5000+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="bg-violet-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">2000+</h3>
            <p className="text-gray-600">Properties Listed</p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="bg-violet-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">10+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="bg-violet-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">Support Available</p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At Bangalore Realtors, we strive to revolutionize the real estate industry by providing transparent, efficient, and customer-centric services. Our mission is to make property transactions seamless and stress-free for every client.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Transparency</h3>
              <p className="text-gray-600">We believe in complete transparency in all our dealings, providing accurate information and fair pricing.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Excellence</h3>
              <p className="text-gray-600">We strive for excellence in every aspect of our service, from property listings to customer support.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Innovation</h3>
              <p className="text-gray-600">We leverage the latest technology to provide innovative solutions for all your real estate needs.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                position: "CEO & Founder",
                image: "/assets/team1.jpg"
              },
              {
                name: "Priya Sharma",
                position: "Head of Operations",
                image: "/assets/team2.jpg"
              },
              {
                name: "Arun Verma",
                position: "Chief Technology Officer",
                image: "/assets/team3.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/128';
                    }}
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 