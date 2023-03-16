import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../views/Login"
import RegisterPage from "../views/Register"
import HomePage from "../views/Home"
import DetailPage from "../views/Detail"

// Route definition
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    loader: ()=>{
      const guarder = localStorage.getItem('access_token')
      if (!guarder){
        return redirect('/login')
      }
      return null
    },
    children:[
      {
        path:'/',
        element: <HomePage />
      },
      {
        path:'/jobs/:id/',
        element: <DetailPage />
      },
    ]
  },
  {
    path:'/login',
    element: <LoginPage />,
    loader: ()=>{
      const guarder = localStorage.getItem('access_token')
      if (guarder){
        return redirect('/')
      }
      return null
    },
  }, 
  {
    path:'/register',
    element: <RegisterPage />,
    loader: ()=>{
      const guarder = localStorage.getItem('access_token')
      if (guarder){
        return redirect('/')
      }
      return null
    },
  }, 
])


export default router