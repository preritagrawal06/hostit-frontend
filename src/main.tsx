import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Landing from './pages/Landing.tsx';
import Auth from './pages/Auth.tsx';
import PageNotFound from './components/common/PageNotFound.tsx';
import Dashboard from './pages/Dashboard.tsx';
import NewProject from './pages/NewProject.tsx';
import Deployments from './pages/Deployments.tsx';
import Logs from './pages/Logs.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Landing/>
      },
      {
        path: "login",
        element: <Auth/>
      },
      {
        path: "dashboard",
        element: <Dashboard/>
      },
      {
        path: "project",
        element: <NewProject/>,
        children: [
          {
            path: "new",
            element: <NewProject/>
          },
        ]
      },
      {
        path: "project/:projectId",
        element: <Deployments/>,
      },
      {
        path:"logs/:deploymentId",
        element: <Logs/>
      },
      {
        path: "*",
        element: <PageNotFound/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
