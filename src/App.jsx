import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './layouts/Home'
import Registro from './layouts/Registro'
import Login from './layouts/Login'
import ReviewsList from './layouts/ReviewsList'
import PostsList from './layouts/PostsList'
import CrearReview from './layouts/CrearReview'
import EditarPost from "./layouts/EditarPost"

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/registro' element={<Registro/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/posts' element={<PostsList/>}/>
        <Route path='/reviews' element={<ReviewsList/>}/>
        <Route path='/posts/:id/reviews/nueva' element={<CrearReview/>}/>
        <Route path="/editar-post/:id" element={<EditarPost />} />

      </Routes>
    </>
  )
}

export default App
