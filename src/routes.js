
import Login from "./view/auth/Login";
import Register from "./view/auth/Register";
import Dashboard from "./view/userDashboard/Dashboard";
import { Navigate } from 'react-router-dom'
const publicRoutes =
    [
        {
            path: '/',
            element: <Navigate to='/login' />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '*',
            element: <Navigate to='/login' />
        }
    ]


const privateRoutes = [
    {
        path: '/',
        element: <Navigate to='/dashboard' />
    },
    
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '*',
        element: <Navigate to='/dashboard' />
    }

]
export { publicRoutes, privateRoutes }
