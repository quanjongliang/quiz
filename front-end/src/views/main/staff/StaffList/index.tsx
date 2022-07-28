import * as React from 'react';

import { Link, useNavigate } from 'react-router-dom';
// material-ui
import {
    Box,
    CardContent,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

// project imports
import { useDispatch, useSelector } from 'store';
// import { Customer } from 'types/customer';
import MainCard from 'components/cards/MainCard';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { DEFAULT_PAGINATION, Order } from 'config';
import { getStaffKecho } from 'store/slices/staff';
import { EnhancedTableHeadProps, EnhancedTableToolbarProps, HeadCell } from 'types';
import { PaginationOption } from 'types/query/pagination';
import { StaffKecho } from 'types/staff-kecho';
import CreateStaffModal from 'views/template/forms/plugins/Modal/CreateStaffModal';
import { isEmpty, upperFirst } from 'lodash';
import { upperCaseTextName } from 'utils/common/upperCaseText';
// import checkRoleCurrentUser from 'utils/common/checkRoleCurrentUser';
import DeleteStaffKechoModal from 'views/template/forms/plugins/Modal/DeleteStaffKechoModal';
import EditStaffModal from 'views/template/forms/plugins/Modal/EditStaffModal';
import { AxiosError } from 'axios';

// table sort
// function descendingComparator(a: KeyedObject, b: KeyedObject, orderBy: string) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// const getComparator: GetComparator = (order, orderBy) =>
//     order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

// function stableSort(array: Customer[], comparator: (a: Customer, b: Customer) => number) {
//     const stabilizedThis = array.map((el: Customer, index: number) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0] as Customer, b[0] as Customer);
//         if (order !== 0) return order;
//         return (a[1] as number) - (b[1] as number);
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

// table header options
const headCells: HeadCell[] = [
    {
        id: 'id',
        numeric: false,
        label: 'Id',
        align: 'center'
    },
    {
        id: 'name',
        numeric: true,
        label: 'Name',
        align: 'left'
    },
    {
        id: 'role',
        numeric: true,
        label: 'Role',
        align: 'left'
    },

    {
        id: 'email',
        numeric: true,
        label: 'Email',
        align: 'left'
    },
    {
        id: 'diploma',
        numeric: false,
        label: 'Diploma',
        align: 'left'
    }
];

// ==============================|| TABLE HEADER ||============================== //

interface CustomerListEnhancedTableHeadProps extends EnhancedTableHeadProps {
    selected: string[];
}

function EnhancedTableHead({ order, orderBy, numSelected, onRequestSort, selected }: CustomerListEnhancedTableHeadProps) {
    const createSortHandler = (property: string) => (event: React.SyntheticEvent<Element, Event>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow sx={{ p: 3 }}>
                {numSelected > 0 && (
                    <TableCell padding="none" colSpan={6}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                    </TableCell>
                )}
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        Action
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }: EnhancedTableToolbarProps) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        {numSelected > 0 ? (
            <Typography color="inherit" variant="h4">
                {numSelected} Selected
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
                Nutrition
            </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {numSelected > 0 && (
            <Tooltip title="Delete">
                <IconButton size="large">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
);

// ==============================|| CUSTOMER LIST ||============================== //

const StaffList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pagination, setPagination] = React.useState<PaginationOption>(DEFAULT_PAGINATION);

    const [selected] = React.useState<string[]>([]);

    const [staffList, setStaffList] = React.useState<StaffKecho[]>([]);
    const { staffKecho, error } = useSelector((state) => state.staffKecho);
    React.useEffect(() => {
        dispatch(getStaffKecho(pagination));
    }, [dispatch, pagination]);
    React.useEffect(() => {
        setStaffList(staffKecho);
    }, [staffKecho]);
    React.useEffect(() => {
        if (!isEmpty(error) && error instanceof AxiosError) {
            if (error.response?.data?.statusCode === 403) navigate('/pages/error-role');
            else navigate('/pages/error');
        }
    }, [error, navigate]);

    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const searchString = event?.target.value;
        setPagination((prev) => ({ ...prev, query: searchString || '' }));
    };

    const handleRequestSort = (event: React.SyntheticEvent<Element, Event>, property: string) => {
        const newOrder = pagination.order === Order.DESC ? Order.ASC : Order.DESC;
        setPagination((prev) => ({ ...prev, sortColumn: property, order: newOrder }));
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        // if (event.target.checked) {
        //     const newSelectedId = rows.map((n) => n.name);
        //     setSelected(newSelectedId);
        //     return;
        // }
        // setSelected([]);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPagination((prev) => ({ ...prev, page: newPage + 1 }));
    };

    const isSelected = (name?: string) => {
        if (!name) return false;
        return selected.indexOf(name) !== -1;
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        event?.target.value && setPagination((prev) => ({ ...prev, page: 1, take: parseInt(event?.target.value, 10) }));
    };

    return (
        <MainCard title="Staff List" content={false}>
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
                            onChange={handleSearch}
                            placeholder="Search Staff"
                            value={pagination.query}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        <CreateStaffModal pagination={pagination} />
                        {/* <Tooltip title="Copy">
                            <IconButton size="large">
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Print">
                            <IconButton size="large">
                                <PrintIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter">
                            <IconButton size="large">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip> */}
                    </Grid>
                </Grid>
            </CardContent>

            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={pagination.order}
                        orderBy={pagination.sortColumn}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={staffList.length}
                        selected={selected}
                    />
                    <TableBody>
                        {staffList &&
                            staffList.map((row, index) => {
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row?.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row?.id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // onClick={(event) => handleClick(event, row?.id)}
                                            sx={{ cursor: 'pointer' }}
                                            align="center"
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row?.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{upperCaseTextName(row?.nameStaff)}</TableCell>
                                        <TableCell>{upperFirst(row?.roleStaff)}</TableCell>
                                        <TableCell align="left">{row?.email}</TableCell>
                                        <TableCell align="left">{upperFirst(row?.cert?.diploma)}</TableCell>
                                        <TableCell align="left" sx={{ pr: 3 }}>
                                            <Stack direction="row" justifyContent="center" alignItems="center">
                                                <EditStaffModal pagination={pagination} staffEdit={row} />
                                                <Tooltip title="View detail" placement="top">
                                                    <IconButton
                                                        component={Link}
                                                        color="primary"
                                                        size="large"
                                                        to={`/staff/staff-details/${row?.id}`}
                                                    >
                                                        <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <DeleteStaffKechoModal pagination={pagination} name={row?.name} staffId={row?.id} />
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={staffList?.length || 0}
                rowsPerPage={pagination.take}
                page={pagination.page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default StaffList;
