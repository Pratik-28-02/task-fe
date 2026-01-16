import TaskListCard from "../components/TaskListCard";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { getTaskLists } from "../api/taskListApi";
const TaskList = () => {

  const [taskLists,setTaskLists] = useState([]); 
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskLists = async() =>{
      try{
        const data = await getTaskLists();
        setTaskLists(data);
      }catch(error){
        console.error("Failed to fetch task lists",error);
      }finally{
        setLoading(false);
      }
    };
    fetchTaskLists();

  },[]);

  if(loading){
    return (
      <div className="page">
        <h2>Loading....</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="title">My Task List</h1>
      <Link to="task-lists/new">
        <button className="create-btn">+ Create new Task List</button>
      </Link>
      
      {taskLists.map(task => (
          <Link
            key={task.id}
            to={`/task-lists/${task.id}`}
            className="task-link"
          >
          <TaskListCard 
            title={task.title} 
            tasks={task.count}
          />
          </Link>
      ))}

    </div>
  )
}

export default TaskList