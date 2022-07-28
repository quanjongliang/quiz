import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { defaultErrorAlert, defaultSuccessAlert } from 'config';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/template/snackbar';
import { UserApi } from 'services/api';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
const UploadFileDropZone = ({ ...props }) => {
    const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
        accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        maxFiles: 1
    });

    const files = acceptedFiles.map((file: File) => (
        <li key={file.name}>
            <div>
                {file.name} - {file.size} bytes
            </div>
        </li>
    ));

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        UserApi.importLeaveExcel(formData)
            .then((res) => {
                dispatch(openSnackbar(defaultSuccessAlert(res.data?.message || 'Import file success')));
                props.handleClose();
            })
            .catch((err) => {
                dispatch(openSnackbar(defaultErrorAlert('Some thing went wrong')));
            });
    };
    const style = React.useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),
        [isFocused, isDragAccept, isDragReject]
    );
    return (
        <section className="container">
            <Box {...getRootProps({})} sx={style}>
                <input {...getInputProps()} />
                <p>Drag &lsquo;n&lsquo; drop file here, or click to select file</p>
                <em>(Only *.xlsx excel file will be accepted)</em>
            </Box>
            <aside>
                <ul>{files}</ul>
            </aside>
            <Box sx={{ textAlign: 'end' }}>
                <Button variant="contained" type="button" onClick={uploadFile}>
                    Upload File
                </Button>
            </Box>
        </section>
    );
};

export default UploadFileDropZone;
