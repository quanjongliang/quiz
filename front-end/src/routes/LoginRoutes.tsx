import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'core/layout/MinimalLayout';
import NavMotion from 'core/layout/NavMotion';
import Loadable from 'components/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/template/pages/authentication/authentication-kecho/LoginKecho')));
// const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
// const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthRegister = Loadable(lazy(() => import('views/template/pages/authentication/authentication-kecho/RegisterKecho')));
const AuthForgotPassword = Loadable(lazy(() => import('views/template/pages/authentication/authentication3/ForgotPassword3')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/register',
            element: <AuthRegister />
        },
        {
            path: '/forgot',
            element: <AuthForgotPassword />
        }
    ]
};

export default LoginRoutes;
