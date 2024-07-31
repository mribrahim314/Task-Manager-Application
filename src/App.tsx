import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import  Task  from './types';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm'
import { Button, TextField, Box, Container, Card, Typography } from '@mui/material';



const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);



  const editTask = (id: string, updatedTask: Task) => {
    setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <>
    <Typography variant='h1' align='center' sx={{mt:3}}>Task Manager</Typography>
    <Typography variant='h5' align='center' 
    sx={{mb:8}}>Organize your work and life</Typography>
    <Container maxWidth="sm">
      
      <AddTaskForm newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle}  newTaskDescription={newTaskDescription} setNewTaskDescription={setNewTaskDescription} tasks={tasks} setTasks={setTasks} />
      <Card  sx={{padding:3}}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}  >
                  {(provided) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        mb={2}
                      >
                        <TaskItem
                          task={task}
                          editTask={editTask}
                          deleteTask={deleteTask}
                        />
                      </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </Card>
    </Container>
    </>
  );
};

export default TaskManager;
