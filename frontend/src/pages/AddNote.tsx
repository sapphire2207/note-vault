import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNotes } from "../context/NotesContext";
import { ArrowLeft, Save } from "lucide-react";

export default function AddNote() {
  const { addNote } = useNotes();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setLoading(true);
    const newNote = await addNote(title, content);
    setLoading(false);
    if (newNote) navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Dashboard</span>
          </button>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Note
            </h1>
            <p className="text-gray-600 mb-8">
              Add a title and content for your note
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition"
                  required
                />
              </div>

              {/* Content Textarea */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Content
                </label>
                <textarea
                  placeholder="Write your note content..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 resize-none
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition"
                  rows={12}
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 font-semibold text-gray-700 
                             hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold transition shadow-lg
                    ${loading 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/30"
                    }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Note
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}