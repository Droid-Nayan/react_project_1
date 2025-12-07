import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold">MyStore</Link>

        <div className="flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>

          {user ? (
            <>
              <span>{user.displayName || user.email}</span>
              <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-1 bg-blue-600 text-white rounded">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
