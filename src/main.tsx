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
import dashboardLoader from './lib/utils/loaderutils/dashboardLoader.ts';
import DeploymentLoader from './lib/utils/loaderutils/deploymentsLoader.ts';
import LogsLoader from './lib/utils/loaderutils/logsLoader.ts';
import ErrorElement from './components/common/Error.tsx';

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
        element: <Dashboard/>,
        loader: dashboardLoader,
        errorElement: <ErrorElement/>
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
        loader: DeploymentLoader,
        errorElement: <ErrorElement/>
      },
      {
        path:"logs/:deploymentId",
        element: <Logs/>,
        loader: LogsLoader,
        errorElement: <ErrorElement/>
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
