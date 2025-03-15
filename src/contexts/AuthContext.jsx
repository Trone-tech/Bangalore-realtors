import React, { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_EMAIL, ADMIN_PASSWORD, logAction } from '../firebase';

// Create the auth context
const AuthContext = createContext(null);

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Local storage key for session auth
const SESSION_USER_KEY = 'bangaloreRealtors_adminUser';

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign in function - simple credential check
  const login = async (email, password) => {
    try {
      // Check if credentials match admin values
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log("Valid credentials, logging in");
        
        // Create user object
        const user = {
          email: ADMIN_EMAIL,
          isAdmin: true
        };
        
        // Store in local storage for persistence
        localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
        
        // Update state
        setCurrentUser(user);
        
        // Log the login action
        try {
          await logAction('admin_login', {
            message: 'Admin login successful',
            email
          });
        } catch (error) {
          console.warn("Could not log login action:", error);
        }
        
        return user;
      } else {
        // Log failed login attempt
        try {
          await logAction('admin_login_failed', {
            message: 'Invalid credentials',
            email
          });
        } catch (error) {
          console.warn("Could not log failed login:", error);
        }
        
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Sign out function
  const logout = async () => {
    try {
      // Remove from local storage
      localStorage.removeItem(SESSION_USER_KEY);
      
      // Update state
      setCurrentUser(null);
      
      // Log the logout action
      try {
        await logAction('admin_logout', {
          message: 'Admin logged out',
          email: ADMIN_EMAIL
        });
      } catch (error) {
        console.warn("Could not log logout:", error);
      }
      
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      
      try {
        // Check local storage for user data
        const storedUser = localStorage.getItem(SESSION_USER_KEY);
        
        if (storedUser) {
          const user = JSON.parse(storedUser);
          console.log("Found stored user session, restoring login");
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Clear potentially corrupted data
        localStorage.removeItem(SESSION_USER_KEY);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Value provided to consumers of this context
  const value = {
    currentUser,
    login,
    logout,
    isAdmin: !!currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mr-3"></div>
          <span className="text-lg text-gray-700">Loading authentication...</span>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext; 