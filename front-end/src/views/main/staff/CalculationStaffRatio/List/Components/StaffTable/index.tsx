import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import { timeOfDay } from 'config';
import { v4 as uuidv4 } from 'uuid';
import { CardContent, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { StaffKecho } from 'types/staff-kecho';
import { IFilterRequest } from 'types/query/filter';
import { RatioApi } from 'services/api';
import moment from 'moment';

const ConvertTimeOfDayColums: any = (time: any) => {
    return time.map((item: any) => {
        return (
            {
                id: item.title,
                label: item.title,
                minWidth: 170
            } || []
        );
    });
};

const convertData = (data: any): StaffKecho[] => {
    return data.map((item: any) => ({ ...item, key: uuidv4() }));
};

export default function StaffTable() {
    const [StaffData, setStaffData] = useState<StaffKecho[]>([]);
    const [limitData] = useState<number>(10);
    const [filter, setFilter] = useState<IFilterRequest>({ date: '2022/05/01', page: 0, take: 10 });

    const { page, take } = filter;

    useEffect(() => {
        handleGetClassData();
    }, [filter]);

    const handleGetClassData = async () => {
        const { dataList } = await RatioApi.listStaff(filter);
        if (dataList) {
            setStaffData(dataList);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setFilter({ ...filter, page: newPage });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, take: Number(event.target.value), page: 0 });
    };

    const rows = convertData(StaffData);

    const renderFilter = () => {
        return (
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e) => setFilter({ ...filter, query: e.target.value })}
                            placeholder="Search Staff"
                            // value={pagination.query}
                            size="small"
                        />
                    </Grid>
                    <Grid item container xs={12} sm={6} sx={{ textAlign: 'right' }} justifyContent="flex-end">
                        {/* <Button variant="outlined">Pre</Button> */}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="DateTimePicker"
                                value={filter.date}
                                onChange={(newValue) => {
                                    setFilter({ ...filter, date: moment(newValue).format('YYYY/MM/DD') });
                                }}
                            />
                        </LocalizationProvider>
                        {/* <Button variant="outlined">Next</Button> */}
                    </Grid>
                </Grid>
            </CardContent>
        );
    };

    return (
        <>
            {renderFilter()}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ minWidth: 100 }}>Staff</TableCell>
                                <TableCell style={{ minWidth: 70 }}>Diplomas</TableCell>
                                <TableCell style={{ minWidth: 70 }}>Type</TableCell>
                                {ConvertTimeOfDayColums(timeOfDay).map((column: any) => (
                                    <TableCell key={uuidv4()} align="center" style={{ minWidth: 50 }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * take, page * take + take).map((row: StaffKecho) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
                                        <TableCell align="left">
                                            <Typography>{row.nameStaff}</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography>{row.cert?.diploma || ''}</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography>{row.cert?.title || ''}</Typography>
                                        </TableCell>
                                        {ConvertTimeOfDayColums(timeOfDay).map((column: any) => {
                                            const checked = true;
                                            return (
                                                <TableCell key={uuidv4()} align="center">
                                                    {checked ? <CheckCircleIcon color="primary" /> : <DoDisturbOnIcon />}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={limitData}
                    rowsPerPage={take}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}
