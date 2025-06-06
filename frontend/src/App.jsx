import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Myprofile from './pages/Myprofile'
import MyAppointments from './pages/MyAppointments'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {

  return (
    <div className=' w-full '>
      <ToastContainer/>
    
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<Myprofile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='appointment/:docId' element={<Appointment />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
