import React from "react";
import Home from "../components/Home.jsx";
import CashRegister from "../components/CashRegister.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom"

export default function App() {
  const waiter = {name: 'Nikola'}
  return (
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path='/cash-register' element={<CashRegister waiter={waiter}/>}>

          </Route>

        </Routes>

      </BrowserRouter>
  )
}
