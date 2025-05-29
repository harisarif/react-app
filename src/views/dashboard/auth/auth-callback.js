import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('access_token', token);
      
      // Optional: You might want to decode the token to get user info
      // const userData = JSON.parse(atob(token.split('.')[1]));
      // localStorage.setItem('user', JSON.stringify(userData));
      
      // Redirect to home page after a short delay
      const redirectTimer = setTimeout(() => {
        navigate('/');
      }, 1000);

      return () => clearTimeout(redirectTimer);
    } else {
      // If no token is found, redirect to login
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Signing you in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;