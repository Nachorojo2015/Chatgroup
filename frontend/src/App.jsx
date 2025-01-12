import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import UserPanel from './components/UserPanel'
import ResetPassword from './components/ResetPassword'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/reset' element={<ResetPassword />}></Route>
      <Route path='/' element={<UserPanel/>}></Route>
    </Routes>
  )
}

export default App
