import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Note from "../components/NoteCard";
import { useNotes } from "../context/NotesContext";
import { Link } from "react-router-dom";
import { Search, Plus, FileText } from "lucide-react";

export default function Dashboard() {
  const { notes, loading } = useNotes();
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  // Apply search filter
  useEffect(() => {
    if (!search.trim()) {
      setFilteredNotes(notes);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(lowerSearch) ||
            note.content.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [search, notes]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <p className="text-lg font-semibold text-gray-700">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          {/* Header with Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Notes</h1>
              <p className="text-gray-600 mt-1">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} total
              </p>
            </div>
            <Link
              to="/add-note"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
            >
              <Plus className="w-5 h-5" />
              New Note
            </Link>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                placeholder="Search notes by title or content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-300
                           bg-white shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition"
              />
            </div>
          </div>

          {/* Notes Grid */}
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <Note key={note._id} {...note} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 mt-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-xl font-semibold text-gray-900 mb-2">
                {search ? "No matching notes found" : "No notes yet"}
              </p>
              <p className="text-gray-600 mb-6 text-center max-w-sm">
                {search 
                  ? "Try adjusting your search terms" 
                  : "Get started by creating your first note"}
              </p>
              {!search && (
                <Link
                  to="/add-note"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Note
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}