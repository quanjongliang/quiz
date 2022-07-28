// material-ui
import { Grid, Stack, Typography } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'components/cards/SubCard';
import Chip from 'components/extended/Chip';
import formatDate from 'utils/common/formatDate';
// third party
// assets
import { CentreKecho } from 'types/centre-kecho';
import { upperCaseTextName } from 'utils/common/upperCaseText';
import { upperFirst } from 'lodash';

// const sxDivider = {
//     borderColor: 'primary.light'
// };

// const detailsIconSX = {
//     width: 15,
//     height: 15,
//     verticalAlign: 'text-top',
//     mr: 0.5,
//     mt: 0.25
// };

interface DetailsCentreProps {
    centreDetails: CentreKecho;
}

const Details = ({ centreDetails }: DetailsCentreProps) => {
    // const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard
                    title="Center"
                    secondary={<Typography variant="subtitle1">Created on {formatDate(centreDetails?.createdDate)}</Typography>}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h3">Information</Typography>
                                        <Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Name :</Typography>
                                                <Typography variant="body2">{upperCaseTextName(centreDetails?.nameCenter)}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Operating Hours From :</Typography>
                                                <Typography variant="body2">{upperFirst(centreDetails?.operatingHoursFrom)}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Operating Hours To :</Typography>
                                                <Typography variant="body2">{upperFirst(centreDetails?.operatingHoursTo)}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">EACD Id :</Typography>
                                                <Typography variant="body2">{centreDetails?.ecdaId}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Address :</Typography>
                                                <Typography variant="body2">{upperFirst(centreDetails?.address)}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Status :</Typography>
                                                {centreDetails?.isDeleted ? (
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
