import { Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import DashboardLayout from './components/DashboardLayout';
import SignUp from './pages/SignUp';
import Logout from './pages/Logout';
import CourseForm from './components/CourseForm';
import Course from './components/Course';

const routes = (isLoggedIn) => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <SignIn />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'create-course', element: <CourseForm /> },
      { path: 'course', element: <Course /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <SignIn /> },
      { path: 'register', element: <SignUp /> },
      { path: 'logout', element: <Logout /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
