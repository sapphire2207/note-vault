import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FileText, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">NoteVault</span>
        </Link>

        {user && (
          <div className="flex items-center gap-3">
            
            {/* Profile Button */}
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 
                         transition border border-blue-200"
            >
              {user.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  alt="Avatar"
                  className="w-7 h-7 rounded-full object-cover border-2 border-blue-300"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                  {user.username?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <span className="text-sm font-semibold text-blue-700">Profile</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 
                         hover:bg-gray-100 transition border border-gray-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>

          </div>
        )}
      </div>
    </header>
  );
}