import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./types";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import {
  Button,
  TextField,
  Box,
  Container,
  Card,
  Typography,
  colors,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import TaskMenu from "./TaskMenu";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography
          variant="h1"
          align="center"
          color={"primary"}
          sx={{ mt: 3 }}
        >
          Task Manager
        </Typography>
        <Typography variant="h5" align="center" sx={{ mb: 8 }}>
          Organize your work and life
        </Typography>
        <Container maxWidth="sm">
          <AddTaskForm
            newTaskTitle={newTaskTitle}
            setNewTaskTitle={setNewTaskTitle}
            newTaskDescription={newTaskDescription}
            setNewTaskDescription={setNewTaskDescription}
            tasks={tasks}
            setTasks={setTasks}
          />
          <TaskMenu tasks={tasks} setTasks={setTasks} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default TaskManager;
