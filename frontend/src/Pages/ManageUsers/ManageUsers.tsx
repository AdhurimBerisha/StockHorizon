import React, { useState, useEffect } from "react";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import UserTable from "../../Components/UsersTable/UsersTable";
import { FaUser } from "react-icons/fa";
import EditUser from "../../Components/EditUser/EditUser";
import axios from "axios";

type User = {
  id: string;
  userName: string;
  email: string;
  createdAt: string;
};

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5067/api/admin/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditUser = (id: string) => {
    setEditingUserId(id);
  };

  const handleCloseEditModal = () => {
    setEditingUserId(null);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5067/api/admin/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaUser className="mr-3" />
          Manage Users
        </h2>

        <UserTable
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />

        {editingUserId !== null && (
          <EditUser
            userId={editingUserId}
            onClose={handleCloseEditModal}
            onUserUpdated={() => {
              setEditingUserId(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
