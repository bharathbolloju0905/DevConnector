import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signin/Signup/Signup'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Lol from './pages/Home/Lol'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<ProtectedRoute><Home /> </ProtectedRoute>} />     
        <Route path="/lol" element={<ProtectedRoute><Lol/> </ProtectedRoute>} />     
        <Route path="*" element={<Signin />} />
      </Routes>
    </>
  )
}

export default App
