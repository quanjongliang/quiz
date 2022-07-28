import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import useScriptRef from 'services/hooks/useScriptRef';
import AnimateButton from 'components/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AxiosError } from 'axios';
import * as lodash from 'lodash';
import { useDispatch } from 'store';
import { getUsersListKecho } from 'store/slices/user';
import { StringColorProps } from 'types';
import authApi from 'services/api/authApi';
import { openSnackbar } from 'store/slices/template/snackbar';
import { defaultErrorAlert, defaultSuccessAlert } from 'config';
import { upperCaseTextRole } from 'utils/common/upperCaseText';
import { UserApi } from 'services/api';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [roleUser, setRoleUser] = React.useState<{ id?: string; roleName?: string }[]>([
        { id: '1', roleName: 'user' },
        { id: '2', roleName: 'principal' },
        { id: '3', roleName: 'cluster_manager' },
        { id: '4', roleName: 'hq_admin' }
    ]);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const handleClose = () => {
        others.handleclose();
    };

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    useEffect(() => {
        UserApi.listRole()
            .then((res) => setRoleUser(res.data?.data))
            .catch((err) => dispatch(openSnackbar(defaultErrorAlert('Some thing went wrong'))));
    }, [dispatch]);

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    username: '',
                    password: '',
                    roleId: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Name is required'),
                    roleId: Yup.string().max(255).required('Role is required'),
                    username: Yup.string().max(255).required('Username is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async ({ username, name, password, roleId }, { setErrors, setStatus, setSubmitting }) => {
                    authApi
                        .resgister({ username, name, password, roleId })
                        .then(() => {
                            dispatch(getUsersListKecho(others.pagination));
                            dispatch(openSnackbar(defaultSuccessAlert('User create success')));
                            handleClose();
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
                        <FormControl
                            fullWidth
                            error={Boolean(touched.username && errors.username)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-email-register"> Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="text"
                                value={values.username}
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.username && errors.username && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.username}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}
                        <FormControl fullWidth error={Boolean(touched.roleId && errors.roleId)}>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="roleId"
                                value={values.roleId}
                                label="Role"
                                onChange={handleChange}
                            >
                                {roleUser.map((role) => (
                                    <MenuItem value={role?.id}>{upperCaseTextRole(role?.roleName)}</MenuItem>
                                ))}
                            </Select>
                            {touched.roleId && errors.roleId && (
                                <FormHelperText error id="standard-weight-helper-text-roleId-register">
                                    {errors.roleId}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
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
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
