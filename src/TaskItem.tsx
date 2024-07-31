import React from 'react';
import { Card, CardContent, Typography, IconButton, Grid, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Task from './types';
import EditIcon from '@mui/icons-material/Edit';

interface TaskItemProps {
  task: Task;
  editTask: (id: string, task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, editTask, deleteTask }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h5">{task.title}</Typography>
            <Typography variant="body2">{task.description}</Typography>
          </Box>
          <Box display="flex">
            <IconButton onClick={() => deleteTask(task.id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
