import React from 'react'
import {Route, Routes} from "react-router" 
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
function Layout() {

  return (
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
   </Routes>
  )
}

export default Layout