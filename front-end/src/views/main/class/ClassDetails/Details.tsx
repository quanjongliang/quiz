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
import { ClassKecho } from 'types/class-kecho';
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

interface DetailsClassProps {
    classDetails: ClassKecho;
}

const Details = ({ classDetails }: DetailsClassProps) => {
    // const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard
                    title="Class"
                    secondary={<Typography variant="subtitle1">Created on {formatDate(classDetails?.createdDate)}</Typography>}
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
                                                <Typography variant="body2">{upperCaseTextName(classDetails?.nameClass)}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Description :</Typography>
                                                <Typography variant="body2">{upperFirst(classDetails?.description)}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Level :</Typography>
                                                <Typography variant="body2">{upperFirst(classDetails?.level)}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Session :</Typography>
                                                <Typography variant="body2">{upperFirst(classDetails?.session)}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Type :</Typography>
                                                <Typography variant="body2">{upperFirst(classDetails?.type)}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Status :</Typography>
                                                {classDetails?.isDeleted ? (
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
