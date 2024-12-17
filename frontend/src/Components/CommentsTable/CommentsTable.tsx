import React from "react";

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
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Content</th>
            <th className="px-4 py-2 border">Created By</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td className="px-4 py-2 border">{comment.title}</td>
              <td className="px-4 py-2 border">{comment.content}</td>
              <td className="px-4 py-2 border">{comment.createdBy}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => onEdit(comment.id)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(comment.id)}
                  className="text-red-500 ml-4"
                >
                  Delete
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
