// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrush, IconTools } from '@tabler/icons';

// constant
const icons = {
    IconBrush,
    IconTools
};

// ==============================|| UI ELEMENTS MENU ITEMS ||============================== //

const elements = {
    id: 'ui-element',
    title: <FormattedMessage id="ui-element" />,
    type: 'group',
    children: [
        {
            id: 'basic',
            title: <FormattedMessage id="basic" />,
            caption: <FormattedMessage id="basic-caption" />,
            type: 'collapse',
            icon: icons.IconBrush,
            children: [
                {
                    id: 'accordion',
                    title: <FormattedMessage id="accordion" />,
                    type: 'item',
                    url: '/temp/basic/accordion',
                    breadcrumbs: false
                },
                {
                    id: 'avatar',
                    title: <FormattedMessage id="avatar" />,
                    type: 'item',
                    url: '/temp/basic/avatar',
                    breadcrumbs: false
                },
                {
                    id: 'badges',
                    title: <FormattedMessage id="badges" />,
                    type: 'item',
                    url: '/temp/basic/badges',
                    breadcrumbs: false
                },
                {
                    id: 'breadcrumb',
                    title: <FormattedMessage id="breadcrumb" />,
                    type: 'item',
                    url: '/temp/basic/breadcrumb'
                },
                {
                    id: 'cards',
                    title: <FormattedMessage id="cards" />,
                    type: 'item',
                    url: '/temp/basic/cards',
                    breadcrumbs: false
                },
                {
                    id: 'chip',
                    title: <FormattedMessage id="chip" />,
                    type: 'item',
                    url: '/temp/basic/chip',
                    breadcrumbs: false
                },
                {
                    id: 'list',
                    title: <FormattedMessage id="list" />,
                    type: 'item',
                    url: '/temp/basic/list',
                    breadcrumbs: false
                },
                {
                    id: 'tabs',
                    title: <FormattedMessage id="tabs" />,
                    type: 'item',
                    url: '/temp/basic/tabs',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'advance',
            title: <FormattedMessage id="advance" />,
            type: 'collapse',
            icon: icons.IconTools,
            children: [
                {
                    id: 'alert',
                    title: <FormattedMessage id="alert" />,
                    type: 'item',
                    url: '/temp/advance/alert',
                    breadcrumbs: false
                },
                {
                    id: 'dialog',
                    title: <FormattedMessage id="dialog" />,
                    type: 'item',
                    url: '/temp/advance/dialog',
                    breadcrumbs: false
                },
                {
                    id: 'pagination',
                    title: <FormattedMessage id="pagination" />,
                    type: 'item',
                    url: '/temp/advance/pagination',
                    breadcrumbs: false
                },
                {
                    id: 'progress',
                    title: <FormattedMessage id="progress" />,
                    type: 'item',
                    url: '/temp/advance/progress',
                    breadcrumbs: false
                },
                {
                    id: 'rating',
                    title: <FormattedMessage id="rating" />,
                    type: 'item',
                    url: '/temp/advance/rating',
                    breadcrumbs: false
                },
                {
                    id: 'snackbar',
                    title: <FormattedMessage id="snackbar" />,
                    type: 'item',
                    url: '/temp/advance/snackbar',
                    breadcrumbs: false
                },
                {
                    id: 'skeleton',
                    title: <FormattedMessage id="skeleton" />,
                    type: 'item',
                    url: '/temp/advance/skeleton',
                    breadcrumbs: false
                },
                {
                    id: 'speeddial',
                    title: <FormattedMessage id="speeddial" />,
                    type: 'item',
                    url: '/temp/advance/speeddial',
                    breadcrumbs: false
                },
                {
                    id: 'timeline',
                    title: <FormattedMessage id="timeline" />,
                    type: 'item',
                    url: '/temp/advance/timeline',
                    breadcrumbs: false
                },
                {
                    id: 'toggle-button',
                    title: <FormattedMessage id="toggle-button" />,
                    type: 'item',
                    url: '/temp/advance/toggle-button',
                    breadcrumbs: false
                },
                {
                    id: 'treeview',
                    title: <FormattedMessage id="treeview" />,
                    type: 'item',
                    url: '/temp/advance/treeview',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default elements;
