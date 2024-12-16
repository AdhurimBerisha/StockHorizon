import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

type User = {
  id: string;
  userName: string;
  email: string;
};

type UserTableProps = {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2 text-sm">{user.id}</td>
              <td className="px-4 py-2 text-sm">{user.userName}</td>
              <td className="px-4 py-2 text-sm">{user.email}</td>
              <td className="px-4 py-2 text-sm">
                <button
                  onClick={() => onEdit(user.id)}
                  className="text-blue-500 hover:text-blue-700 mr-3"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(user.id)}
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

export default UserTable;
