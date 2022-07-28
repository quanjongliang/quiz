import React from 'react';

// material-ui
import { CardContent, CardProps, Grid, IconButton, Modal, Tooltip } from '@mui/material';

// project imports
import { PaginationOption } from 'types/query/pagination';
import { StaffKecho } from 'types/staff-kecho';
import MainCard from 'components/cards/MainCard';
import StaffKechoEdit from 'views/template/pages/authentication/auth-forms/AuthEditStaffKecho';

// assets
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

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
    staffEdit: StaffKecho;
}

interface EditStaffModalProps {
    pagination: PaginationOption;
    staffEdit: StaffKecho;
}

const Body = React.forwardRef(({ modalStyle, handleClose, pagination, staffEdit }: BodyProps, ref: React.Ref<HTMLDivElement>) => (
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
            title="Edit staff"
            content={false}
            secondary={
                <IconButton onClick={handleClose} size="large">
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        >
            <CardContent>
                <StaffKechoEdit pagination={pagination} handleClose={handleClose} staffEdit={staffEdit} />
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

export default function EditStaffModal({ pagination, staffEdit }: EditStaffModalProps) {
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
        <Grid container justifyContent="flex-end" width="fit-content">
            {/* <Button variant="contained" type="button" onClick={handleOpen}>
                Open Modal
            </Button> */}
            <Tooltip title="Edit Staff" placement="top">
                {/* <Button variant="contained" color="secondary" size="large" onClick={handleOpen}>
                    <AddIcon sx={{ fontSize: '1.3rem' }} />
                </Button> */}
                <IconButton color="primary" size="large" onClick={handleOpen}>
                    <EditIcon sx={{ fontSize: '1.3rem' }} />
                </IconButton>
            </Tooltip>
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body pagination={pagination} modalStyle={modalStyle} handleClose={handleClose} staffEdit={staffEdit} />
            </Modal>
        </Grid>
    );
}
