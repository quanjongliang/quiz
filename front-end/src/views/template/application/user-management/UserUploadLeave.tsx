/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Stack from '@mui/material/Stack';
import { Tooltip, InputLabel, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Input = styled('input')({
    display: 'none'
});

export default function UploadFileLeave() {
    const theme = useTheme();
    const newLocal = 'icon-button-file';
    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.files);
    };
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor={newLocal}>
                <Input onChange={uploadFile} accept="image/*" id="icon-button-file" type="file" />
                <Tooltip title="Upload file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <UploadFileIcon />
                    </IconButton>
                </Tooltip>
            </label>
            {/* <div>
                <TextField type="file" id="file-upload" fullWidth label="Enter SKU" sx={{ display: 'none' }} />
                <InputLabel
                    htmlFor="file-upload"
                    sx={{
                        background: theme.palette.background.default,
                        py: 3.75,
                        px: 0,
                        textAlign: 'center',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        mb: 3,
                        '& > svg': {
                            verticalAlign: 'sub',
                            mr: 0.5
                        }
                    }}
                >
                    <CloudUploadIcon /> Drop file here to upload
                </InputLabel>
            </div> */}
        </Stack>
    );
}
