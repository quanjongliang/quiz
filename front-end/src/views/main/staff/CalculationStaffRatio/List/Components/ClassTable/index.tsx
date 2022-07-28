import React, { useEffect, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import { timeOfDay } from 'config';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';
import { CardContent, Grid, InputAdornment, TextField, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Collapse from '@mui/material/Collapse';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { RatioApi } from 'services/api';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/template/snackbar';

import Detail from '../../../Detail';
import { ClassKecho } from 'types/class-kecho';
import { IFilterRequest } from 'types/query/filter';
import moment from 'moment';

export interface IInputSaveDetail {
    idRatio?: string;
    idStaff1?: string;
    idStaff2?: string;
    fromHourStaff1?: number;
    toHourStaff1?: number;
    fromHourStaff2?: number;
    toHourStaff2?: number;
}

const convertData = (data: ClassKecho[]): ClassKecho[] => {
    return data.map((item: any) => ({ ...item, key: uuidv4(), isArrange: false }));
};

export default function ClassTable() {
    const [selectRow, setSelectRow] = useState<ClassKecho>();
    // const [refDetail, setRefDetail] = useState<any>({});
    const refDetail = useRef(null);
    const [classData, setClassData] = useState<ClassKecho[]>([]);
    const [limitData] = useState<number>(10);
    const [filter, setFilter] = useState<IFilterRequest>({ date: '2022/05/01', page: 0, take: 10 });
    const dispatch = useDispatch();

    const { page, take } = filter;

    useEffect(() => {
        handleGetClassData();
    }, [filter]);

    const handleGetClassData = async () => {
        const { dataList } = await RatioApi.listClass(filter);
        if (dataList) {
            setClassData(dataList);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setFilter({ ...filter, page: newPage });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, take: Number(event.target.value), page: 0 });
    };

    const handleSaveDetail = async () => {
        const current = refDetail?.current || ({} as any);
        const { data } = await RatioApi.saveRatio(current?.state?.inputSave);
        if (data) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'This is success message',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
            handleGetClassData();
        }
    };

    const rows = convertData(classData);

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
                            placeholder="Search Class"
                            // value={pagination.query}
                            size="small"
                        />
                    </Grid>
                    <Grid container item xs={12} sm={6} sx={{ textAlign: 'right' }} justifyContent="flex-end">
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

    const RenderRow = ({ row }: any) => {
        const { branch, idRatio, nameClass, level, staff } = row as ClassKecho;
        return (
            <>
                <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
                    <TableCell align="left">
                        {selectRow?.idRatio !== idRatio ? (
                            <ArrowRightIcon onClick={() => setSelectRow(row)} style={{ cursor: 'pointer' }} />
                        ) : (
                            <ArrowDropDownIcon onClick={() => setSelectRow(undefined)} style={{ cursor: 'pointer' }} />
                        )}
                    </TableCell>
                    <TableCell align="left">
                        <Typography>{nameClass}</Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography>{level}</Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography>{branch}</Typography>
                    </TableCell>
                    <TableCell align="left">
                        {staff && staff.length > 0 && (
                            <Typography>
                                {staff[0]?.staff.nameStaff},{staff[1]?.staff.nameStaff}
                            </Typography>
                        )}
                    </TableCell>
                    <TableCell align="left">
                        {selectRow?.idRatio === idRatio && (
                            <Button variant="contained" onClick={handleSaveDetail}>
                                Save
                            </Button>
                        )}
                    </TableCell>
                </TableRow>
                <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
                    <TableCell align="center" colSpan={100} style={{ padding: 0 }}>
                        <Collapse in={selectRow?.idRatio === idRatio} timeout="auto" unmountOnExit>
                            <Detail detailClass={row} date={filter.date} ref={refDetail} />
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
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
                                <TableCell style={{ minWidth: 50 }} />
                                <TableCell style={{ minWidth: 100 }}>Class</TableCell>
                                <TableCell style={{ minWidth: 50 }}>Level</TableCell>
                                <TableCell style={{ minWidth: 50 }}>Brand</TableCell>
                                <TableCell style={{ minWidth: 70 }}>Staff</TableCell>
                                <TableCell style={{ minWidth: 30 }} />
                                {/* {ConvertTimeOfDayColums(timeOfDay).map((column: any) => (
                                    <TableCell key={uuidv4()} align="center" style={{ minWidth: 50 }}>
                                        {column.label}
                                    </TableCell>
                                ))} */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * take, page * take + take).map((row: ClassKecho) => {
                                return <RenderRow row={row} key={uuidv4()} />;
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
