import * as React from 'react';

import { Link, useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
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
import { visuallyHidden } from '@mui/utils';

// project imports
// import Chip from 'components/extended/Chip';
import MainCard from 'components/cards/MainCard';
// import { Customer } from 'types/customer';
import { useDispatch, useSelector } from 'store';
// import { getCustomers } from 'store/slices/customer';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
// import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { EnhancedTableHeadProps, HeadCell, EnhancedTableToolbarProps } from 'types';
// import CentreDetailsModal from 'views/template/forms/plugins/Modal/CentreDetailsModal';
import { getCentreKecho } from 'store/slices/centre';
import { CentreKecho } from 'types/centre-kecho';
import { DEFAULT_PAGINATION, Order } from 'config';
import { PaginationOption } from 'types/query/pagination';
import { upperCaseTextName } from 'utils/common/upperCaseText';
import { isEmpty, upperFirst } from 'lodash';
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
        id: 'littleLiveId',
        numeric: false,
        label: 'Little Live ID',
        align: 'center'
    },
    {
        id: 'name',
        numeric: true,
        label: 'Name',
        align: 'left'
    },
    {
        id: 'operatingHoursFrom',
        numeric: true,
        label: 'Operating hours (From) ',
        align: 'left'
    },
    {
        id: 'operatingHoursTo',
        numeric: true,
        label: 'Operating hours (To) ',
        align: 'left'
    },
    {
        id: 'ecdaId',
        numeric: false,
        label: 'ECDA ID',
        align: 'left'
    },
    {
        id: 'address',
        numeric: false,
        label: 'Address',
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

const CentreList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pagination, setPagination] = React.useState<PaginationOption>(DEFAULT_PAGINATION);

    const [selected] = React.useState<string[]>([]);
    // const [page] = React.useState<number>(0);
    // const [search] = React.useState<string>('');
    const [centre, setCentre] = React.useState<CentreKecho[]>([]);
    const { customers } = useSelector((state) => state.customer);
    const { centreKecho, centreKechoMeta, error } = useSelector((state) => state.centreKecho);
    React.useEffect(() => {
        dispatch(getCentreKecho(pagination));
    }, [dispatch, pagination]);
    React.useEffect(() => {
        setCentre(centreKecho);
    }, [customers, centreKecho]);
    React.useEffect(() => {
        if (!isEmpty(error) && error instanceof AxiosError) {
            if (error.response?.status === 403) navigate('/pages/error-role');
            else navigate('/pages/error');
        }
    }, [error]);

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
        <MainCard title="Centre List" content={false}>
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
                            placeholder="Search Centre"
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
                        order={pagination.order}
                        orderBy={pagination.sortColumn}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={centre.length}
                        selected={selected}
                    />
                    <TableBody>
                        {centre &&
                            centre.map((row, index) => {
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row?.nameCenter);
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
                                                {' '}
                                                {row?.ECDA_ID}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{upperCaseTextName(row?.nameCenter)}</TableCell>
                                        <TableCell>{upperFirst(row?.operatingHoursFrom)}</TableCell>
                                        <TableCell align="left">{upperFirst(row?.operatingHoursTo)}</TableCell>
                                        <TableCell align="left">{row?.ecdaId}</TableCell>

                                        <TableCell align="left" sx={{ pr: 3 }}>
                                            {upperFirst(row?.address)}
                                        </TableCell>
                                        <TableCell align="left" sx={{ pr: 3 }}>
                                            <Stack direction="row" justifyContent="center" alignItems="center">
                                                <Tooltip title="View detail" placement="top">
                                                    <IconButton
                                                        component={Link}
                                                        color="primary"
                                                        size="large"
                                                        to={`/centre/centre-details/${row?.id}`}
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
                count={centreKechoMeta?.itemCount || 0}
                rowsPerPage={pagination.take}
                page={pagination.page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default CentreList;
