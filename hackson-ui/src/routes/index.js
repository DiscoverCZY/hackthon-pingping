import React, { lazy } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

// project imports
import Layout from 'views/layout';
import Loadable from 'components/Loadable';

// page routing
// const Home = Loadable(lazy(() => import('views/home')));
// const Dashboard = Loadable(lazy(() => import('views/dashboard')));
// const ChatBot = Loadable(lazy(() => import('views/chatBot')));
const Workflow = Loadable(lazy(() => import('views/workflows')));

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
  return useRoutes([
    {
      path: '',
      element: <Navigate replace to="home" />
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'home',
          // element: <Home />,
          element: <div>home</div>
        },
        /* {
          path: 'dashboard',
          element: <Dashboard />,
          children: [
            {
              path: 'test',
              element: <div>test</div>
            },
          ]
        }, */
        {
          path: 'data-visualization',
          // element: <ChatBot />,
        },
        {
          path: 'workflow',
          element: <Workflow />,
        },
        {
          path: '*',
          element: <Navigate replace to="home" />
        },
      ]
    }
  ]);
}
