import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa"; // Import the FaTrash icon

// Define the type for a task
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const ToDoList = () => {
  // Initialize tasks state from LocalStorage or set to empty array if none
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // State for new task input
  const [newTask, setNewTask] = useState<string>("");

  // Update LocalStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Toggle task completion status
  const toggleCompletion = (taskId: number): void => {
    const updatedTasks = tasks.map((task: Task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Add new task to the list
  const addTask = (): void => {
    if (newTask.trim() === "") return;

    const newTaskObject: Task = {
      id: Date.now(), // Unique ID based on timestamp
      title: newTask,
      completed: false,
    };

    const updatedTasks = [...tasks, newTaskObject];
    setTasks(updatedTasks);
    setNewTask(""); // Clear the input field
  };

  // Delete a task from the list
  const deleteTask = (taskId: number): void => {
    const updatedTasks = tasks.filter((task: Task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">To-Do List</h3>

      {/* Input for adding new task */}
      <div className="mb-4 flex space-x-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.map((task: Task) => (
          <li
            key={task.id}
            className="flex items-center justify-between border-b last:border-b-0 pb-2"
          >
            <div className="flex items-center space-x-3">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id)} // Toggle task completion
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              {/* Task Title */}
              <span
                className={`${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {task.title}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              {/* Delete Button with FaTrash icon */}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash /> {/* Add the FaTrash icon */}
              </button>
            </div>
            {/* Status Indicator */}
            <span
              className={`text-sm font-semibold ${
                task.completed ? "text-green-500" : "text-red-500"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
