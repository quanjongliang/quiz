// import { lazy } from 'react';
import { useEffect } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';

// routes
// import { useSelector } from 'store';
// import Loadable from 'components/Loadable';
// import checkRoleCurrentUser from 'utils/common/checkRoleCurrentUser';
import AuthenticationRoleRoutes from './AuthenicationRoleRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import TemplateRoutes from './TemplateRoutes';

// const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
// const PagesLanding = Loadable(lazy(() => import('views/template/pages/landing-kecho')));
// const AppCentreList = Loadable(lazy(() => import('views/main/center/CenterList')));
// ==============================|| ROUTING RENDER ||============================== //

const routesTemp = [AuthenticationRoutes, AuthenticationRoleRoutes, TemplateRoutes];
const routesProd = [LoginRoutes, MainRoutes];

export default function ThemeRoutes() {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location?.pathname === '/') {
            navigate('/centre/centre-list');
        }
    }, []);

    // const { currentUser } = useSelector((state) => state.user);
    const routes = [
        // { path: '/', element: <AppCentreList /> },
        ...routesProd, // ---------------------routes for product -----------------------
        ...routesTemp // ---------------------router for template -----------------------
    ];
    return useRoutes(routes);
}
