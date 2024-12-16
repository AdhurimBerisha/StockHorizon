import React from "react";

// Define the props type
type TileProps = {
  title: string;
  value: string;
  icon: React.ReactNode; // Define icon as a React element
};

const AdminTile: React.FC<TileProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
      <div className="text-blue-500 text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xl font-bold text-gray-800">{value}</p>{" "}
      </div>
    </div>
  );
};

export default AdminTile;
