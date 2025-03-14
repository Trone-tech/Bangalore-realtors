import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowseProperties from './pages/BrowseProperties';
import PropertyDetails from './pages/PropertyDetails';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <div className="min-h-screen bg-white flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowseProperties />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;