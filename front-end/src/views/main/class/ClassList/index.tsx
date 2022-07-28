import * as React from 'react';

import { Link } from 'react-router-dom';
// material-ui
import {
    Box,
    CardContent,
    Checkbox,
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
import { Customer } from 'types/template/customer';
import MainCard from 'components/cards/MainCard';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { DEFAULT_PAGINATION } from 'config';
import { getClassKecho } from 'store/slices/class';
import { ArrangementOrder, EnhancedTableHeadProps, EnhancedTableToolbarProps, HeadCell } from 'types';
import { ClassKecho } from 'types/class-kecho';
import { PaginationOption } from 'types/query/pagination';
import { upperFirst } from 'lodash';
import { upperCaseTextName } from 'utils/common/upperCaseText';

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
        id: 'name',
        numeric: false,
        label: 'Id',
        align: 'left'
    },
    {
        id: 'orders',
        numeric: true,
        label: 'Name',
        align: 'left'
    },
    {
        id: 'location',
        numeric: true,
        label: 'Year',
        align: 'left'
    },
    {
        id: 'date',
        numeric: true,
        label: 'Description',
        align: 'left'
    },
    {
        id: 'status',
        numeric: false,
        label: 'Level',
        align: 'left'
    },
    {
        id: 'session',
        numeric: false,
        label: 'Session',
        align: 'left'
    },
    {
        id: 'type',
        numeric: false,
        label: 'Type',
        align: 'left'
    }
];

// ==============================|| TABLE HEADER ||============================== //

interface CustomerListEnhancedTableHeadProps extends EnhancedTableHeadProps {
    selected: string[];
}

function EnhancedTableHead({
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    selected
}: CustomerListEnhancedTableHeadProps) {
    const createSortHandler = (property: string) => (event: React.SyntheticEvent<Element, Event>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
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

const ClassList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [pagination, setPagination] = React.useState<PaginationOption>(DEFAULT_PAGINATION);

    const [order, setOrder] = React.useState<ArrangementOrder>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page] = React.useState<number>(0);
    const [rowsPerPage] = React.useState<number>(5);
    const [rows] = React.useState<Customer[]>([]);
    const [classList, setClassList] = React.useState<ClassKecho[]>([]);
    const { classKecho, classKechoMeta } = useSelector((state) => state.classKecho);
    React.useEffect(() => {
        dispatch(getClassKecho(pagination));
    }, [dispatch, pagination]);
    React.useEffect(() => {
        setClassList(classKecho);
    }, [classKecho]);

    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const searchString = event?.target.value;
        setPagination((prev) => ({ ...prev, query: searchString || '' }));
    };

    const handleRequestSort = (event: React.SyntheticEvent<Element, Event>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelectedId = rows.map((n) => n.name);
            setSelected(newSelectedId);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPagination((prev) => ({ ...prev, page: newPage + 1 }));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        event?.target.value && setPagination((prev) => ({ ...prev, page: 1, take: parseInt(event?.target.value, 10) }));
    };

    const isSelected = (name?: string) => {
        if (!name) return false;
        return selected.indexOf(name) !== -1;
    };

    return (
        <MainCard title="Class List" content={false}>
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
                            placeholder="Search Class"
                            value={pagination.query}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        <Tooltip title="Copy">
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
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>

            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={classList.length}
                        selected={selected}
                    />
                    <TableBody>
                        {/* stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                        {classList &&
                            classList.map((row, index) => {
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row?.nameClass);
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
                                        <TableCell padding="checkbox" sx={{ pl: 3 }}>
                                            {/* <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row?.name)}> */}
                                            <Checkbox
                                                color="primary"
                                                // checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            // onClick={(event) => handleClick(event, row?.id)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row?.id}
                                            </Typography>
                                            {/* <Typography variant="caption"> {row?.name} </Typography> */}
                                        </TableCell>
                                        <TableCell>{upperCaseTextName(row?.nameClass)}</TableCell>
                                        <TableCell>{row?.year}</TableCell>
                                        <TableCell align="left">{upperFirst(row?.description)}</TableCell>
                                        <TableCell align="left">{upperFirst(row?.level)}</TableCell>
                                        <TableCell align="left" sx={{ pr: 3 }}>
                                            {upperFirst(row?.session)}
                                        </TableCell>
                                        <TableCell align="left" sx={{ pr: 3 }}>
                                            {upperFirst(row?.type)}
                                        </TableCell>
                                        <TableCell align="left" sx={{ pr: 3 }}>
                                            <Stack direction="row" justifyContent="center" alignItems="center">
                                                <Tooltip placement="top" title="View detail">
                                                    <IconButton
                                                        component={Link}
                                                        color="primary"
                                                        size="large"
                                                        to={`/class/class-details/${row?.id}`}
                                                    >
                                                        <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                    </IconButton>
                                                </Tooltip>
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
                count={classKechoMeta?.itemCount || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default ClassList;
