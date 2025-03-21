import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Clock } from 'lucide-react';

const PropertySubmissionSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <Clock size={64} className="text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Property Submitted Successfully
        </h1>
        <div className="flex justify-center items-center mb-6">
          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
            Awaiting Admin Approval
          </span>
        </div>
        <p className="text-gray-600 mb-8">
          Thank you for submitting your property. Our admin team will review your listing and approve it shortly.
          You will be notified once your property listing is live on our website.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full py-3 px-4 rounded-md bg-indigo-600 text-white text-center hover:bg-indigo-700 transition-colors"
          >
            Return to Homepage
          </Link>
          
          <Link
            to="/browse"
            className="block w-full py-3 px-4 rounded-md bg-white border border-gray-300 text-gray-700 text-center hover:bg-gray-50 transition-colors"
          >
            Browse Properties
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>If you have any questions, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
};

export default PropertySubmissionSuccess; 