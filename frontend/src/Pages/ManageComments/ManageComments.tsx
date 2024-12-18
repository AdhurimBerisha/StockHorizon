import React, { useState, useEffect } from "react";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import CommentTable from "../../Components/CommentsTable/CommentsTable";
import { FaComment } from "react-icons/fa";
import EditComment from "../../Components/EditComments/EditComments";
import axios from "axios";

type Comment = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
};

const ManageComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5067/api/admin/comments"
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
  }, []);

  const handleEditComment = (id: number) => {
    setEditingCommentId(id);
  };

  const handleCloseEditModal = () => {
    setEditingCommentId(null);
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5067/api/admin/comments/${id}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaComment className="mr-3" />
          Manage Comments
        </h2>

        <CommentTable
          comments={comments}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
        />

        {editingCommentId !== null && (
          <EditComment
            commentId={editingCommentId}
            onClose={handleCloseEditModal}
            onCommentUpdated={() => {
              setEditingCommentId(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ManageComments;
