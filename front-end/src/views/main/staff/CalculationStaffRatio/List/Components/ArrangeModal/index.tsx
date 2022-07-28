import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { timeOfDay } from 'config';
import { Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const ConvertTimeOfDay: any = (time: any) => {
    return time.map((item: any) => {
        return (
            {
                key: item.title,
                label: item.title,
                ...item
            } || []
        );
    });
};

const autocompleteList = [
    { label: 'Redemption', year: 1994 },
    { label: 'Godfather', year: 1972 },
    { label: 'Godfat', year: 1974 },
    { label: 'Knight', year: 2008 },
    { label: 'Angry Men', year: 1957 },
    { label: 'Schindler', year: 1993 },
    { label: 'Fiction', year: 1994 },
    { label: 'God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'Lambs', year: 1991 },
    { label: 'Life', year: 1946 },
    { label: 'tiful', year: 1997 },
    { label: 'Suspects', year: 1995 },
    { label: 'Léon:', year: 1994 },
    { label: 'Spirited', year: 2001 },
    { label: 'SavRyan', year: 1998 },
    { label: 'OnWest', year: 1968 },
    { label: 'AmecaX', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'Lights', year: 1931 },
    { label: 'Psycho', year: 1960 }
];

interface IProps {
    onClose: any;
}

export default function StaffTable(props: IProps) {
    const { onClose } = props;
    const [page] = React.useState(0);
    const [rowsPerPage] = React.useState(10);

    // const handleChangePage = (event: unknown, newPage: number) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    const rows = ConvertTimeOfDay(timeOfDay);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Grid container>
                <Grid item xs={11} textAlign="center">
                    <Typography variant="h4" gutterBottom component="div">
                        Please select staffs for the class
                    </Typography>
                </Grid>
                <Grid item xs={1} onClick={onClose} style={{ cursor: 'pointer' }}>
                    <CloseIcon />
                </Grid>
            </Grid>

            <hr className="MuiDivider-root MuiDivider-fullWidth css-vve0hc-MuiDivider-root" />

            <Grid container style={{ padding: 10 }}>
                <Grid container item xs={4}>
                    <Typography style={{ fontWeight: 'Bold', marginRight: 4 }}>Class:</Typography>
                    <Typography>ClassName</Typography>
                </Grid>
                <Grid container item xs={4}>
                    <Typography style={{ fontWeight: 'Bold', marginRight: 4 }}>Lever:</Typography>
                    <Typography>k2</Typography>
                </Grid>
            </Grid>

            <hr className="MuiDivider-root MuiDivider-fullWidth css-vve0hc-MuiDivider-root" />

            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 100 }}>Time</TableCell>
                            <TableCell style={{ minWidth: 100 }}>Children</TableCell>
                            <TableCell style={{ minWidth: 70 }}>Teacher</TableCell>
                            <TableCell style={{ minWidth: 70 }}>Assistant</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover role="checkbox">
                            <TableCell align="left" />
                            <TableCell align="left" />
                            <TableCell align="left">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={autocompleteList}
                                    sx={{ width: 150 }}
                                    renderInput={(params) => <TextField {...params} label="Select for All" />}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={autocompleteList}
                                    sx={{ width: 150 }}
                                    renderInput={(params) => <TextField {...params} label="Select for All" />}
                                />
                            </TableCell>
                        </TableRow>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                            return (
                                <TableRow hover role="checkbox" key={uuidv4()}>
                                    <TableCell align="left">
                                        <Typography>{row.label}</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography>12</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={autocompleteList}
                                            sx={{ width: 150 }}
                                            renderInput={(params) => <TextField {...params} label="Select Teacher" />}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={autocompleteList}
                                            sx={{ width: 150 }}
                                            renderInput={(params) => <TextField {...params} label="Select Assistant" />}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <hr className="MuiDivider-root MuiDivider-fullWidth css-vve0hc-MuiDivider-root" />
            <Grid item xs={11} textAlign="center" style={{ padding: 10 }}>
                <Button variant="contained" style={{ marginRight: 10 }}>
                    Apply
                </Button>
                <Button variant="outlined">Cancel</Button>
            </Grid>
        </Paper>
    );
}
