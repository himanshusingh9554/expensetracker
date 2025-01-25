import Home from './components/Home';
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import { Toaster } from '@/components/ui/sonner'
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
])

function App() {

  return (

    <div>
      <RouterProvider router={appRouter} />
      <Toaster />
    </div>
  )
}

export default App
