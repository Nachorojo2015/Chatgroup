import { Routes, Route } from 'react-router-dom'
import { io } from 'socket.io-client'
import Login from '../components/Login'
import Register from '../components/Register'
import ResetPassword from '../components/ResetPassword'
import UserPanel from '../components/UserPanel'
import InfoGroup from '../components/InfoGroup'


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const socket = io(BACKEND_URL, {
  withCredentials: true
})

const AppRoutes = () => {
    
  return (
    <Routes>
      <Route path='/login' element={<Login BACKEND_URL={BACKEND_URL}/>}></Route>
      <Route path='/register' element={<Register BACKEND_URL={BACKEND_URL}/>}></Route>
      <Route path='/reset' element={<ResetPassword BACKEND_URL={BACKEND_URL}/>}></Route>
      <Route path='/' element={<UserPanel socket={socket} BACKEND_URL={BACKEND_URL}/>}></Route>
      <Route path='/group/:id' element={<InfoGroup socket={socket} BACKEND_URL={BACKEND_URL}/>}></Route>
    </Routes>
  )
}

export default AppRoutes