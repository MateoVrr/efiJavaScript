import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './layouts/Home'
import Registro from './layouts/Registro'
import Login from './layouts/Login'
import ReviewsList from './layouts/ReviewsList'
import PostsList from './layouts/PostsList'
import CrearReview from './layouts/CrearReview'
import EditarPost from './layouts/EditarPost'
import EditarReview from './layouts/EditarReview' 
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/registro' element={<Registro />} />
      <Route path='/login' element={<Login />} />

      <Route
        path='/posts'
        element={
          <ProtectedRoute>
            <PostsList />
          </ProtectedRoute>
        }
      />
      <Route
        path='/reviews'
        element={
          <ProtectedRoute>
            <ReviewsList />
          </ProtectedRoute>
        }
      />
      <Route
        path='/posts/:id/reviews/nueva'
        element={
          <ProtectedRoute>
            <CrearReview />
          </ProtectedRoute>
        }
      />
      <Route
        path='/editar-post/:id'
        element={
          <ProtectedRoute>
            <EditarPost />
          </ProtectedRoute>
        }
      />
     
      <Route
        path='/editar-review/:id'
        element={
          <ProtectedRoute>
            <EditarReview />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
