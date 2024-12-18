import React, { useState, useEffect } from "react";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import Tile from "../../Components/AdminTile/AdminTile"; // Import the Tile component
import AdminList from "../../Components/AdminList/AdminList"; // Import the AdminList component
import ToDoList from "../../Components/ToDoList/ToDoList"; // Import the ToDoList component
import { FaUser, FaFileAlt } from "react-icons/fa";
import axios from "axios";

type Props = {};

const AdminDashboard: React.FC<Props> = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [recentUsers, setRecentUsers] = useState<
    { id: number; name: string; email: string }[]
  >([]);
  const [recentComments, setRecentComments] = useState<
    { id: number; title: string; content: string }[]
  >([]);
  const [mostUsedStocks, setMostUsedStocks] = useState<
    { id: number; symbol: string; companyName: string }[]
  >([]);

  // Fetch data for total users and comments
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch total users count
        const userResponse = await axios.get(
          "http://localhost:5067/api/admin/users"
        );
        setUserCount(userResponse.data.length); // Assuming the data is an array of users

        // Fetch total comments count
        const commentResponse = await axios.get(
          "http://localhost:5067/api/admin/comments"
        );
        setCommentCount(commentResponse.data.length); // Assuming the data is an array of comments
      } catch (error) {
        console.error("Error fetching counts", error);
      }
    };

    fetchCounts();
  }, []);

  // Fetch all users and comments, then limit to 5 most recent
  useEffect(() => {
    const fetchRecentData = async () => {
      try {
        // Fetch all users
        const usersResponse = await axios.get(
          "http://localhost:5067/api/admin/users"
        );
        const sortedUsers = usersResponse.data.sort((a: any, b: any) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ); // Sort by creation date
        });
        setRecentUsers(sortedUsers.slice(0, 5)); // Get the first 5 recent users

        // Fetch all comments
        const commentsResponse = await axios.get(
          "http://localhost:5067/api/admin/comments"
        );
        const sortedComments = commentsResponse.data.sort((a: any, b: any) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ); // Sort by creation date
        });
        setRecentComments(sortedComments.slice(0, 5)); // Get the first 5 recent comments
      } catch (error) {
        console.error("Error fetching recent users and comments", error);
      }
    };

    fetchRecentData();
  }, []);

  // Fetch most used stocks
  useEffect(() => {
    const fetchMostUsedStocks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5067/api/admin/portfolio/most-used-stocks"
        );
        setMostUsedStocks(response.data); // Set most used stocks data
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

        {/* Tiles Section */}
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
        </div>

        {/* Lists Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Display Recent Users */}
          <AdminList title="Recent Users" items={recentUsers} />
          {/* Display Recent Comments */}
          <AdminList title="Recent Comments" items={recentComments} />
          {/* Display Most Used Stocks */}
          <AdminList title="Most Used Stocks" items={mostUsedStocks} />
        </div>

        {/* To-Do List Section */}
        <div className="grid grid-cols-1">
          <ToDoList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
