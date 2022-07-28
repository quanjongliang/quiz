import { useNavigate } from 'react-router-dom';

// project imports
import { AUTH_LOCAL_STORAGE_KEY } from 'config';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'store';
import { setCurrentUser } from 'store/slices/user';
import { GuardProps } from 'types';
// import checkRoleCurrentUser from 'utils/common/checkRoleCurrentUser';
import { isEmpty } from 'lodash';
import { AxiosError } from 'axios';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthRoleGuard = ({ children }: GuardProps) => {
    const token = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, error } = useSelector((state) => state.userKecho);
    useEffect(() => {
        if (!token) {
            navigate('login', { replace: true });
        } else {
            dispatch(setCurrentUser());
        }
    }, [token, navigate, dispatch]);
    useEffect(() => {
        if (!isEmpty(error) && error instanceof AxiosError) {
            if (error.response?.status === 403) navigate('/pages/error-role');
            else navigate('/pages/error');
        }
        // if (!checkRoleCurrentUser(currentUser?.role?.roleName) || !isEmpty(error)) navigate('/pages/error');
    }, [currentUser, error]);
    return children;
};

export default AuthRoleGuard;
