import { lazy } from 'react';

// project imports
import MainLayout from 'core/layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// application - centre routing
const AppCentreList = Loadable(lazy(() => import('views/main/center/CenterList')));
const AppCentreOrderDetails = Loadable(lazy(() => import('views/main/center/CenterDetails')));

// application - class routing
const AppClassList = Loadable(lazy(() => import('views/main/class/ClassList')));
const AppClassDetails = Loadable(lazy(() => import('views/main/class/ClassDetails')));

// application - user routing
const AppUserList = Loadable(lazy(() => import('views/main/user/UserList')));
const AppUserDetails = Loadable(lazy(() => import('views/main/user/UserDetails')));

// application - staff routing
const AppStaffList = Loadable(lazy(() => import('views/main/staff/StaffList')));
const AppCalStaffRatioList = Loadable(lazy(() => import('views/main/staff/CalculationStaffRatio/List')));
// const AppCalStaffRatioDetail = Loadable(lazy(() => import('views/main/staff/CalculationStaffRatio/Detail')));
const AppStaffDetails = Loadable(lazy(() => import('views/main/staff/StaffDetails')));

// ==============================|| MAIN ROUTING ||============================== //

const routersProd = [
    {
        path: '/centre/centre-list',
        element: <AppCentreList />
    },
    {
        path: '/centre/centre-details/:id',
        element: <AppCentreOrderDetails />
    },

    {
        path: '/class/class-list',
        element: <AppClassList />
    },
    {
        path: '/class/class-details/:id',
        element: <AppClassDetails />
    },
    {
        path: '/user/user-list',
        element: <AppUserList />
    },
    {
        path: '/user/user-details/:id',
        element: <AppUserDetails />
    },
    {
        path: '/staff/staff-list',
        element: <AppStaffList />
    },
    {
        path: '/staff/staff-details/:id',
        element: <AppStaffDetails />
    },
    {
        path: '/staff/cal-staff-ratio',
        element: <AppCalStaffRatioList />
    }
    // {
    //     path: '/staff/cal-staff-ratio-detail',
    //     element: <AppCalStaffRatioDetail />
    // }
];

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [...routersProd]
};

export default MainRoutes;
