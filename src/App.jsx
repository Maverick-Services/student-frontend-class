import './App.css'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { Profile } from './components/core/dashboard/Profile'
import Navbar from './components/Navbar'
import MyTasks from './components/core/dashboard/MyTasks'
import Members from './components/core/dashboard/Members'
import { AddTaskDetails } from './components/core/dashboard/AddTask/AddTaskDetails'
import { EditTaskDetails } from './components/core/dashboard/AddTask/EditTskDetails'
import { Login } from './pages/Login'
import OpenRoute from './components/core/auth/OpenRoute'
import PrivateRoute from './components/core/auth/PrivateRoute'

function App() {
  return (
    <div id='wrapper' className='bg-gray-200'>
      <Routes>
        <Route path='/' element={
          <OpenRoute>
            <Login/>
          </OpenRoute>} 
        />

        <Route
          path='/dashboard'
          element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
        >
          <Route path='/dashboard/profile' element={<Profile/>}/>
          <Route path='/dashboard/tasks' element={<MyTasks/>}/>
          <Route path='/dashboard/create-task' element={<AddTaskDetails/>}/>
          <Route path='/dashboard/tasks/:taskId' element={<EditTaskDetails/>}/>
          <Route path='/dashboard/members' element={<Members/>}/>
          <Route path='/dashboard/members/:memberId' element={<></>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
