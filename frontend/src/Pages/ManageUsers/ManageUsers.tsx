import React, { useState, useEffect } from "react";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import UserTable from "../../Components/UsersTable/UsersTable";
import { FaUser, FaPlus } from "react-icons/fa";
import axios from "axios";
import RegisterUser from "../../Components/RegisterUser/RegisterUser";
import EditUser from "../../Components/EditUser/EditUser";

type User = {
  id: string;
  userName: string;
  email: string;
  createdAt: string;
};

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

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

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleUserCreated = async () => {
    setShowRegisterModal(false);
    try {
      const response = await axios.get("http://localhost:5067/api/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error refetching users", error);
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

        <button
          onClick={() => setShowRegisterModal(true)}
          className="mb-4 bg-green-500 text-white py-2 px-4 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" />
          Register User
        </button>

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

        {showRegisterModal && (
          <RegisterUser
            onClose={handleCloseRegisterModal}
            onUserCreated={handleUserCreated}
          />
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
