import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from 'pages/Login'
import Home from 'pages/Home'
import NavBar from 'components/NavBar'
import Register from 'pages/Register'
import VotingForm from 'pages/VotingForm'
import EditVoting from 'pages/EditVoting'
import ElectorVote from 'pages/ElectorVote'
import ConfirmVoting from 'pages/ConfirmVoting';
import SuccessfullVoting from 'pages/SuccessfullVoting';
import ViewVoting from 'pages/ViewVoting';
import VerifyVote from 'pages/VerifyVote';
const createHost = require('cross-domain-storage/host')
// eslint-disable-next-line no-unused-vars
const storageHost = createHost([
  {
    origin: process.env.REACT_APP_CA_HOST,
    allowedMethods: ['get', 'set', 'remove']
  },
  {
    origin: "http://localhost:5500",
    allowedMethods: ['get', 'set', 'remove']
  }
])

const App = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/votings/new' element={<VotingForm />} />
        <Route path='/votings/edit/:id' element={<EditVoting />} />
        <Route path='/vote/:id' element={<ElectorVote />} />
        <Route path='/confirmVoting' element={<ConfirmVoting />} />
        <Route path='/successfullVoting' element={<SuccessfullVoting />} />
        <Route path='/votings/view/:id' element={<ViewVoting />} />
        <Route path='/vote/verify/:id' element={<VerifyVote />} />
      </Routes>
    </div>
  )
}

export default App
