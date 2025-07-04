import React, { useState, useEffect } from "react";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import Tile from "../../Components/AdminTile/AdminTile";
import AdminList from "../../Components/AdminList/AdminList";
import ToDoList from "../../Components/ToDoList/ToDoList";
import { FaUser, FaFileAlt, FaBox, FaTasks } from "react-icons/fa";
import axios from "axios";

const AdminDashboard: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [stocksCount, setStocksCount] = useState<number>(0);
  const [usersWithMostStocks, setUsersWithMostStocks] = useState<
    { id: string; userName: string; portfolio: any[] }[]
  >([]);
  const [recentComments, setRecentComments] = useState<
    { id: number; title: string; content: string }[]
  >([]);
  const [mostUsedStocks, setMostUsedStocks] = useState<
    { id: number; symbol: string; companyName: string }[]
  >([]);
  const [taskCount, setTaskCount] = useState<number>(0);

  type User = {
    username: string;
    portfolio: any[];
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:5067/api/admin/users"
        );
        setUserCount(userResponse.data.length);

        const commentResponse = await axios.get(
          "http://localhost:5067/api/admin/comments"
        );
        setCommentCount(commentResponse.data.length);

        const portfolioResponse = await axios.get(
          "http://localhost:5067/api/admin/portfolio"
        );
        const portfolios = portfolioResponse.data;
        const totalStocks = portfolios.reduce(
          (acc: number, portfolio: any) => acc + portfolio.portfolio.length,
          0
        );
        setStocksCount(totalStocks);
      } catch (error) {
        console.error("Error fetching counts", error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchRecentData = async () => {
      try {
        const usersResponse = await axios.get(
          "http://localhost:5067/api/admin/portfolio/users-with-most-stocks"
        );

        const formattedUsers = usersResponse.data.map((user: User) => ({
          id: user.username,
          userName: user.username,
          portfolio: user.portfolio,
        }));
        setUsersWithMostStocks(formattedUsers);

        const commentsResponse = await axios.get(
          "http://localhost:5067/api/admin/comments"
        );
        const sortedComments = commentsResponse.data.sort((a: any, b: any) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setRecentComments(sortedComments.slice(0, 5));
      } catch (error) {
        console.error(
          "Error fetching users with most stocks and comments",
          error
        );
      }
    };

    fetchRecentData();
  }, []);

  useEffect(() => {
    const fetchMostUsedStocks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5067/api/admin/portfolio/most-used-stocks"
        );
        setMostUsedStocks(response.data);
      } catch (error) {
        console.error("Error fetching most used stocks", error);
      }
    };

    fetchMostUsedStocks();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Tile
            title="Total Users"
            value={userCount.toString()}
            icon={<FaUser />}
          />
          <Tile
            title="Total Comments"
            value={commentCount.toString()}
            icon={<FaFileAlt />}
          />
          <Tile
            title="Total Stocks in Portfolios"
            value={stocksCount.toString()}
            icon={<FaBox />}
          />
          <Tile
            title="Total To-Do's"
            value={taskCount.toString()}
            icon={<FaTasks />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <AdminList
            title="Users with Most Stocks"
            items={usersWithMostStocks}
          />
          <AdminList title="Most Used Stocks" items={mostUsedStocks} />
          <AdminList title="Recent Comments" items={recentComments} />
        </div>

        <div className="grid grid-cols-1">
          <ToDoList setTaskCount={setTaskCount} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
