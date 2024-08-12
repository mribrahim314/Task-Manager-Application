import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  ButtonGroup,
  Button,
  TextField
} from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import Task from "../types";

interface TaskMenuProps {
  tasks: Task[];
  editTask: (id: string, task: Task) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
}

const TaskMenu: React.FC<TaskMenuProps> = ({
  tasks,
  setTasks,
  editTask,
  deleteTask,
}) => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !task.completed) ||
        (filter === "completed" && task.completed);

      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, searchTerm]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTasks = Array.from(tasks);
    const [reorderedItem] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, reorderedItem);

    setTasks(newTasks);
  };

  return (
    <Paper sx={{ backgroundColor: "background.paper", py: 3, px: 7, mb: 5 }}>
      <Typography sx={{ pb: 3 }} variant="h4" component="h2">
        Tasks:
      </Typography>
      <TextField
        fullWidth
        label="Search tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"/>
      <ButtonGroup sx={{ mb: 2 }}>
        <Button onClick={() => setFilter("all")} variant={filter === "all" ? "contained" : "outlined"}>All</Button>
        <Button onClick={() => setFilter("active") } variant={filter === "active" ? "contained" : "outlined"}>Active</Button>
        <Button onClick={() => setFilter("completed")} variant={filter === "completed" ? "contained" : "outlined"}>Completed</Button>
      </ButtonGroup>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.map((task) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id}
                  index={tasks.indexOf(task)}
                >
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{ mb: 2 }}
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
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Paper>
  );
};

export default TaskMenu;
