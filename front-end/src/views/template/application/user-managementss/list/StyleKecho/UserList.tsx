import React from 'react';

// material-ui
import {
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// library
import { format } from 'date-fns';

// project imports
import { useDispatch, useSelector } from 'store';
import { getUsersListStyle1 } from 'store/slices/template/user';
import { getUsersListKecho } from 'store/slices/user';
// import { UserProfile } from 'types/template/user-profile';
import Avatar from 'components/extended/Avatar';

// assets
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import { DEFAULT_PAGINATION } from 'config';
import { UserKechoProfile } from 'types/user-kecho';
import EditKechoModal from 'views/template/forms/plugins/Modal/EditKechoModal';

// const avatarImage = require.context('assets/images/profile', true);

// ==============================|| USER LIST 1 ||============================== //

const UserList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    // const [data, setData] = React.useState<UserProfile[]>([]);

    const [usersKecho, setUsersKecho] = React.useState<UserKechoProfile[]>([]);

    const { usersS1, userKecho } = useSelector((state) => state.userKecho);

    React.useEffect(() => {
        // setData(usersS1);
        setUsersKecho(userKecho);
    }, [usersS1, userKecho]);

    React.useEffect(() => {
        dispatch(getUsersListStyle1());
        dispatch(getUsersListKecho(DEFAULT_PAGINATION));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 3 }}>#</TableCell>
                        <TableCell>User Profile</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Resgister Date</TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersKecho &&
                        usersKecho.map((row, index) => (
                            <TableRow hover key={index}>
                                <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                                <TableCell>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            {/* <Avatar alt="User 1" src={avatarImage(`./${row.avatar}`).default} /> */}
                                            <Avatar
                                                alt="User 1"
                                                src="https://www.pngitem.com/pimgs/m/421-4213053_default-avatar-icon-hd-png-download.png"
                                            />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" variant="subtitle1" component="div">
                                                {row.name}
                                            </Typography>
                                            <Typography align="left" variant="subtitle2" noWrap>
                                                {row.username} ádas
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.role?.roleName}</TableCell>
                                <TableCell>{row.createdDate && format(new Date(row.createdDate), 'MM/dd/yyyy')}</TableCell>
                                <TableCell align="center" sx={{ pr: 3 }}>
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        <Tooltip placement="top" title="Edit">
                                            {/* <IconButton color="primary" aria-label="edit" size="large">
                                                <EditIcon sx={{ fontSize: '1.1rem' }} />
                                            </IconButton> */}
                                            <EditKechoModal currentRole={`${row?.role?.id}`} username={row.username} />
                                        </Tooltip>
                                        <Tooltip placement="top" title="Disable">
                                            <IconButton
                                                color="primary"
                                                sx={{
                                                    color: theme.palette.orange.dark,
                                                    borderColor: theme.palette.orange.main,
                                                    '&:hover ': { background: theme.palette.orange.light }
                                                }}
                                                size="large"
                                            >
                                                <BlockTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserList;
