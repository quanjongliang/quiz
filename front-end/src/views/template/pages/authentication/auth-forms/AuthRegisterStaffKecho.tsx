// material-ui
import {
    Grid,
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    useTheme
} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import * as React from 'react';
// third party
import { Formik } from 'formik';
import * as lodash from 'lodash';
import * as Yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getStaffKecho } from 'store/slices/staff';

// project imports
import useScriptRef from 'services/hooks/useScriptRef';
import AnimateButton from 'components/extended/AnimateButton';
import { openSnackbar } from 'store/slices/template/snackbar';

// assets
import { AxiosError } from 'axios';
import { defaultSuccessAlert, DEFAULT_PAGINATION } from 'config';
import { useDispatch, useSelector } from 'store';
// import { getUsersListKecho } from 'store/slices/user';
import staffApi from 'services/api/staffApi';
import { getClassKecho } from 'store/slices/class';
import { getCentreKecho } from 'store/slices/centre';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const StaffKechoRegister = ({ ...others }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
    const [startDate, setStartDate] = React.useState<Date>(new Date());
    React.useEffect(() => {
        dispatch(getClassKecho(DEFAULT_PAGINATION));
        dispatch(getCentreKecho(DEFAULT_PAGINATION));
    }, [dispatch]);
    const { classKecho } = useSelector((state) => state.classKecho);
    const { centreKecho } = useSelector((state) => state.centreKecho);

    const handleChangeDate = (newValue: Date | null) => {
        if (newValue) setStartDate(newValue);
    };

    return (
        <>
            <Formik
                initialValues={{
                    role: '',
                    name: '',
                    email: '',
                    diploma: '',
                    centerId: '',
                    classId: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    role: Yup.string().max(255).required('Role is required'),
                    classId: Yup.string().max(255).required('Class is required'),
                    centerId: Yup.string().max(255).required('Center is required'),
                    name: Yup.string().max(255).required('Name is required'),
                    email: Yup.string().max(255).email().required('Username is required'),
                    diploma: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async ({ role, name, email, diploma, classId, centerId }, { setErrors, setStatus, setSubmitting }) => {
                    staffApi
                        .createStaff({ role, name, email, diploma, startDate, classId, centerId })
                        .then(() => {
                            dispatch(getStaffKecho(others.pagination));
                            dispatch(openSnackbar(defaultSuccessAlert('Staff create success')));
                            others.handleClose();
                        })
                        .catch((err) => {
                            console.error(err);
                            if (scriptedRef.current && err instanceof AxiosError) {
                                const errorMessage = lodash.isArray(err?.response?.data?.message)
                                    ? err?.response?.data?.message[0]
                                    : err?.response?.data?.message;
                                setStatus({ success: false });
                                setErrors({ submit: errorMessage });
                                setSubmitting(false);
                            }
                        });
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-name-register"> Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-name-register"
                                type="text"
                                value={values.name}
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.name && errors.name && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register"> Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="text"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.diploma && errors.diploma)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-diploma-register"> Diploma</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-diploma-register"
                                type="text"
                                value={values.diploma}
                                name="diploma"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.diploma && errors.diploma && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.diploma}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Grid sx={{ mt: 1 }} container justifyContent="space-between">
                            <Grid item xs={12} sm={5.9}>
                                <FormControl fullWidth error={Boolean(touched.role && errors.role)}>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="role"
                                        value={values.role}
                                        label="Role"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="administrator">Administrator</MenuItem>
                                        <MenuItem value="executive">Excutive</MenuItem>
                                        <MenuItem value="teacher">Teacher</MenuItem>
                                        <MenuItem value="nonTeachingStaff">Non-Teaching Staff</MenuItem>
                                    </Select>
                                    {touched.role && errors.role && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.role}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5.9}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Start date"
                                        inputFormat="dd/MM/yy"
                                        value={startDate}
                                        onChange={handleChangeDate}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <Grid sx={{ mt: 1 }} container justifyContent="space-between">
                            <Grid item xs={12} sm={5.9}>
                                <FormControl fullWidth error={Boolean(touched.classId && errors.classId)}>
                                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="classId"
                                        value={values.classId}
                                        label="Class"
                                        onChange={handleChange}
                                    >
                                        {classKecho && classKecho.map((c) => <MenuItem value={c?.id}>{c?.nameClass}</MenuItem>)}
                                    </Select>
                                    {touched.classId && errors.classId && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.classId}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5.9}>
                                <FormControl fullWidth error={Boolean(touched.centerId && errors.centerId)}>
                                    <InputLabel id="demo-simple-select-label">Center</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="centerId"
                                        value={values.centerId}
                                        label="Center"
                                        onChange={handleChange}
                                    >
                                        {centreKecho &&
                                            centreKecho.map((centre) => <MenuItem value={centre.id}>{centre.nameCenter}</MenuItem>)}
                                    </Select>
                                    {touched.centerId && errors.centerId && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.centerId}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Create
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default StaffKechoRegister;
