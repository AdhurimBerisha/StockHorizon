import React from "react";

type AdminListProps = {
  title: string;
  items: { id: number; name: string; description?: string; email?: string }[];
};

const AdminList = ({ title, items }: AdminListProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="border-b last:border-b-0 py-2">
            <p className="text-gray-800 font-semibold">{item.name}</p>
            {item.email ? (
              <p className="text-gray-600 text-sm">{item.email}</p>
            ) : (
              <p className="text-gray-600 text-sm">{item.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;
