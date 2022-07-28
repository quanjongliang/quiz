import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import {
    Typography,
    InputAdornment,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    TablePagination,
    TextField,
    Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { StaffKecho } from 'types/staff-kecho';
import { IFilterRequest } from 'types/query/filter';
import { RatioApi } from 'services/api';
import { ClassKecho } from 'types/class-kecho';

const convertData = (data: any) => {
    return data.map((item: any) => ({
        ...item,
        name: item.nameStaff,
        level: item.cert?.diploma,
        numberChild: 12
    }));
};

interface IProps {
    onClose: any;
    onSelectStaff: any;
    selectedStaff: any;
    detailClass: ClassKecho;
    type: string;
}

export default function StaffTable(props: IProps) {
    const { onClose, onSelectStaff, selectedStaff, detailClass, type } = props;
    const [selectStaff, setSelectStaff] = useState<any>(selectedStaff);

    const [StaffData, setStaffData] = useState<StaffKecho[]>([]);
    const [limitData] = useState<number>(10);
    const [filter, setFilter] = useState<IFilterRequest>({ date: '2022/05/01', page: 0, take: 10, level: detailClass.level, type });

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

    const handleApplyStaff = () => {
        onSelectStaff(selectStaff);
        onClose();
    };

    const renderTableStaff = () => {
        return (
            <Paper>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ minWidth: 70 }}>Name</TableCell>
                                <TableCell style={{ minWidth: 50 }}>Email</TableCell>
                                <TableCell style={{ minWidth: 50 }}>Diplomas</TableCell>
                                <TableCell style={{ minWidth: 50 }}>Type</TableCell>
                                <TableCell style={{ minWidth: 50 }} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {convertData(StaffData)
                                .slice(page * take, page * take + take)
                                .map((row: StaffKecho) => {
                                    // const isArrange = row.isArrange;
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()} style={{ cursor: 'pointer' }}>
                                            <TableCell align="left">
                                                <Typography>{row.nameStaff}</Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography>{row.email}</Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography>{row.cert?.diploma}</Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography>{row.cert?.title}</Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Checkbox checked={row?.id === selectStaff?.id} onClick={() => setSelectStaff(row)} />
                                            </TableCell>
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
        );
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Grid container>
                <Grid item xs={11} textAlign="center">
                    <Typography variant="h4" gutterBottom component="div">
                        Please select staff for the class
                    </Typography>
                </Grid>
                <Grid item xs={1} onClick={onClose} style={{ cursor: 'pointer' }}>
                    <CloseIcon />
                </Grid>
            </Grid>

            <hr className="MuiDivider-root MuiDivider-fullWidth css-vve0hc-MuiDivider-root" />

            <Grid container style={{ padding: 20 }} spacing={2} alignItems="center">
                <Grid container item xs={4}>
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
            </Grid>

            {renderTableStaff()}

            <hr className="MuiDivider-root MuiDivider-fullWidth css-vve0hc-MuiDivider-root" />
            <Grid item xs={11} textAlign="center" style={{ padding: 10 }}>
                <Button variant="contained" style={{ marginRight: 10 }} onClick={handleApplyStaff} disabled={!selectStaff}>
                    Apply
                </Button>
                <Button variant="outlined">Cancel</Button>
            </Grid>
        </Paper>
    );
}
