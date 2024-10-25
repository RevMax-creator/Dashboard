import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true); 
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className={`text-5xl font-bold mb-6 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        Welcome to Our Data Visualization App
      </h1>
      <p className={`text-lg text-center mb-8 transition-opacity duration-1000 delay-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        Monitor and visualize your data with real-time updates. Our app provides user-friendly graphs and charts to help you make data-driven decisions.
      </p>
      <button
        onClick={handleGetStarted}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;