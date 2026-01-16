import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createTask } from "../api/taskApi";

const AddTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const handleCreate = async () => {
    if (!title.trim()) {
      alert("Title required");
      return;
    }

    try {
      // Convert date to ISO format (YYYY-MM-DDTHH:mm:ss)
      let dueDateFormatted = null;
      if (dueDate) {
        dueDateFormatted = `${dueDate}T00:00:00`;
      }

      const taskData = {
        title,
        description,
        dueDate: dueDateFormatted,
        taskPriority: priority,
        taskStatus: "OPEN"
      };
      
      console.log("Sending task data:", taskData);
      
      await createTask(id, taskData);

      // go back to task list details
      navigate(`/task-lists/${id}`, { replace: true });
    } catch (error) {
      console.error("Create task failed", error);
      alert("Failed to create task");
    }
  };

  return (
    <div className="page">
      <Link className="back-btn" to={`/task-lists/${id}`}>← back</Link>

      <h1 className="title">Create Task</h1>

      <div className="input-box">
        <label>Title</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
      </div>

      <div className="input-box">
        <label>Description</label>
        <textarea
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
      </div>

      <div className="input-box">
        <label>Due Date</label>
        <input
          type="date"
          className="input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="input-box">
        <label>Priority</label>
        <select
          className="input"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <button className="create-btn" onClick={handleCreate}>
        Create Task
      </button>
    </div>
  );
};

export default AddTask;