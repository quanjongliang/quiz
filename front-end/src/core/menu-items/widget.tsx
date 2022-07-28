// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconChartArcs, IconClipboardList, IconChartInfographic } from '@tabler/icons';

// constant
const icons = {
    IconChartArcs,
    IconClipboardList,
    IconChartInfographic
};

// ==============================|| WIDGET MENU ITEMS ||============================== //

const widget = {
    id: 'widget',
    title: <FormattedMessage id="widget" />,
    type: 'group',
    children: [
        {
            id: 'statistics',
            title: <FormattedMessage id="statistics" />,
            type: 'item',
            url: '/temp/widget/statistics',
            icon: icons.IconChartArcs
        },
        {
            id: 'data',
            title: <FormattedMessage id="data" />,
            type: 'item',
            url: '/temp/widget/data',
            icon: icons.IconClipboardList
        },
        {
            id: 'chart',
            title: <FormattedMessage id="chart" />,
            type: 'item',
            url: '/temp/widget/chart',
            icon: icons.IconChartInfographic
        }
    ]
};

export default widget;
