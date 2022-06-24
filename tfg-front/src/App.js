import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from 'pages/Login'
import Home from 'pages/Home'
import NavBar from 'components/NavBar'
import Register from 'pages/Register'
import VotingForm from 'pages/VotingForm'
import EditVoting from 'pages/EditVoting'
import ElectorVote from 'pages/ElectorVote';

const App = () => {
  return (
    <div>
      <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/votings/new" element={<VotingForm />} />
          <Route path="/votings/edit/:id" element={<EditVoting />} />
          <Route path="/vote/:id" element={<ElectorVote />} />
        </Routes>
    </div>
  )
}

export default App
