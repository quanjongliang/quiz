import { lazy } from 'react';

// project imports
import MainLayout from 'core/layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/template/dashboard/Default')));
const DashboardAnalytics = Loadable(lazy(() => import('views/template/dashboard/Analytics')));
const DashboardUserManagerment = Loadable(lazy(() => import('views/template/dashboard/UserManagerment')));
// widget routing
const WidgetStatistics = Loadable(lazy(() => import('views/template/widget/Statistics')));
const WidgetData = Loadable(lazy(() => import('views/template/widget/Data')));
const WidgetChart = Loadable(lazy(() => import('views/template/widget/Chart')));

// application - user social & account profile routing
const AppUserSocialProfile = Loadable(lazy(() => import('views/template/application/usersss/social-profile')));
const AppUserAccountProfile1 = Loadable(lazy(() => import('views/template/application/usersss/account-profile/Profile1')));
const AppUserAccountProfile2 = Loadable(lazy(() => import('views/template/application/usersss/account-profile/Profile2')));
const AppUserAccountProfile3 = Loadable(lazy(() => import('views/template/application/usersss/account-profile/Profile3')));

// application - user cards & list variant routing
const AppProfileCardStyle1 = Loadable(lazy(() => import('views/template/application/user-managementss/card/CardStyle1')));
const AppProfileCardStyle2 = Loadable(lazy(() => import('views/template/application/user-managementss/card/CardStyle2')));
const AppProfileCardStyle3 = Loadable(lazy(() => import('views/template/application/user-managementss/card/CardStyle3')));
const AppProfileListStyle1 = Loadable(lazy(() => import('views/template/application/user-managementss/list/Style1')));
const AppProfileListStyle2 = Loadable(lazy(() => import('views/template/application/user-managementss/list/Style2')));
const AppProfileListStyleKecho = Loadable(lazy(() => import('views/template/application/user-managementss/list/StyleKecho')));

// application - customer routing
const AppCustomerList = Loadable(lazy(() => import('views/template/application/customer/CustomerList')));
const AppCustomerOrderList = Loadable(lazy(() => import('views/template/application/customer/OrderList')));
const AppCustomerCreateInvoice = Loadable(lazy(() => import('views/template/application/customer/CreateInvoice')));
const AppCustomerOrderDetails = Loadable(lazy(() => import('views/template/application/customer/OrderDetails')));
const AppCustomerProduct = Loadable(lazy(() => import('views/template/application/customer/Product')));
const AppCustomerProductReview = Loadable(lazy(() => import('views/template/application/customer/ProductReview')));

// application routing
const AppChat = Loadable(lazy(() => import('views/template/application/chat')));
const AppKanban = Loadable(lazy(() => import('views/template/application/kanban')));
const AppKanbanBacklogs = Loadable(lazy(() => import('views/template/application/kanban/Backlogs')));
const AppKanbanBoard = Loadable(lazy(() => import('views/template/application/kanban/Board')));
const AppMail = Loadable(lazy(() => import('views/template/application/mail')));
const AppCalendar = Loadable(lazy(() => import('views/template/application/calendar')));
const AppContactCard = Loadable(lazy(() => import('views/template/application/contact/Card')));
const AppContactList = Loadable(lazy(() => import('views/template/application/contact/List')));

// application e-commerce pages
const AppECommProducts = Loadable(lazy(() => import('views/template/application/e-commerce/Products')));
const AppECommProductDetails = Loadable(lazy(() => import('views/template/application/e-commerce/ProductDetails')));
const AppECommProductList = Loadable(lazy(() => import('views/template/application/e-commerce/ProductList')));
const AppECommCheckout = Loadable(lazy(() => import('views/template/application/e-commerce/Checkout')));

// forms component routing
const FrmComponentsTextfield = Loadable(lazy(() => import('views/template/forms/components/TextField')));
const FrmComponentsButton = Loadable(lazy(() => import('views/template/forms/components/Button')));
const FrmComponentsCheckbox = Loadable(lazy(() => import('views/template/forms/components/Checkbox')));
const FrmComponentsRadio = Loadable(lazy(() => import('views/template/forms/components/Radio')));
const FrmComponentsSwitch = Loadable(lazy(() => import('views/template/forms/components/Switch')));
const FrmComponentsAutoComplete = Loadable(lazy(() => import('views/template/forms/components/AutoComplete')));
const FrmComponentsSlider = Loadable(lazy(() => import('views/template/forms/components/Slider')));
const FrmComponentsDateTime = Loadable(lazy(() => import('views/template/forms/components/DateTime')));

