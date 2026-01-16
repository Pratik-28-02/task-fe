import './App.css'
import TaskList from './pages/TaskList.jsx'
import CreateTaskList from './pages/CreateTaskList.jsx'
import TaskListDetails from './pages/TaskListDetails.jsx'
import AddTask from './pages/AddTask.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task-lists/new" element={<CreateTaskList />} />
          <Route path="/task-lists/:id" element={<TaskListDetails />} />
          <Route path="/task-lists/:id/tasks/new" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
      
  )
}

export default App
