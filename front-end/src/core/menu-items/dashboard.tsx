// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';
import { OverrideIcon } from 'types';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

interface DashboardMenuProps {
    id: string;
    title: React.ReactNode | string;
    type: string;
    children: {
        id: string;
        title: React.ReactNode | string;
        type: string;
        url: string;
        icon: OverrideIcon;
        breadcrumbs: boolean;
    }[];
}

const dashboard: DashboardMenuProps = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    type: 'group',
    children: [
        {
            id: 'default',
            title: <FormattedMessage id="default" />,
            type: 'item',
            url: '/temp/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'analytics',
            title: <FormattedMessage id="analytics" />,
            type: 'item',
            url: '/temp/dashboard/analytics',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'user-managerment',
            title: <FormattedMessage id="user-managerment" />,
            type: 'item',
            url: '/temp/dashboard/user-managerment',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
