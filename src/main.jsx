
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


import { createBrowserRouter ,RouterProvider } from 'react-router-dom';


import Home from "./home/home"
import ErrorPage from './components/index';
import Login from "./home/pages/Access/index"
import Cadastro from "./home/pages/Register/index"


const router =createBrowserRouter([
  {
    path:"/",
    element: <Home/>,
    errorElement: <ErrorPage/>,
  },
    
    {
      path:"/login do usuario",
      element: <Login/>
    },
    {
      path: "/cadastro",
      element: <Cadastro/>
  }
]);

ReactDOM.createRoot (document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
