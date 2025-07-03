import { Routes, Route } from 'react-router-dom'
import { io } from 'socket.io-client'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'
import InfoGroup from '../pages/InfoGroup'
import { BACKEND_URL } from '../config/variables'
import MainLayout from '../layout/HomeLayout'
import Chat from '../components/Chat'

const socket = io(BACKEND_URL, {
  withCredentials: true
})

const AppRoutes = () => {
    
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/reset' element={<ResetPassword />} />
      <Route path='/group/:id' element={<InfoGroup socket={socket} />} />

      <Route element={<MainLayout socket={socket} BACKEND_URL={BACKEND_URL}/>}>
        <Route path='/' element={<Chat socket={socket} BACKEND_URL={BACKEND_URL} />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes