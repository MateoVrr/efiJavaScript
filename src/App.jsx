import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './layouts/Home'
import Registro from './layouts/Registro'
import Login from './layouts/Login'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/registro' element={<Registro/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App