import React, {useEffect} from "react";
import Layout from "../components/Layout.jsx";
import Home from "../components/Home.jsx";
import CashRegister from "../components/CashRegister";
import Admin from "../components/Admin"
import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import { loader as homeLoader } from "../components/Home";
import {useCookies} from "react-cookie";
import Cookies from "js-cookie";

import {loader as cashRegisterLoader} from "../components/CashRegister";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route
          index
          element={<Home />}
          loader={homeLoader}
      />
      <Route
          path='cash-register'
          element={<CashRegister />}
          loader={cashRegisterLoader}
      />
      <Route path='admin'
             element={<Admin />}
      />
    </Route>
));


export default function App() {

    return (
        <RouterProvider router={router} />
    )
}
