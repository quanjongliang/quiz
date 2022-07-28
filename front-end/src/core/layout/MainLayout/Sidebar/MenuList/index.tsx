import { memo } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'core/menu-items';
// import { useSelector } from 'store';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    // const { currentUser } = useSelector((state) => state.user);
    const navItems = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default memo(MenuList);
