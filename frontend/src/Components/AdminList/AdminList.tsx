import React from "react";

type AdminListProps = {
  title: string;
  items: {
    id: number;
    userName?: string;
    email?: string;
    createdBy?: string;
    content?: string;
    symbol?: string;
    companyName?: string;
  }[];
};

const AdminList = ({ title, items }: AdminListProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="border-b last:border-b-0 py-2">
            {/* For Recent Users: Display email and username */}
            {item.email && item.userName ? (
              <>
                <p className="text-gray-800 font-semibold">{item.email}</p>
                <p className="text-gray-600 text-sm">{item.userName}</p>
              </>
            ) : null}

            {/* For Recent Comments: Display content and createdBy */}
            {item.content ? (
              <p className="text-gray-800 text-sm mt-2 font-semibold">
                {item.content}
              </p>
            ) : null}
            {item.createdBy && item.content && (
              <p className="text-gray-500 text-xs mt-2">
                Posted by: {item.createdBy}
              </p>
            )}

            {/* For Most Used Stocks: Display symbol first, then companyName */}
            {item.symbol && item.companyName && (
              <>
                <p className="text-gray-800 font-semibold">{item.symbol}</p>
                <p className="text-gray-600 text-sm">{item.companyName}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;
