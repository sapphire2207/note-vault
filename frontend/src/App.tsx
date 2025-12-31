import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotesProvider } from "./context/NotesContext";
import ProtectedRoute from "./components/ShowProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotePage from "./pages/Note";
import AddNote from "./pages/AddNote";

export default function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
              />

            <Route
              path="/note/:id"
              element={
                <ProtectedRoute>
                  <NotePage />
                </ProtectedRoute>
              }
              />
            <Route
              path="/add-note"
              element={
                <ProtectedRoute>
                  <AddNote />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
              />
          </Routes>
        </BrowserRouter>
      </NotesProvider>
    </AuthProvider>
  );
}
