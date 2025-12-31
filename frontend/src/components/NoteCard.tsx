import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { Calendar, FileText } from "lucide-react";

interface NoteCardProps {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NoteCard({
  _id,
  title,
  content,
  createdAt,
}: NoteCardProps) {
  return (
    <Link
      to={`/note/${_id}`}
      className="block bg-white p-6 rounded-xl border border-gray-200
                 hover:shadow-lg hover:border-blue-300 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 group"
    >
      {/* Header with Icon */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition line-clamp-2 flex-1">
          {title}
        </h3>
        <div className="ml-2 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition">
          <FileText className="w-4 h-4 text-blue-600" />
        </div>
      </div>

      {/* Content Preview */}
      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
        {content}
      </p>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
        <Calendar className="w-3.5 h-3.5" />
        <span>{formatDate(createdAt)}</span>
      </div>
    </Link>
  );
}