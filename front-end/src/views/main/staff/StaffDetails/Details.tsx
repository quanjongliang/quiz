// material-ui
import { Grid, Stack, Typography } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'components/cards/SubCard';
import Chip from 'components/extended/Chip';
import formatDate from 'utils/common/formatDate';

// third party
import { upperFirst } from 'lodash';

// assets
import { StaffKecho } from 'types/staff-kecho';
import { upperCaseTextName } from 'utils/common/upperCaseText';

interface DetailsStaffProps {
    staffDetails: StaffKecho;
}

const Details = ({ staffDetails }: DetailsStaffProps) => {
    // const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard
                    title="Staff"
                    secondary={<Typography variant="subtitle1">Created on {formatDate(staffDetails?.createdDate)}</Typography>}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item>
                                    <Stack spacing={1}>
                                        <Typography variant="h3">Information</Typography>
                                        <Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Name :</Typography>
                                                <Typography variant="body2">{upperCaseTextName(staffDetails?.name)}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Email:</Typography>
                                                <Typography variant="body2">{staffDetails?.email}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Diploma :</Typography>
                                                <Typography variant="body2">{staffDetails?.diploma}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Role :</Typography>
                                                <Typography variant="body2">{upperFirst(staffDetails?.role)}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Start on :</Typography>
                                                <Typography variant="body2">{formatDate(staffDetails?.startDate)}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Status :</Typography>
                                                {staffDetails?.isDeleted ? (
                                                    <Chip label="InActive" variant="outlined" size="small" chipcolor="error" />
                                                ) : (
                                                    <Chip label="Active" variant="outlined" size="small" chipcolor="success" />
                                                )}
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default Details;
