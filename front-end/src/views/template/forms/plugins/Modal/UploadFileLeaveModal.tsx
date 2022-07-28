import React from 'react';

// material-ui
import { CardContent, CardProps, Grid, IconButton, Modal, Tooltip } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';

// assets
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import UploadFileDropZone from 'views/template/application/user-management/UploadFileDropZone';

// generate random
// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

// modal position
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

interface BodyProps extends CardProps {
    modalStyle: React.CSSProperties;
    handleClose: () => void;
}

const Body = React.forwardRef(({ modalStyle, handleClose }: BodyProps, ref: React.Ref<HTMLDivElement>) => (
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
            title="Upload file"
            content={false}
            secondary={
                <IconButton onClick={handleClose} size="large">
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        >
            <CardContent>
                <UploadFileDropZone handleClose={handleClose} />
            </CardContent>
        </MainCard>
    </div>
));

// ==============================|| SIMPLE MODAL ||============================== //

export default function UploadFileLeaveModal() {
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
            <Tooltip title="Upload file">
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleOpen}>
                    <UploadFileIcon />
                </IconButton>
            </Tooltip>
            {/* <Button variant="contained" type="button" onClick={handleOpen}>
                Upload File
            </Button> */}
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body modalStyle={modalStyle} handleClose={handleClose} />
            </Modal>
        </Grid>
    );
}
