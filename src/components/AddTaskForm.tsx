import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Task from "../types";
import { v4 as uuidv4 } from 'uuid';

interface AddTaskFormProps {
  addTask: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (title.trim() && description.trim()) {
      const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        priority,
        dueDate: dueDate || undefined,
        completed: false,
      };
      
      addTask(newTask);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate(null);
    }
  };

  return (
    <Box mb={4}>
      <TextField
        fullWidth
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>
      <DatePicker
        label="Due Date"
        value={dueDate}
        onChange={(newValue) => setDueDate(newValue)}
        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
        Add Task
      </Button>
    </Box>
  );
};

export default AddTaskForm;