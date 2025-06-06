import { useContext, useState } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/Admincontext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes,Route} from 'react-router-dom'
import AddDoctors from './pages/admin/AddDoctors'
import AllAppointments from './pages/admin/AllAppointments'
import Dashboard from './pages/admin/Dashboard'
import DoctorsList from './pages/admin/DoctorsList'


function App() {
  const {aToken}=useContext(AdminContext);
  return aToken?(
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
            <Sidebar />
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/admin-dashboard' element={<Dashboard />} />
        <Route path='/add-doctor' element={<AddDoctors />} />
        <Route path='/all-appointments' element={<AllAppointments />} />
        <Route path='/doctor-list' element={<DoctorsList />} />
      </Routes>
      </div>
    </div> ):(
      <div>
      <Login />
      <ToastContainer />
      </div>
    )
  }
      
  

export default App;
