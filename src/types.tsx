interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date|null;
  completed: boolean;
  // order?: number;
}

export default Task;