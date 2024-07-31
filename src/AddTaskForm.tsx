import { Box, TextField, Button } from "@mui/material";
import Task from "./types";
import { v4 as uuidv4 } from 'uuid';

interface porps{
    newTaskTitle:string
    setNewTaskTitle:React.Dispatch<React.SetStateAction<string>>
    newTaskDescription:string
    setNewTaskDescription:React.Dispatch<React.SetStateAction<string>>
    tasks:Task[]
    setTasks:React.Dispatch<React.SetStateAction<Task[]>>

}





export default function addTaskForm({newTaskTitle,setNewTaskTitle,newTaskDescription,setNewTaskDescription,setTasks,tasks}:porps){
    const addTask = () => {
        if (newTaskTitle.trim() && newTaskDescription.trim()) {
          const newTask: Task = {
            id: uuidv4(),
            title: newTaskTitle,
            description: newTaskDescription,
          };
          setTasks([...tasks, newTask]);
          setNewTaskTitle('');
          setNewTaskDescription('');
        }
      };

    return(
        <Box mb={4}>
        <TextField
          fullWidth
          label="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Task Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={addTask}>
          Add Task
        </Button>
      </Box>
    )
}