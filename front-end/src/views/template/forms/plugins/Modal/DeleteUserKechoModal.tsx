import React from 'react';

// material-ui
import { Button, CardActions, CardContent, CardProps, Divider, Grid, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'components/cards/MainCard';

// assets
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import { defaultErrorAlert, defaultSuccessAlert } from 'config';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/template/snackbar';
import { getUsersListKecho } from 'store/slices/user';
import { PaginationOption } from 'types/query/pagination';
import { UserApi } from 'services/api';

// generate random
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

// modal position
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

interface BodyProps extends CardProps {
    modalStyle: React.CSSProperties;
    handleClose: () => void;
    handleDeleteUser: () => void;
    username?: string;
}

interface DeleteUserKechoModalProps {
    pagination: PaginationOption;
    userId?: number;
    username?: string;
}

const Body = React.forwardRef(({ modalStyle, handleClose, username, handleDeleteUser }: BodyProps, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} tabIndex={-1}>
        {/**
         * style={modalStyle}
         * Property 'style' does not exist on type 'IntrinsicAttributes & MainCardProps & RefAttributes<HTMLDivElement>
         */}
        <MainCard
            style={modalStyle}
            sx={{
                position: 'absolute',
                width: { xs: 280, lg: 450 },
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
            title="Confirm delete"
            content={false}
            secondary={
                <IconButton onClick={handleClose} size="large">
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        >
            <CardContent>
                <Typography variant="h2" sx={{ mt: 2 }}>
                    Are you sure?
                </Typography>
                <Typography variant="h4" sx={{ mt: 2 }}>
                    Are you sure to delete user &quot;{username}&quot;?
                </Typography>
            </CardContent>
            <Divider />
            <CardActions>
                {/* <DeleteUserKechoModal /> */}
                {/* <Grid container justifyContent="flex-end"> */}
                <Button variant="contained" color="error" onClick={handleDeleteUser}>
                    Yes
                </Button>
                <Button variant="contained" color="inherit" onClick={handleClose}>
                    Cancel
                </Button>
                {/* </Grid> */}
            </CardActions>
        </MainCard>
    </div>
));

// ==============================|| SIMPLE MODAL ||============================== //

export default function DeleteUserKechoModal({ userId, username, pagination }: DeleteUserKechoModalProps) {
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const theme = useTheme();
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteUser = () => {
        if (userId) {
            UserApi.deleteUser(userId)
                .then(() => {
                    handleClose();
                    dispatch(getUsersListKecho(pagination));
                    dispatch(openSnackbar(defaultSuccessAlert('User delete success')));
                })
                .catch((err) => {
                    dispatch(openSnackbar(defaultErrorAlert('Some thing went wrong')));
                });
        }
    };

    return (
        <Grid>
            <Tooltip placement="top" title="Delete">
                <IconButton
                    onClick={handleOpen}
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
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body modalStyle={modalStyle} handleDeleteUser={handleDeleteUser} handleClose={handleClose} username={username} />
            </Modal>
        </Grid>
    );
}
