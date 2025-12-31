import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
        
        {/* Spinner */}
        <div className="relative">
          <div className="h-14 w-14 rounded-full border-4 border-gray-300"></div>
          <div className="absolute top-0 left-0 h-14 w-14 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
        </div>

        {/* Text */}
        <p className="mt-6 text-gray-600 text-sm tracking-wide">
          Checking authentication...
        </p>

      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  return children;
}
