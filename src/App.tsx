import React from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskMenu from "./components/TaskMenu";

import {
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useTaskManager from "./components/useTaskManager";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
});

const TaskManager: React.FC = () => {
  const { tasks, addTask, editTask,setTasks, deleteTask } = useTaskManager();

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Typography variant="h2" align="center" color="primary" sx={{ mt: 3 }}>
          Task Manager
        </Typography>
        <Typography variant="h5" align="center" sx={{ mb: 4 }}>
          Organize your work and life
        </Typography>
        <Container maxWidth="md">
          <AddTaskForm addTask={addTask} />
          <TaskMenu tasks={tasks} editTask={editTask} deleteTask={deleteTask} setTasks={setTasks} />
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default TaskManager;