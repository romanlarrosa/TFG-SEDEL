import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from 'pages/Login'
import Home from 'pages/Home'
import NavBar from 'components/NavBar'
import ControlPanel from 'pages/ControlPanel'

const App = () => {
  return (
    <div>
      <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<ControlPanel />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} /> */}
        </Routes>
    </div>
  )
}

export default App
