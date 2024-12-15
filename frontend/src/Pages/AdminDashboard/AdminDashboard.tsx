import React from "react";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import Tile from "../../Components/AdminTile/AdminTile"; // Import the Tile component
import { FaUser, FaChartBar, FaCog, FaFileAlt } from "react-icons/fa";

type Props = {};

const AdminDashboard = (props: Props) => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6">
        {/* Dashboard Title */}
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        {/* Tiles Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Tile title="Total Users" value="120" icon={<FaUser />} />
          <Tile title="Total Comments" value="8" icon={<FaFileAlt />} />
          <Tile title="Total Stocks" value="5" icon={<FaCog />} />
          <Tile title="Sales Growth" value="15%" icon={<FaChartBar />} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
