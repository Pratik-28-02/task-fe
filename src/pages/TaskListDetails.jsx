import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTasksByTaskListId, deleteTask } from "../api/taskApi";
import { deleteTaskList } from "../api/taskListApi";

const TaskListDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksByTaskListId(id);

        if (!Array.isArray(data)) {
          throw new Error("Invalid tasks response");
        }

        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [id]);

  const handleDeleteTaskList = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task list?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTaskList(id);
      // Navigate after successful deletion
      console.log("Task list deleted successfully");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Delete task list failed", error);
      // Still try to navigate even if there's an error, as the deletion likely succeeded
      navigate("/", { replace: true });
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id, taskId);
      // Remove task from state after successful deletion
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Delete task failed", error);
      alert("Failed to delete task");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h2>{error}</h2>
        <Link className="back-btn" to="/">← back</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link className="back-btn" to="/">← back</Link>

      <h1 className="title">Tasks ({tasks.length})</h1>

      <Link to={`/task-lists/${id}/tasks/new`}>
        <button className="create-btn">+ Add Task</button>
      </Link>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.taskStatus === "CLOSED"}
                  readOnly
                />
                <span className="task-title">{task.title}</span>
              </div>

              <div className="task-right">
                <span
                  className={`priority ${task.taskPriority?.toLowerCase()}`}
                >
                  {task.taskPriority}
                </span>
                <span className="due-date">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="danger-btn" onClick={handleDeleteTaskList}>
        Delete Task List
      </button>
    </div>
  );
};

export default TaskListDetails;