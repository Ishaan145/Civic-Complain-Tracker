import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layout
import Layout from './layout/layout.jsx';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import About from './pages/AboutUs.jsx'; // If your file is AboutUs.jsx, use this
import Blog from './pages/Blog.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ReportIssue from './pages/ReportIssue.jsx';
import IssueDetail from './pages/IssueDetail.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/blog',
          element: <Blog />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/report',
          element: <ReportIssue />,
        },
        {
          path: '/issue/:id',
          element: <IssueDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
