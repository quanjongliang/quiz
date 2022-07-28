// import { lazy } from 'react';

// project imports
import MainLayout from 'core/layout/MainLayout';
// import Loadable from 'components/Loadable';
import AuthRoleGuard from 'utils/route-guard/AuthRoleGuard';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoleRoutes = {
    path: '/',
    element: (
        <AuthRoleGuard>
            <MainLayout />
        </AuthRoleGuard>
    ),
    children: []
};

export default AuthenticationRoleRoutes;
