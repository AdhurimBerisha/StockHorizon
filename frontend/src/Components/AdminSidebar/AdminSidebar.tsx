import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {};

const AdminSidebar = (props: Props) => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-xl font-bold">StockHorizon</h2>
      </div>
      <ul className="space-y-2">
        <li>
          <Link
            to="/dashboard"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/manage-users"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Manage Users
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/manage-comments"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Manage Comments
          </Link>
        </li>
        <li>
          <Link
            to="/admin/reports"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Portfolios
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
