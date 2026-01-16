
const TaskListCard = (props) => {
  return (
      <div className="task-list">
         <h3>{props.title}</h3>
         <p>{props.tasks} tasks</p>
      </div>
  )
}

export default TaskListCard;