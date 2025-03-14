import React from 'react';
import { MapPin, Clock, Phone, Mail, Award, Users, Home, Shield } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="pt-20 bg-[--background]">
      {/* Hero Section */}
      <div className="hero-gradient text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
              Your Trusted Real Estate Partner in Bangalore
            </h1>
            <p className="text-xl text-gray-100 slide-up">
              We help you find the perfect property across all zones of Bangalore with our expert guidance and local knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-4 text-[--text-primary]">Our Mission</h2>
              <p className="text-[--text-secondary]">
                To provide exceptional real estate services by understanding our clients' needs and delivering personalized solutions with integrity and professionalism.
              </p>
            </div>
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-4 text-[--text-primary]">Our Vision</h2>
              <p className="text-[--text-secondary]">
                To be the most trusted and preferred real estate partner in Bangalore, known for our expertise, transparency, and customer-centric approach.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[--text-primary]">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[--primary] bg-opacity-10 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-[--primary]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">15+ Years Experience</h3>
              <p className="text-[--text-secondary]">
                Extensive experience in Bangalore's real estate market
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[--primary] bg-opacity-10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-[--primary]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Team</h3>
              <p className="text-[--text-secondary]">
                Professional and knowledgeable real estate experts
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[--primary] bg-opacity-10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-[--primary]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Trusted Service</h3>
              <p className="text-[--text-secondary]">
                Committed to transparency and client satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-8 text-[--text-primary]">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-[--primary] mr-4" />
                  <div>
                    <h3 className="font-semibold">Office Address</h3>
                    <p className="text-[--text-secondary]">123 Real Estate Avenue, Bangalore - 560001</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-[--primary] mr-4" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-[--text-secondary]">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-[--primary] mr-4" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-[--text-secondary]">info@bangalorerealtors.com</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-[--primary] mr-4" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-[--text-secondary]">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p className="text-[--text-secondary]">Sunday: By Appointment</p>
                  </div>
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