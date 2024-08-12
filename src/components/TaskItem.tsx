import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Task from "../types";
import { format } from "date-fns";
import { useTheme } from "@mui/material/styles";
import EditTaskForm from "./EditTaskForm";

interface TaskItemProps {
  task: Task;
  editTask: (id: string, task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, editTask, deleteTask }) => {
  const theme = useTheme();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getTaskColor = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "low":
        return theme.palette.success.light;
      case "medium":
        return theme.palette.warning.light;
      case "high":
        return theme.palette.error.light;
      default:
        return theme.palette.grey[100];
    }
  };

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditSave = (updatedTask: Task) => {
    editTask(task.id, updatedTask);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ backgroundColor: getTaskColor(task.priority), mb: 2 }}
      >
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h5">{task.title}</Typography>
              <Typography variant="body2">{task.description}</Typography>
              <Typography variant="body2">
                Due:{" "}
                {task.dueDate
                  ? format(new Date(task.dueDate), "PP")
                  : "No due date"}
              </Typography>
              <Typography variant="body2">Priority: {task.priority}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={task.completed}
                onChange={() =>
                  editTask(task.id, { ...task, completed: !task.completed })
                }
              />
              <IconButton onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <EditTaskForm
        task={task}
        open={isEditDialogOpen}
        onClose={handleEditClose}
        onSave={handleEditSave}
      />
    </>
  );
};

export default TaskItem;
