import React from "react";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import Tile from "../../Components/AdminTile/AdminTile"; // Import the Tile component
import AdminList from "../../Components/AdminList/AdminList"; // Import the AdminList component
import { FaUser, FaChartBar, FaCog, FaFileAlt } from "react-icons/fa";

type Props = {};

const AdminDashboard = (props: Props) => {
  // Static data for AdminList
  const recentUsers = [
    { id: 1, name: "John Doe", email: "test@gmail.com" },
    { id: 2, name: "Jane Smith", email: "test@gmail.com" },
    { id: 3, name: "Sam Wilson", email: "test@gmail.com" },
  ];

  const recentComments = [
    { id: 1, name: "John Doe", description: "Great performance today!" },
    { id: 2, name: "Jane Smith", description: "Looking forward to Q4 results" },
    { id: 3, name: "Alex Johnson", description: "Stock is on fire!" },
  ];

  const mostUsedStocks = [
    { id: 1, name: "AAPL", description: "Apple Inc." },
    { id: 2, name: "MSFT", description: "Microsoft Corp." },
    { id: 3, name: "GOOGL", description: "Alphabet Inc." },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Dashboard Title */}
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        {/* Tiles Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Tile title="Total Users" value="120" icon={<FaUser />} />
          <Tile title="Total Comments" value="8" icon={<FaFileAlt />} />
          <Tile title="Total Stocks" value="5" icon={<FaCog />} />
          <Tile title="Most Used Stock" value="AAPL" icon={<FaChartBar />} />
        </div>

        {/* Admin Lists Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminList title="Recent Users" items={recentUsers} />
          <AdminList title="Recent Comments" items={recentComments} />
          <AdminList title="Most Used Stocks" items={mostUsedStocks} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
