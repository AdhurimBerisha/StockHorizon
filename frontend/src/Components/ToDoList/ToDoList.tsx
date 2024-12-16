import React from "react";

const ToDoList = () => {
  const tasks = [
    { id: 1, title: "Review new user requests", completed: false },
    { id: 2, title: "Approve pending comments", completed: true },
    { id: 3, title: "Update stock data", completed: false },
    { id: 4, title: "Generate monthly report", completed: false },
    { id: 5, title: "Fix stock chart bug", completed: true },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">To-Do List</h3>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between border-b last:border-b-0 pb-2"
          >
            <div className="flex items-center space-x-3">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                readOnly
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
