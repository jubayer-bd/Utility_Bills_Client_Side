import React from "react";
import { Link, useRouteError } from "react-router";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-6">
      <img
        src="https://i.pinimg.com/736x/a9/2b/d6/a92bd6faa099dd687222c9c33d44ff54.jpg"
        alt="404 Not Found"
        className="w-72 mb-6"
      />

      <h1 className="text-5xl font-bold text-primary mb-3">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mb-4">
        {error?.statusText ||
          "Sorry, the page you’re looking for doesn’t exist."}
      </p>

      <Link to="/" className="btn btn-primary flex items-center gap-2 mt-3">
        <FaHome /> Back to Home
      </Link>

      <p className="mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} Utility Bill Management System. All rights
        reserved.
      </p>
    </div>
  );
};

export default ErrorPage;
