import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Customers from './components/Customers.jsx'
import Trainings from './components/Trainings.jsx'
import { createBrowserRouter, RouterProvider } from "react-router"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "customers",
        element: <Customers />
      },
      {
        path: "trainings",
        element: <Trainings />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
