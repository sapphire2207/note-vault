import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesContextType {
  notes: Note[];
  loading: boolean;
  fetchNotes: (query?: string, page?: number, limit?: number) => Promise<void>;
  addNote: (title: string, content: string) => Promise<Note | null>;
  updateNote: (id: string, title: string, content: string) => Promise<Note | null>;
  deleteNote: (id: string) => Promise<boolean>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async (query = "", page = 1, limit = 12) => {
    try {
      setLoading(true);
      const res = await api.get("/dashboard", {
        params: { query, page, limit },
      });
      setNotes(res.data.data.docs || []);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (title: string, content: string) => {
    try {
      const res = await api.post("/notes", { title, content });
      setNotes((prev) => [res.data.data, ...prev]);
      return res.data.data;
    } catch {
      return null;
    }
  };

  const updateNote = async (id: string, title: string, content: string) => {
    try {
      const res = await api.patch(`/notes/note/${id}`, { title, content });
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? res.data.data : note))
      );
      return res.data.data;
    } catch {
      return null;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/note/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      return true;
    } catch {
      return false;
    }
  };

  // ✅ Only fetch notes when user is logged in
  useEffect(() => {
    if (authLoading) return;
    if (!user) return;
    fetchNotes();
  }, [user, authLoading]);

  return (
    <NotesContext.Provider
      value={{ notes, loading, fetchNotes, addNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within NotesProvider");
  }
  return context;
};
