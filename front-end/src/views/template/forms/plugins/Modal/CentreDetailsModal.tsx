import React from 'react';

// material-ui
import { Button, CardActions, CardContent, CardProps, Divider, Grid, IconButton, Modal, Typography } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';

// assets
import CloseIcon from '@mui/icons-material/Close';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

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
    saveUserRole: () => void;
    idCentre?: number;
}

interface EditRoleProps {
    idCentre?: number;
}

const Body = React.forwardRef(({ modalStyle, handleClose, idCentre, saveUserRole }: BodyProps, ref: React.Ref<HTMLDivElement>) => (
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
                left: '30%',
                transform: 'translate(-50%, -50%)'
            }}
            title="Centre details"
            content={false}
            secondary={
                <IconButton onClick={handleClose} size="large">
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        >
            <Typography variant="h4" sx={{ m: 2 }}>
                Id: {idCentre}
            </Typography>
            <CardContent>
                {/* <Select
                        fullWidth
                        autoFocus
                        onChange={handleChangeRole}
                        value={currentRole}
                        label="changeRole"
                        inputProps={{
                            name: 'max-width',
                            id: 'max-width'
                        }}
                    >
                        <MenuItem value="4">hq_admin</MenuItem>
                        <MenuItem value="3">cluster_manager</MenuItem>
                        <MenuItem value="2">principal</MenuItem>
                        <MenuItem value="1">user</MenuItem>
                    </Select> */}
                {/* <Typography variant="body1">
                        Laboris non ad et aute sint aliquip mollit voluptate velit dolore magna fugiat ex.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Commodo amet veniam nostrud mollit quis sint qui nulla elit esse excepteur ullamco esse magna. Nisi duis aute est in
                        mollit irure enim tempor in.
                    </Typography> */}
            </CardContent>
            <Divider />
            <CardActions>
                <Grid container justifyContent="flex-end">
                    <Button onClick={saveUserRole}>Save</Button>
                </Grid>
            </CardActions>
            {/* <CardActions>
                <SimpleModal />
            </CardActions> */}
        </MainCard>
    </div>
));

// ==============================|| SIMPLE MODAL ||============================== //

export default function SimpleModal({ idCentre }: EditRoleProps) {
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveUserRole = () => {};

    return (
        <Grid>
            {/* <Button variant="contained" type="button" onClick={handleOpen}>
                Open Modal
            </Button> */}
            {/* <IconButton color="primary" aria-label="edit" size="large" onClick={handleOpen}>
                <EditIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton> */}
            <IconButton color="primary" size="large" onClick={handleOpen}>
                <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
            </IconButton>
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body idCentre={idCentre} modalStyle={modalStyle} handleClose={handleClose} saveUserRole={saveUserRole} />
            </Modal>
        </Grid>
    );
}
