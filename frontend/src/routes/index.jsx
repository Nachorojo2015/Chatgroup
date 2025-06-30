import { Routes, Route } from 'react-router-dom'
import { io } from 'socket.io-client'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'
import InfoGroup from '../pages/InfoGroup'
import Home from '../pages/Home'
import { BACKEND_URL } from '../config/variables'

const socket = io(BACKEND_URL, {
  withCredentials: true
})

const AppRoutes = () => {
    
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/reset' element={<ResetPassword />} />
      <Route path='/' element={<Home socket={socket} />} />
      <Route path='/group/:id' element={<InfoGroup socket={socket} />} />
    </Routes>
  )
}

export default AppRoutes