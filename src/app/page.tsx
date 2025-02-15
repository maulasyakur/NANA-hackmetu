"use client"

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login (for demonstration purposes)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-black">
          Welcome to
        </h1>
        <h1 className="text-2xl font-bold text-center mb-4 text-black">
          NANA
        </h1>
        <div className="space-y-4">
          {isLoggedIn ? (
            // Show these buttons if the user is logged in
            <>
              <Link href="/book_appointment">
                <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Book an Appointment
                </button>
              </Link>
              <Link href="/my_appointment">
                <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  See my Appointments
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Log Out
              </button>
            </>
          ) : (
            // Show these buttons if the user is not logged in
            <>
              <Link href="/login">
                <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Log In
                </button>
              </Link>
              <Link href="/signup">
                <button className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}