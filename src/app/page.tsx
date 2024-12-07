"use client";

import React, { useState, useEffect, ChangeEvent } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");

//returns an empty array when no task is added  
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]") as string[];
    setTasks(savedTasks);
  }, []);

  //save the tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //add the task 
  const addTask = (): void => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  //delete the task if needed
  const removeTask = (index: number): void => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  //handle the input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTask(event.target.value);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-semibold  text-[30px] text-[#212121] opacity-75">
        WELCOME TO TASK SPARK
      </h1>
      <p className="text-[#5D80FF] font-semibold">TASKSPARK will helps you to stay organized and perform your task much faster
      </p>
      <div className="w-[500px] h-auto mt-6 bg-gradient-to-r from-[#99C3FC] to-[#6498E1] rounded-lg p-6">
        <h1 className="text-center text-white font-bold text-xl mb-4">To-Do List</h1>
        <div className="flex justify-center items-center mb-4">
          <label htmlFor="task-input" className="sr-only">
            Add a new task
          </label>
          <input
            id="task-input"
            type="text"
            value={newTask}
            onChange={handleInputChange}
            placeholder="Enter a new task"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
        <ul className="mt-4">
          {tasks.length === 0 ? (
            <li className="text-gray-500 text-center">No tasks available. Add a new task!</li>
          ) : (
            tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white p-2 rounded-md mb-2 text-[#5D80FF] font-semibold shadow-md"
              >
                {task}
                <button
                  onClick={() => removeTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
};

export default ToDoList;
