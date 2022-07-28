// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconUserCheck, IconBasket, IconMessages, IconLayoutKanban, IconMail, IconCalendar, IconNfc } from '@tabler/icons';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupsIcon from '@mui/icons-material/Groups';
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

const menuTemp = [
    {
        id: 'users',
        title: <FormattedMessage id="users" />,
        type: 'collapse',
        icon: icons.IconUserCheck,
        children: [
            {
                id: 'posts',
                title: <FormattedMessage id="social-profile" />,
                type: 'item',
                url: '/temp/user/social-profile/posts'
            },
            {
                id: 'account-profile',
                title: <FormattedMessage id="account-profile" />,
                type: 'collapse',
                children: [
                    {
                        id: 'profile1',
                        title: (
                            <>
                                <FormattedMessage id="profile" /> 01
                            </>
                        ),
                        type: 'item',
                        url: '/temp/user/account-profile/profile1'
                    },
                    {
                        id: 'profile2',
                        title: (
                            <>
                                <FormattedMessage id="profile" /> 02
                            </>
                        ),
                        type: 'item',
                        url: '/temp/user/account-profile/profile2'
                    },
                    {
                        id: 'profile3',
                        title: (
                            <>
                                <FormattedMessage id="profile" /> 03
                            </>
                        ),
                        type: 'item',
                        url: '/temp/user/account-profile/profile3'
                    }
                ]
            },
            {
                id: 'user-card',
                title: <FormattedMessage id="cards" />,
                type: 'collapse',
                children: [
                    {
                        id: 'card1',
                        title: (
                            <>
                                <FormattedMessage id="style" /> 01
                            </>
                        ),
                        type: 'item',
                        url: '/temp/user/card/card1'
                    },
                    {
                        id: 'card2',
                        title: (
                            <>
                                <FormattedMessage id="style" /> 02
                            </>
                        ),
                        type: 'item',
                        url: '/temp/user/card/card2'
                    },
                    {
                        id: 'card3',
                        title: (
                            <>
                                <FormattedMessage id="style" /> 03
                            </>
                        ),
                        type: 'item',
                        url: '/temp/user/card/card3'
                    }
                ]
            },
            {
                id: 'user-list',
                title: <FormattedMessage id="list" />,
                type: 'collapse',
                children: [
                    {
                        id: 'list1',
                        title: (
                            <>
                                <FormattedMessage id="style" /> 01
                            </>
                        ),
                        type: 'item',
                        url: '/temp/user/list/list1'
                    },
                    {
                        id: 'list2',
                        title: (
                            <>
                                <FormattedMessage id="style" /> 02
                            </>
                        ),
                        type: 'item',
                        url: '/temp/user/list/list2'
                    }
                ]
            }
        ]
    },
    {
        id: 'customer',
        title: <FormattedMessage id="customer" />,
        type: 'collapse',
        icon: icons.IconBasket,
        children: [
            {
                id: 'customer-list',
                title: <FormattedMessage id="customer-list" />,
                type: 'item',
                url: '/temp/customer/customer-list',
                breadcrumbs: false
            },
            {
                id: 'order-list',
                title: <FormattedMessage id="order-list" />,
                type: 'item',
                url: '/temp/customer/order-list',
                breadcrumbs: false
            },
            {
                id: 'create-invoice',
                title: <FormattedMessage id="create-invoice" />,
                type: 'item',
                url: '/temp/customer/create-invoice',
                breadcrumbs: false
            },
            {
                id: 'order-details',
                title: <FormattedMessage id="order-details" />,
                type: 'item',
                url: '/temp/customer/order-details'
            },
            {
                id: 'product',
                title: <FormattedMessage id="product" />,
                type: 'item',
                url: '/temp/customer/product',
                breadcrumbs: false
            },
            {
                id: 'product-review',
                title: <FormattedMessage id="product-review" />,
                type: 'item',
                url: '/temp/customer/product-review',
                breadcrumbs: false
            }
        ]
    },
    {
        id: 'chat',
        title: <FormattedMessage id="chat" />,
        type: 'item',
        icon: icons.IconMessages,
        url: '/temp/app/chat'
    },
    {
        id: 'kanban',
        title: 'Kanban',
        type: 'item',
        icon: icons.IconLayoutKanban,
        url: '/temp/app/kanban/board'
    },
    {
        id: 'mail',
        title: <FormattedMessage id="mail" />,
        type: 'item',
        icon: icons.IconMail,
        url: '/temp/app/mail'
    },
    {
        id: 'calendar',
        title: <FormattedMessage id="calendar" />,
        type: 'item',
        url: '/temp/app/calendar',
        icon: icons.IconCalendar,
        breadcrumbs: false
    },
    {
        id: 'contact',
        title: <FormattedMessage id="contact" />,
        type: 'collapse',
        icon: icons.IconNfc,
        children: [
            {
                id: 'c-card',
                title: <FormattedMessage id="cards" />,
                type: 'item',
                url: '/temp/app/contact/c-card',
                breadcrumbs: false
            },
            {
                id: 'c-list',
                title: <FormattedMessage id="list" />,
                type: 'item',
                url: '/temp/app/contact/c-list',
                breadcrumbs: false
            }
        ]
    },
    {
        id: 'e-commerce',
        title: <FormattedMessage id="e-commerce" />,
        type: 'collapse',
        icon: icons.IconBasket,
        children: [
            {
                id: 'products',
                title: <FormattedMessage id="products" />,
                type: 'item',
                url: '/temp/e-commerce/products'
            },
            {
                id: 'product-details',
                title: <FormattedMessage id="product-details" />,
                type: 'item',
                url: '/temp/e-commerce/product-details/1',
                breadcrumbs: false
            },
            {
                id: 'product-list',
                title: <FormattedMessage id="product-list" />,
                type: 'item',
                url: '/temp/e-commerce/product-list',
                breadcrumbs: false
            },
            {
                id: 'checkout',
                title: <FormattedMessage id="checkout" />,
                type: 'item',
                url: '/temp/e-commerce/checkout'
            }
        ]
    }
];

const applicationTemplate = {
    id: 'application-template',
    title: <FormattedMessage id="application-template" />,
    type: 'group',
    // role: 'hd_admin1',
    children: menuTemp
};

export default applicationTemplate;
