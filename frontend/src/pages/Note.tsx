import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNotes } from "../context/NotesContext";
import { formatDate } from "../utils/formatDate";
import { ArrowLeft, Edit3, Trash2, Save, X, Calendar, FileText } from "lucide-react";

export default function NotePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { notes, updateNote, deleteNote, loading } = useNotes();

  const [note, setNote] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  /* ----------------------------------
     Find note from all notes
  ---------------------------------- */
  useEffect(() => {
    if (!id || !notes.length) return;

    const foundNote = notes.find((n) => n._id === id);

    if (!foundNote) {
      navigate("/dashboard");
      return;
    }

    setNote(foundNote);
    setTitle(foundNote.title);
    setContent(foundNote.content);
  }, [id, notes, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <p className="text-lg font-semibold text-gray-700">Loading note...</p>
        </div>
      </div>
    );
  }

  if (!note) return null;

  /* ----------------------------------
     Handlers
  ---------------------------------- */
  const handleSave = async () => {
    if (!id) return;
    setSaving(true);
    const updated = await updateNote(id, title, content);
    setSaving(false);
    if (updated) {
      setNote(updated);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm("Delete this note permanently?");
    if (!confirmed) return;

    const success = await deleteNote(id);
    if (success) navigate("/dashboard");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Dashboard</span>
          </button>

          {/* Note Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">

            {/* Title */}
            {isEditing ? (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-3xl font-bold px-4 py-3 border border-gray-300 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ) : (
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{note.title}</h1>
            )}

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-8 pb-6 border-b border-gray-200">
              <Calendar className="w-4 h-4" />
              <span>Created {formatDate(note.createdAt)}</span>
            </div>

            {/* Content */}
            {isEditing ? (
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full border border-gray-300 rounded-lg p-4
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             resize-none"
                />
              </div>
            ) : (
              <div className="mb-8 text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {note.content}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition shadow-lg
                      ${saving
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30"
                      }`}
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setTitle(note.title);
                      setContent(note.content);
                      setIsEditing(false);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Note
                  </button>
                  <button
                    onClick={handleDelete}
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Note
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </main>
    </>
  );
}