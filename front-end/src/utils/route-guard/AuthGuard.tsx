import { useNavigate } from 'react-router-dom';

// project imports
import { AUTH_LOCAL_STORAGE_KEY } from 'config';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'store';
import { setCurrentUser } from 'store/slices/user';
import { GuardProps } from 'types';
import { isEmpty } from 'lodash';
import { AxiosError } from 'axios';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
    const token = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const navigate = useNavigate();
    const { error } = useSelector((state) => state.userKecho);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!token) {
            navigate('login', { replace: true });
        } else {
            dispatch(setCurrentUser());
        }
    }, [token, navigate]);
    useEffect(() => {
        if (!isEmpty(error)) {
            if (error instanceof AxiosError && error.response?.status === 401) navigate('/login');
            if (error instanceof AxiosError && error.response?.status === 403) navigate('/pages/error-role');
            else navigate('/pages/error');
        }
    }, [error]);

    return children;
};

export default AuthGuard;
