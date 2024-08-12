import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SelectChangeEvent } from '@mui/material/Select';
import Task from '../types';

interface EditTaskFormProps {
  task: Task;
  open: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, open, onClose, onSave }) => {
  const [editedTask, setEditedTask] = useState<Task>(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<'high' | 'low' | 'medium'>) => {
    setEditedTask({ ...editedTask, priority: e.target.value as 'high' | 'low' | 'medium' });
  };

  const handleDateChange = (date: Date | null) => {
    setEditedTask({ ...editedTask, dueDate: date });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            multiline
            rows={4}
            value={editedTask.description}
            onChange={handleChange}
          />
          <DatePicker
            label="Due Date"
            value={editedTask.dueDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={editedTask.priority}
              onChange={handleSelectChange}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTaskForm;