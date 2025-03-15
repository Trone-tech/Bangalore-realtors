import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('test@gmail.com'); // Pre-fill with demo credentials
  const [password, setPassword] = useState('test123');   // Pre-fill with demo credentials
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, login, loading: authLoading } = useAuth();
  
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/admin/dashboard';
  
  // Check if user is already logged in
  useEffect(() => {
    if (currentUser) {
      console.log("User already logged in, redirecting to dashboard");
      navigate('/admin/dashboard');
    }
  }, [currentUser, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatusMessage('');
    setLoading(true);
    
    try {
      // Validate email format
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      // Validate password
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      setStatusMessage("Signing in...");
      const user = await login(email, password);
      
      if (user) {
        setStatusMessage("Login successful! Redirecting...");
        // Navigate to the page they were trying to access or dashboard
        navigate(from, { replace: true });
      } else {
        throw new Error('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login. Please check your credentials.');
      setStatusMessage('');
    } finally {
      setLoading(false);
    }
  };
  
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mr-3"></div>
        <span className="text-lg">Checking authentication...</span>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-md">
            {error}
          </div>
        )}
        
        {statusMessage && (
          <div className="bg-blue-50 text-blue-800 p-4 rounded-md flex items-center">
            <div className="mr-3 animate-spin h-4 w-4 border-2 border-blue-600 rounded-full border-t-transparent"></div>
            {statusMessage}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="text-center text-sm">
            <p className="text-gray-600">
              For demo purposes, use:
            </p>
            <p className="mt-1 text-gray-800">
              Email: <span className="font-semibold">test@gmail.com</span>
            </p>
            <p className="text-gray-800">
              Password: <span className="font-semibold">test123</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 