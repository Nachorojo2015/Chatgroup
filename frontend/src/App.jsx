import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import UserPanel from './components/UserPanel'
import ResetPassword from './components/ResetPassword'
import { io } from 'socket.io-client'
import InfoGroup from './components/InfoGroup'

const socket = io('http://localhost:3000', {
  withCredentials: true
})

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login socket={socket}/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/reset' element={<ResetPassword />}></Route>
      <Route path='/' element={<UserPanel socket={socket}/>}></Route>
      <Route path='/group/:id' element={<InfoGroup />}></Route>
    </Routes>
  )
}

export default App
