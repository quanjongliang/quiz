// material-ui
import { CardContent, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';

// assets
import './styles.scss';
import { ClassTable, StaffTable } from './Components';

const CalStaffRatio = () => {
    const renderClassList = () => {
        return (
            <>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-vve0hc-MuiDivider-root" />
                <CardContent>
                    <Typography variant="h5" component="div">
                        Class list
                    </Typography>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <ClassTable />
                        </Grid>
                    </Grid>
                </CardContent>
            </>
        );
    };

    const renderStaffList = () => {
        return (
            <>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-vve0hc-MuiDivider-root" />
                <CardContent>
                    <Typography variant="h5" component="div">
                        Staff list
                    </Typography>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <StaffTable />
                        </Grid>
                    </Grid>
                </CardContent>
            </>
        );
    };

    return (
        <Grid className="container">
            <MainCard title="Calculation & staff ratio" content={false}>
                {renderClassList()}
                {renderStaffList()}
            </MainCard>
        </Grid>
    );
};

export default CalStaffRatio;
