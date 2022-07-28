import * as React from 'react';

import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Tab, Tabs } from '@mui/material';

// project imports
import Details from './Details';
// import Invoice from './Invoice';
// import Status from './Status';
import MainCard from 'components/cards/MainCard';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
// import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
// import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import { TabsProps } from 'types';
// import { CentreKecho } from 'types/centre-kecho';
import { useDispatch, useSelector } from 'store';
// import { getCentreDetailById } from 'store/slices/centre';
// import centreApi from 'utils/api/centreApi';
import { AxiosError } from 'axios';
import { getClassDetailById } from 'store/slices/class';
import { ClassKecho } from 'types/class-kecho';

// tab content
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// ==============================|| ORDER DETAILS ||============================== //

const OrderDetails = () => {
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // set selected tab
    const { classKechoDetails, error } = useSelector((state) => state.classKecho);
    const [classDetails, setClassDetails] = React.useState<ClassKecho>({});

    React.useEffect(() => {
        if (id) dispatch(getClassDetailById(id));
    }, [id]);

    React.useEffect(() => {
        setClassDetails(classKechoDetails);

        if (error && error instanceof AxiosError) {
            window.alert(error.response?.data.message);
            navigate(-1);
        }
    }, [classKechoDetails, error]);

    const [value, setValue] = useState<number>(0);
    const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <MainCard>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                variant="scrollable"
                aria-label="simple tabs example"
                sx={{
                    '& a': {
                        minHeight: 'auto',
                        minWidth: 10,
                        px: 1,
                        py: 1.5,
                        mr: 2.25,
                        color: theme.palette.grey[600],
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    '& a.Mui-selected': {
                        color: theme.palette.primary.main
                    },
                    '& a > svg': {
                        marginBottom: '0px !important',
                        marginRight: 1.25
                    },
                    mb: 3
                }}
            >
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Details" {...a11yProps(0)} />
            </Tabs>
            {/* tab - details */}
            <TabPanel value={value} index={0}>
                <Details classDetails={classDetails} />
            </TabPanel>
        </MainCard>
    );
};

export default OrderDetails;
