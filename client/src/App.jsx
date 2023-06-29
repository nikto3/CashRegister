import React, {useEffect} from "react";
import Layout from "../components/Layout.jsx";
import Home from "../components/Home.jsx";
import CashRegister from "../components/CashRegister";
import Admin from "../components/Admin"
import NotFoundPage from "../components/NotFoundPage.jsx";
import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import { loader as homeLoader } from "../components/Home";

import {loader as cashRegisterLoader} from "../components/CashRegister";
import { loader as adminLoader } from "../components/Admin";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Lato, sans-serif'
}});



const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route
          index
          element={<Home />}
          loader={homeLoader}
          theme={theme}
      />
      <Route
          path='cash-register'
          element={<CashRegister />}
          loader={cashRegisterLoader}
      />
      <Route path='admin'
             element={<Admin />}
             loader={adminLoader}
      />
    <Route path="*"
           element={<NotFoundPage />}
     />
    </Route>
));


export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}
