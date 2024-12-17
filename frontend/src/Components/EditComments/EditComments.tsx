import React, { useState, useEffect } from "react";
import axios from "axios";

type Props = {
  commentId: number;
  onClose: () => void;
  onCommentUpdated: () => void;
};

const EditComment: React.FC<Props> = ({
  commentId,
  onClose,
  onCommentUpdated,
}) => {
  const [comment, setComment] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5067/api/admin/comments/${commentId}`
        );
        setComment({
          title: response.data.title,
          content: response.data.content,
        });
      } catch (error) {
        console.error("Error fetching comment", error);
      }
    };
    fetchComment();
  }, [commentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5067/api/admin/comments/${commentId}`,
        comment
      );
      onCommentUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating comment", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Comment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={comment.title}
              onChange={(e) =>
                setComment({ ...comment, title: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              value={comment.content}
              onChange={(e) =>
                setComment({ ...comment, content: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditComment;