// forms plugins layout
const FrmLayoutLayout = Loadable(lazy(() => import('views/template/forms/layouts/Layouts')));
const FrmLayoutMultiColumnForms = Loadable(lazy(() => import('views/template/forms/layouts/MultiColumnForms')));
const FrmLayoutActionBar = Loadable(lazy(() => import('views/template/forms/layouts/ActionBar')));
const FrmLayoutStickyActionBar = Loadable(lazy(() => import('views/template/forms/layouts/StickyActionBar')));

// forms plugins routing
const FrmAutocomplete = Loadable(lazy(() => import('views/template/forms/plugins/AutoComplete')));
const FrmMask = Loadable(lazy(() => import('views/template/forms/plugins/Mask')));
const FrmClipboard = Loadable(lazy(() => import('views/template/forms/plugins/Clipboard')));
const FrmRecaptcha = Loadable(lazy(() => import('views/template/forms/plugins/Recaptcha')));
const FrmWysiwugEditor = Loadable(lazy(() => import('views/template/forms/plugins/WysiwugEditor')));
const FrmModal = Loadable(lazy(() => import('views/template/forms/plugins/Modal')));
const FrmTooltip = Loadable(lazy(() => import('views/template/forms/plugins/Tooltip')));

// table routing
const TableBasic = Loadable(lazy(() => import('views/template/forms/tables/TableBasic')));
const TableDense = Loadable(lazy(() => import('views/template/forms/tables/TableDense')));
const TableEnhanced = Loadable(lazy(() => import('views/template/forms/tables/TableEnhanced')));
const TableData = Loadable(lazy(() => import('views/template/forms/tables/TableData')));
const TableCustomized = Loadable(lazy(() => import('views/template/forms/tables/TablesCustomized')));
const TableStickyHead = Loadable(lazy(() => import('views/template/forms/tables/TableStickyHead')));
const TableCollapsible = Loadable(lazy(() => import('views/template/forms/tables/TableCollapsible')));

// forms validation
const FrmFormsValidation = Loadable(lazy(() => import('views/template/forms/forms-validation')));
const FrmFormsWizard = Loadable(lazy(() => import('views/template/forms/forms-wizard')));

// chart routing
const ChartApexchart = Loadable(lazy(() => import('views/template/forms/chart/Apexchart')));
const OrgChartPage = Loadable(lazy(() => import('views/template/forms/chart/OrgChart')));

// basic ui-elements routing
const BasicUIAccordion = Loadable(lazy(() => import('views/template/ui-elements/basic/UIAccordion')));
const BasicUIAvatar = Loadable(lazy(() => import('views/template/ui-elements/basic/UIAvatar')));
const BasicUIBadges = Loadable(lazy(() => import('views/template/ui-elements/basic/UIBadges')));
const BasicUIBreadcrumb = Loadable(lazy(() => import('views/template/ui-elements/basic/UIBreadcrumb')));
const BasicUICards = Loadable(lazy(() => import('views/template/ui-elements/basic/UICards')));
const BasicUIChip = Loadable(lazy(() => import('views/template/ui-elements/basic/UIChip')));
const BasicUIList = Loadable(lazy(() => import('views/template/ui-elements/basic/UIList')));
const BasicUITabs = Loadable(lazy(() => import('views/template/ui-elements/basic/UITabs')));

// advance ui-elements routing
const AdvanceUIAlert = Loadable(lazy(() => import('views/template/ui-elements/advance/UIAlert')));
const AdvanceUIDialog = Loadable(lazy(() => import('views/template/ui-elements/advance/UIDialog')));
const AdvanceUIPagination = Loadable(lazy(() => import('views/template/ui-elements/advance/UIPagination')));
const AdvanceUIProgress = Loadable(lazy(() => import('views/template/ui-elements/advance/UIProgress')));
const AdvanceUIRating = Loadable(lazy(() => import('views/template/ui-elements/advance/UIRating')));
const AdvanceUISnackbar = Loadable(lazy(() => import('views/template/ui-elements/advance/UISnackbar')));
const AdvanceUISkeleton = Loadable(lazy(() => import('views/template/ui-elements/advance/UISkeleton')));
const AdvanceUISpeeddial = Loadable(lazy(() => import('views/template/ui-elements/advance/UISpeeddial')));
const AdvanceUITimeline = Loadable(lazy(() => import('views/template/ui-elements/advance/UITimeline')));
const AdvanceUIToggleButton = Loadable(lazy(() => import('views/template/ui-elements/advance/UIToggleButton')));
const AdvanceUITreeview = Loadable(lazy(() => import('views/template/ui-elements/advance/UITreeview')));

