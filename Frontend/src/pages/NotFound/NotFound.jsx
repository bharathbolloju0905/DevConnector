import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
    <div className="flex flex-col items-center">
      <div className="text-[#4C4EE7] font-bold text-8xl md:text-9xl mb-4">404</div>
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 text-center">Page Not Found</h1>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/home"
        className="flex items-center gap-2 bg-[#4C4EE7] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3b3fd9] transition"
      >
        <FaArrowLeftLong className="h-5 w-5" />
        Go Back Home
      </a>
    </div>
  </div>
);

export default NotFound;