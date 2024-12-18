import React from "react";

type Stock = {
  id: number;
  symbol: string;
  companyName: string;
};

type UserPortfolio = {
  username: string;
  portfolio: Stock[];
};

type Props = {
  portfolios: UserPortfolio[];
};

const PortfolioTable: React.FC<Props> = ({ portfolios }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Username
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Stocks in Portfolio
            </th>
          </tr>
        </thead>
        <tbody>
          {portfolios.map((userPortfolio) => (
            <tr
              key={userPortfolio.username}
              className="border-b hover:bg-gray-100"
            >
              <td className="px-4 py-2 text-sm">{userPortfolio.username}</td>
              <td className="px-4 py-2 text-sm">
                {userPortfolio.portfolio.map((stock, index) => (
                  <div key={stock.id}>
                    {stock.symbol} - {stock.companyName}
                    {index < userPortfolio.portfolio.length - 1 && ", "}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;