// pricing page routing
const PagesPrice1 = Loadable(lazy(() => import('views/template/pages/pricing/Price1')));
const PagesPrice2 = Loadable(lazy(() => import('views/template/pages/pricing/Price2')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/template/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/template/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/template/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/template/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/template/utilities/TablerIcons')));
const UtilsAnimation = Loadable(lazy(() => import('views/template/utilities/Animation')));
const UtilsGrid = Loadable(lazy(() => import('views/template/utilities/Grid')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/template/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const routersTest = [
    {
        path: '/temp/widget/statistics',
        element: <WidgetStatistics />
    },
    {
        path: '/temp/widget/data',
        element: <WidgetData />
    },
    {
        path: '/temp/widget/chart',
        element: <WidgetChart />
    },

    {
        path: '/temp/user/social-profile/:tab',
        element: <AppUserSocialProfile />
    },
    {
        path: '/temp/user/account-profile/profile1',
        element: <AppUserAccountProfile1 />
    },
    {
        path: '/temp/user/account-profile/profile2',
        element: <AppUserAccountProfile2 />
    },
    {
        path: '/temp/user/account-profile/profile3',
        element: <AppUserAccountProfile3 />
    },

    {
        path: '/temp/user/card/card1',
        element: <AppProfileCardStyle1 />
    },
    {
        path: '/temp/user/card/card2',
        element: <AppProfileCardStyle2 />
    },
    {
        path: '/temp/user/card/card3',
        element: <AppProfileCardStyle3 />
    },
    {
        path: '/temp/user/list/list1',
        element: <AppProfileListStyle1 />
    },
    {
        path: '/temp/user/list/list2',
        element: <AppProfileListStyle2 />
    },
    {
        path: '/temp/user/list/list-kecho',
        element: <AppProfileListStyleKecho />
    },

    {
        path: '/temp/customer/customer-list',
        element: <AppCustomerList />
    },
    {
        path: '/temp/customer/order-list',
        element: <AppCustomerOrderList />
    },
    {
        path: '/temp/customer/create-invoice',
        element: <AppCustomerCreateInvoice />
    },
    {
        path: '/temp/customer/order-details',
        element: <AppCustomerOrderDetails />
    },
    {
        path: '/temp/customer/product',
        element: <AppCustomerProduct />
    },
    {
        path: '/temp/customer/product-review',
        element: <AppCustomerProductReview />
    },
    {
        path: '/temp/app/chat',
        element: <AppChat />
    },
    {
        path: '/temp/app/mail',
        element: <AppMail />
    },
    {
        path: '/temp/app/kanban',
        element: <AppKanban />,
        children: [
            {
                path: 'backlogs',
                element: <AppKanbanBacklogs />
            },
            {
                path: 'board',
                element: <AppKanbanBoard />
            }
        ]
    },
    {
        path: '/temp/app/calendar',
        element: <AppCalendar />
    },
    {
        path: '/temp/app/contact/c-card',
        element: <AppContactCard />
    },
    {
        path: '/temp/app/contact/c-list',
        element: <AppContactList />
    },

    {
        path: '/temp/e-commerce/products',
        element: <AppECommProducts />
    },
    {
        path: '/temp/e-commerce/product-details/:id',
        element: <AppECommProductDetails />
    },
    {
        path: '/temp/e-commerce/product-list',
        element: <AppECommProductList />
    },
    {
        path: '/temp/e-commerce/checkout',
        element: <AppECommCheckout />
    },

    {
        path: '/temp/components/text-field',
        element: <FrmComponentsTextfield />
    },
    {
        path: '/temp/components/button',
        element: <FrmComponentsButton />
    },
    {
        path: '/temp/components/checkbox',
        element: <FrmComponentsCheckbox />
    },
    {
        path: '/temp/components/radio',
        element: <FrmComponentsRadio />
    },
    {
        path: '/temp/components/autocomplete',
        element: <FrmComponentsAutoComplete />
    },
    {
        path: '/temp/components/slider',
        element: <FrmComponentsSlider />
    },
    {
        path: '/temp/components/switch',
        element: <FrmComponentsSwitch />
    },
    {
        path: '/temp/components/date-time',
        element: <FrmComponentsDateTime />
    },

    {
        path: '/temp/forms/layouts/layouts',
        element: <FrmLayoutLayout />
    },
    {
        path: '/temp/forms/layouts/multi-column-forms',
        element: <FrmLayoutMultiColumnForms />
    },
    {
        path: '/temp/forms/layouts/action-bar',
        element: <FrmLayoutActionBar />
    },
    {
        path: '/temp/forms/layouts/sticky-action-bar',
        element: <FrmLayoutStickyActionBar />
    },

    {
        path: '/temp/forms/frm-autocomplete',
        element: <FrmAutocomplete />
    },
    {
        path: '/temp/forms/frm-mask',
        element: <FrmMask />
    },
    {
        path: '/temp/forms/frm-clipboard',
        element: <FrmClipboard />
    },
    {
        path: '/temp/forms/frm-recaptcha',
        element: <FrmRecaptcha />
    },
    {
        path: '/temp/forms/frm-wysiwug',
        element: <FrmWysiwugEditor />
    },
    {
        path: '/temp/forms/frm-modal',
        element: <FrmModal />
    },
    {
        path: '/temp/forms/frm-tooltip',
        element: <FrmTooltip />
    },

    {
        path: '/temp/tables/tbl-basic',
        element: <TableBasic />
    },
    {
        path: '/temp/tables/tbl-dense',
        element: <TableDense />
    },
    {
        path: '/temp/tables/tbl-enhanced',
        element: <TableEnhanced />
    },
    {
        path: '/temp/tables/tbl-data',
        element: <TableData />
    },
    {
        path: '/temp/tables/tbl-customized',
        element: <TableCustomized />
    },
    {
        path: '/temp/tables/tbl-sticky-header',
        element: <TableStickyHead />
    },
    {
        path: '/temp/tables/tbl-collapse',
        element: <TableCollapsible />
    },

    {
        path: 'forms/charts/apexchart',
        element: <ChartApexchart />
    },
    {
        path: '/temp/forms/charts/orgchart',
        element: <OrgChartPage />
    },
    {
        path: '/temp/forms/forms-validation',
        element: <FrmFormsValidation />
    },
    {
        path: '/temp/forms/forms-wizard',
        element: <FrmFormsWizard />
    },

    {
        path: '/temp/basic/accordion',
        element: <BasicUIAccordion />
    },
    {
        path: '/temp/basic/avatar',
        element: <BasicUIAvatar />
    },
    {
        path: '/temp/basic/badges',
        element: <BasicUIBadges />
    },
    {
        path: '/temp/basic/breadcrumb',
        element: <BasicUIBreadcrumb />
    },
    {
        path: '/temp/basic/cards',
        element: <BasicUICards />
    },
    {
        path: '/temp/basic/chip',
        element: <BasicUIChip />
    },
    {
        path: '/temp/basic/list',
        element: <BasicUIList />
    },
    {
        path: '/temp/basic/tabs',
        element: <BasicUITabs />
    },

    {
        path: '/temp/advance/alert',
        element: <AdvanceUIAlert />
    },
    {
        path: '/temp/advance/dialog',
        element: <AdvanceUIDialog />
    },
    {
        path: '/temp/advance/pagination',
        element: <AdvanceUIPagination />
    },
    {
        path: '/temp/advance/progress',
        element: <AdvanceUIProgress />
    },
    {
        path: '/temp/advance/rating',
        element: <AdvanceUIRating />
    },
    {
        path: '/temp/advance/snackbar',
        element: <AdvanceUISnackbar />
    },
    {
        path: '/temp/advance/skeleton',
        element: <AdvanceUISkeleton />
    },
    {
        path: '/temp/advance/speeddial',
        element: <AdvanceUISpeeddial />
    },
    {
        path: '/temp/advance/timeline',
        element: <AdvanceUITimeline />
    },
    {
        path: '/temp/advance/toggle-button',
        element: <AdvanceUIToggleButton />
    },
    {
        path: '/temp/advance/treeview',
        element: <AdvanceUITreeview />
    },

    {
        path: '/temp/pages/price/price1',
        element: <PagesPrice1 />
    },
    {
        path: '/temp/pages/price/price2',
        element: <PagesPrice2 />
    },

    {
        path: '/temp/utils/util-typography',
        element: <UtilsTypography />
    },
    {
        path: '/temp/utils/util-color',
        element: <UtilsColor />
    },
    {
        path: '/temp/utils/util-shadow',
        element: <UtilsShadow />
    },
    {
        path: '/temp/icons/tabler-icons',
        element: <UtilsTablerIcons />
    },
    {
        path: '/temp/icons/material-icons',
        element: <UtilsMaterialIcons />
    },
    {
        path: '/temp/utils/util-animation',
        element: <UtilsAnimation />
    },
    {
        path: '/temp/utils/util-grid',
        element: <UtilsGrid />
    },
    {
        path: '/temp/sample-page',
        element: <SamplePage />
    },
    {
        path: '/temp/dashboard/default',
        element: <DashboardDefault />
    },
    {
        path: '/temp/dashboard/analytics',
        element: <DashboardAnalytics />
    },
    {
        path: '/temp/dashboard/user-managerment',
        element: <DashboardUserManagerment />
    }
];

const templateRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [...routersTest]
};

export default templateRoutes;
