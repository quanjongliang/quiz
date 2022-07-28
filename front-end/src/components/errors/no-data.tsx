// material-ui
import { Grid, Typography } from '@mui/material';
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';

// styles

// ==============================|| LOADER ||============================== //

const NoData = () => (
    <Grid container justifyContent="center" width={100}>
        <BrowserNotSupportedIcon />
        <Typography>No Data</Typography>
    </Grid>
);

export default NoData;
