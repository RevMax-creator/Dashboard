import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import ThemeToggle from './ThemeToggle';

const OffcanvasNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false); // Close the offcanvas menu on logout
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-gray-700 text-white rounded-full">
        Menu
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transition-opacity duration-300 ease-in-out">
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-lg p-4 z-50 transition-transform transform translate-x-0">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors"
            >
              X
            </button>
            <div className="relative mt-4">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center p-4 bg-gray-700 text-white rounded-full"
                style={{ width: '40px', height: '40px' }}
              >
                {user?.email[0]?.toUpperCase() || 'P'}
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md transition-opacity duration-300 ease-in-out">
                  <p className="p-4">{user?.email}</p>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full transition-colors"
            >
              Logout
            </button>
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OffcanvasNavbar;