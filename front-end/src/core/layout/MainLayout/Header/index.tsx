import { Link as RouterLink } from 'react-router-dom';
// material-ui
import { Avatar, Box, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// project imports
import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/template/menu';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';

// assets
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { IconMenu2 } from '@tabler/icons';

import { CENTRE_LIST_PATH } from 'config';
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
    const theme = useTheme();

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    {/* <LogoSection /> */}
                    <Link component={RouterLink} to={CENTRE_LIST_PATH}>
                        <Typography variant="h1" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                            {' '}
                            <ManageAccountsIcon fontSize="large" />
                            KECHO
                        </Typography>
                    </Link>
                </Box>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        overflow: 'hidden',
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                        color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                        '&:hover': {
                            background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                            color: theme.palette.secondary.light
                        }
                    }}
                    onClick={() => dispatch(openDrawer(!drawerOpen))}
                    color="inherit"
                >
                    <IconMenu2 stroke={1.5} size="20px" />
                </Avatar>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* mega-menu */}
            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <MegaMenuSection />
            </Box> */}

            {/* live customization & localization */}
            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
            </Box> */}

            {/* notification & profile */}
            {/* <NotificationSection /> */}
            <ProfileSection />

            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </>
    );
};

export default Header;
