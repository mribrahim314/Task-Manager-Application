import { useState, useEffect } from "react";
import Task from "../types";

export default function useTaskManager() {
    const [tasks, setTasks] = useState<Task[]>([]);
  
    useEffect(() => {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
  
    const addTask = (newTask: Task) => {
      setTasks([...tasks, newTask]);
    };
  
    const editTask = (id: string, updatedTask: Task) => {
      setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    };
  
    const deleteTask = (id: string) => {
      setTasks(tasks.filter(task => task.id !== id));
    };
  
    return { tasks, addTask, editTask,setTasks, deleteTask };
  }