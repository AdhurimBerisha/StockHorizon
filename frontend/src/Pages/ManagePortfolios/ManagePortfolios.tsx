import React, { useState, useEffect } from "react";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import PortfolioTable from "../../Components/PortfolioTable/PortfolioTable";
import { FaWallet } from "react-icons/fa";
import axios from "axios";

type Stock = {
  id: number;
  symbol: string;
  companyName: string;
};

type UserPortfolio = {
  username: string;
  portfolio: Stock[];
};

const ManagePortfolios = () => {
  const [userPortfolios, setUserPortfolios] = useState<UserPortfolio[]>([]);

  useEffect(() => {
    const fetchUserPortfolios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5067/api/admin/portfolio"
        );

        const filteredPortfolios = response.data.filter(
          (user: UserPortfolio) => user.portfolio.length > 0
        );

        setUserPortfolios(filteredPortfolios);
      } catch (error) {
        console.error("Error fetching user portfolios", error);
      }
    };

    fetchUserPortfolios();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaWallet className="mr-3" />
          Manage Portfolios
        </h2>

        <PortfolioTable portfolios={userPortfolios} />
      </div>
    </div>
  );
};

export default ManagePortfolios;
