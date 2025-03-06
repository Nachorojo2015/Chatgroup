import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import UserPanel from './components/UserPanel'
import ResetPassword from './components/ResetPassword'
import { io } from 'socket.io-client'
import InfoGroup from './components/InfoGroup'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const socket = io(BACKEND_URL, {
  withCredentials: true
})

function App() {

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

export default App
