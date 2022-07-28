import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import { CENTRE_LIST_PATH } from 'config';
import Logo from 'components/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to={CENTRE_LIST_PATH}>
        <Logo />
    </Link>
);

export default LogoSection;
