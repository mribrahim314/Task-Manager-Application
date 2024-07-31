import { Card, Box } from "@mui/material"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import TaskItem from "./TaskItem"
import Task from "./types";

interface props{
    tasks:Task[]
    setTasks:React.Dispatch<React.SetStateAction<Task[]>>
}



const TaskMenu: React.FC<props> = ({tasks,setTasks}) =>{


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


        return(<Card  sx={{padding:3}}>
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
      </Card>)
}
export default TaskMenu;