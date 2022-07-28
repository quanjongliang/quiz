import * as React from 'react';

import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'components/cards/MainCard';
import Details from './Details';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'store';
import { getStaffDetailById } from 'store/slices/staff';
import { TabsProps } from 'types';
import { StaffKecho } from 'types/staff-kecho';

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
    const { staffKechoDetails, error } = useSelector((state) => state.staffKecho);
    const [staffDetails, setStaffDetails] = React.useState<StaffKecho>({});

    React.useEffect(() => {
        if (id) dispatch(getStaffDetailById(id));
    }, [id]);

    React.useEffect(() => {
        setStaffDetails(staffKechoDetails);
        if (error && error instanceof AxiosError) {
            window.alert(error.response?.data.message);
            navigate(-1);
        }
    }, [staffKechoDetails, error]);

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
                <Details staffDetails={staffDetails} />
            </TabPanel>
        </MainCard>
    );
};

export default OrderDetails;
