// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconUserCheck, IconBasket, IconMessages, IconLayoutKanban, IconMail, IconCalendar, IconNfc } from '@tabler/icons';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupsIcon from '@mui/icons-material/Groups';
// import menuTemp from './menuTemp';
// constant
const icons = {
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc,
    BusinessCenterIcon,
    ClassIcon,
    AssignmentIndIcon,
    GroupsIcon
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const menuProd = [
    {
        id: 'centre',
        title: <FormattedMessage id="centre" />,
        type: 'collapse',
        icon: icons.BusinessCenterIcon,
        children: [
            {
                id: 'centre-list',
                title: <FormattedMessage id="centre-list" />,
                type: 'item',
                url: '/centre/centre-list',
                breadcrumbs: false
            }
        ]
    },
    {
        id: 'user',
        title: <FormattedMessage id="user" />,
        type: 'collapse',
        icon: icons.AssignmentIndIcon,
        children: [
            {
                id: 'user-list',
                title: <FormattedMessage id="user-list" />,
                type: 'item',
                url: '/user/user-list',
                breadcrumbs: false
            }
            // {
            //     id: 'user-details',
            //     title: <FormattedMessage id="user-details" />,
            //     type: 'item',
            //     url: '/user/user-details/1'
            // }
        ]
    },
    {
        id: 'class',
        title: <FormattedMessage id="class" />,
        type: 'collapse',
        icon: icons.ClassIcon,
        children: [
            {
                id: 'class-list',
                title: <FormattedMessage id="class-list" />,
                type: 'item',
                url: '/class/class-list',
                breadcrumbs: false
            }
        ]
    },
    {
        id: 'staff',
        title: <FormattedMessage id="staff" />,
        type: 'collapse',
        icon: icons.GroupsIcon,
        children: [
            {
                id: 'staff-list',
                title: <FormattedMessage id="staff-list" />,
                type: 'item',
                url: '/staff/staff-list',
                breadcrumbs: false
            },
            {
                id: 'cal-staff-ratio',
                title: <FormattedMessage id="cal-staff-ratio" />,
                type: 'item',
                url: '/staff/cal-staff-ratio',
                breadcrumbs: false
            }
        ]
    }
];

const application = {
    id: 'application',
    title: <FormattedMessage id="application" />,
    type: 'group',
    role: 'hd_admin',
    children: menuProd
};

export default application;
