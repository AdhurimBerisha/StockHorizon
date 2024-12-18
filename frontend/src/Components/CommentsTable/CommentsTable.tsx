import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

type Comment = {
  id: number;
  title: string;
  content: string;
  createdBy: string;
};

type Props = {
  comments: Comment[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const CommentTable: React.FC<Props> = ({ comments, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Title
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Content
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Created By
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2 text-sm">{comment.title}</td>
              <td className="px-4 py-2 text-sm">{comment.content}</td>
              <td className="px-4 py-2 text-sm">{comment.createdBy}</td>
              <td className="px-4 py-2 text-sm">
                <button
                  onClick={() => onEdit(comment.id)}
                  className="text-blue-500 hover:text-blue-700 mr-3"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(comment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentTable;
