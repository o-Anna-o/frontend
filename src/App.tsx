import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ShipsList from './pages/ShipsList'
import ShipPage from './pages/ShipPage'
import RequestShipPage from './pages/RequestShipPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShipsList/>} />
        <Route path='/ships' element={<ShipsList/>} />
        <Route path='/ship/:id' element={<ShipPage/>} />
        <Route path='/request_ship/:id' element={<RequestShipPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
