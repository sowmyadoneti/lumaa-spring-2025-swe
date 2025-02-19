import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "../services/api";

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getTasks(token).then((res) => setTasks(res.data));
    }
  }, [token]);

  const handleAddTask = async () => {
    if (token) {
      await addTask(token, title, description);
      setTitle("");
      setDescription("");
      getTasks(token).then((res) => setTasks(res.data));
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (token) {
      await deleteTask(token, taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setIsComplete(task.isComplete);
  };

  const handleUpdateTask = async () => {
    if (token && editingTaskId !== null) {
      try {
        await updateTask(token, editingTaskId, title, description, isComplete);
        setTasks((prevTasks: Task[]) =>
          prevTasks.map((task) =>
            task.id === editingTaskId
              ? { ...task, title, description, isComplete }
              : task
          )
        );


        setEditingTaskId(null);
        setTitle("");
        setDescription("");
        setIsComplete(false);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <div>
      <h2>Tasks</h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isComplete}
          onChange={(e) => setIsComplete(e.target.checked)}
        />
        Completed
      </label>

      {editingTaskId ? (
        <button onClick={handleUpdateTask}>Update Task</button>
      ) : (
        <button onClick={handleAddTask}>Add Task</button>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description} - {task.isComplete ? "✅ Completed" : "❌ Not Completed"}
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
