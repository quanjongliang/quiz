import React from 'react';

// material-ui
import { Button, CardContent, CardProps, Grid, IconButton, Modal, Tooltip } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';

// assets
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { PaginationOption } from 'types/query/pagination';
import StaffKechoRegister from 'views/template/pages/authentication/auth-forms/AuthRegisterStaffKecho';
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
    pagination: PaginationOption;
}

interface CreateStaffModalProps {
    pagination: PaginationOption;
}

const Body = React.forwardRef(({ modalStyle: _modalStyle, handleClose, pagination }: BodyProps, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} tabIndex={-1}>
        {/**
         * style={modalStyle}
         * Property 'style' does not exist on type 'IntrinsicAttributes & MainCardProps & RefAttributes<HTMLDivElement>
         */}
        {/* <RegisterKecho /> */}

        <MainCard
            // style={modalStyle}
            sx={{
                position: 'absolute',
                width: { xs: 350, lg: 450 },
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
            title="Create new staff"
            content={false}
            secondary={
                <IconButton onClick={handleClose} size="large">
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        >
            <CardContent>
                <StaffKechoRegister pagination={pagination} handleClose={handleClose} />
                {/* <Typography variant="body1">Laboris non ad et aute sint aliquip mollit voluptate velit dolore magna fugiat ex.</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Commodo amet veniam nostrud mollit quis sint qui nulla elit esse excepteur ullamco esse magna. Nisi duis aute est in
                    mollit irure enim tempor in.
                </Typography> */}
            </CardContent>
            {/* <Divider />
            <CardActions>
                <CreateUserModal />
            </CardActions>  */}
        </MainCard>
    </div>
));

// ==============================|| SIMPLE MODAL ||============================== //

export default function CreateStaffModal({ pagination }: CreateStaffModalProps) {
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container justifyContent="flex-end">
            {/* <Button variant="contained" type="button" onClick={handleOpen}>
                Open Modal
            </Button> */}
            <Tooltip title="Create New Staff" placement="top">
                <Button variant="contained" color="secondary" size="large" onClick={handleOpen}>
                    <AddIcon sx={{ fontSize: '1.3rem' }} />
                </Button>
            </Tooltip>
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body pagination={pagination} modalStyle={modalStyle} handleClose={handleClose} />
            </Modal>
        </Grid>
    );
}
