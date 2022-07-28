// types
import { ConfigProps } from 'types/template/config';

export enum Order {
    ASC = 'ASC',
    DESC = 'DESC'
}

export const DEFAULT_PAGINATION = {
    order: Order.ASC,
    page: 1,
    take: 10,
    sortColumn: '',
    query: ''
};

export const timeOfDay = [
    { title: '6H', value: '6H' },
    { title: '7H', value: '6H' },
    { title: '8H', value: '6H' },
    { title: '9H', value: '6H' },
    { title: '10H', value: '10H' },
    { title: '11H', value: '11H' },
    { title: '12H', value: '12H' },
    { title: '13H', value: '13H' },
    { title: '14H', value: '14H' },
    { title: '15H', value: '15H' },
    { title: '16H', value: '16H' },
    { title: '17H', value: '17H' },
    { title: '18H', value: '18H' }
];

export const AUTH_LOCAL_STORAGE_KEY = {
    ACCESS_TOKEN: 'token',
    REFRESH_TOKEN: 'refreshToken'
};

export const JWT_API = {
    secret: 'SECRET-KEY',
    timeout: '1 days'
};

export const FIREBASE_API = {
    apiKey: 'AIzaSyBernKzdSojh_vWXBHt0aRhf5SC9VLChbM',
    authDomain: 'berry-material-react.firebaseapp.com',
    projectId: 'berry-material-react',
    storageBucket: 'berry-material-react.appspot.com',
    messagingSenderId: '901111229354',
    appId: '1:901111229354:web:a5ae5aa95486297d69d9d3',
    measurementId: 'G-MGJHSL8XW3'
};

export const AUTH0_API = {
    client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
    domain: 'dev-w0-vxep3.us.auth0.com'
};

export const AWS_API = {
    poolId: 'us-east-1_AOfOTXLvD',
    appClientId: '3eau2osduslvb7vks3vsh9t7b0'
};

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = '';

export const DASHBOARD_PATH = '/dashboard/default';

export const CENTRE_LIST_PATH = '/centre/centre-list';

export const defaultSuccessAlert = (message: string) => ({ open: true, message, variant: 'alert', alert: { color: 'primary' } });
export const defaultErrorAlert = (message: string) => ({ open: true, message, variant: 'alert', alert: { color: 'error' } });

const config: ConfigProps = {
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

export default config;
