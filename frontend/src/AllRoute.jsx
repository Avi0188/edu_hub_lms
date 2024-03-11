import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Signup from './pages/Signup/Singup'


const AllRoute = () => {
  return (
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path="/signup"  element={<Signup  />} />

    
   </Routes>
  )
}

export default AllRoute
