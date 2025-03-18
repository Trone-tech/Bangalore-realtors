import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import NewHomePage from './pages/NewHomePage.jsx';
import BrowseProperties from './pages/BrowseProperties.jsx';
import BuyProperties from './pages/BuyProperties.jsx';
import RentProperties from './pages/RentProperties.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Footer from './components/Footer.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import PropertyForm from './pages/PropertyForm.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

const App = () => {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<NewHomePage />} />
            <Route path="/browse" element={<BrowseProperties />} />
            <Route path="/buy" element={<BuyProperties />} />
            <Route path="/rent" element={<RentProperties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/about" element={<AboutUs />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/add-property" element={
              <ProtectedRoute>
                <PropertyForm />
              </ProtectedRoute>
            } />
            <Route path="/edit-property/:id" element={
              <ProtectedRoute>
                <PropertyForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/properties/new" element={
              <ProtectedRoute>
                <PropertyForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/properties/edit/:id" element={
              <ProtectedRoute>
                <PropertyForm />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;