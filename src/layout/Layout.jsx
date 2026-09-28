import React from 'react'
import {Route, Routes} from "react-router" 
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import ForgetPassword from '../pages/ForgetPassword'
import WorkspaceSelect from '../pages/WorkspaceSelect'
function Layout() {

  return (
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path='/forget-password' element={<ForgetPassword />} />
        {/**Protected routes */}
        <Route path="/workspace" element={<WorkspaceSelect />} />
   </Routes>
  )
}

export default Layout