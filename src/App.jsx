import './App.css'
import TaskList from './pages/TaskList'
import CreateTaskList from './pages/CreateTaskList'
import TaskListDetails from './pages/TaskListDetails'
import AddTask from './pages/AddTask'
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
