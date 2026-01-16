import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createTaskList } from "../api/taskListApi";

const CreateTaskList = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    console.log("TITLE VALUE:", title);

    if (!title.trim()) {
      alert("Title required");
      return;
    }

    try {
      await createTaskList({ title, description });
      navigate("/",{replace: true});
    } catch (error) {
      console.error("Failed to create task list", error);
      alert("Failed to create task list");
    }
  };

  return (
    <div className="page">
      <Link className="back-btn" to="/">← back</Link>

      <h3 className="title">Create Task List</h3>

      <div className="input-box">
        <label>Title</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task list title"
        />
      </div>

      <div className="input-box">
        <label>Description</label>
        <textarea
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task list description"
        />
      </div>

      <button className="create-btn" onClick={handleSubmit}>
        Create Task List
      </button>
    </div>
  );
};

export default CreateTaskList;
