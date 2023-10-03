// material-ui
import { Typography } from '@mui/material';

// project imports
import menuItem from 'menu-items';
import NavGroup from './NavGroup';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = ({permiso}) => {

    const navItems = menuItem.items.map((item) => {

        switch (item.type) {
          
            case 'SOLICITANTE':
                return permiso.permiso===3 ? <NavGroup key={item.id} item={item}/>:null;
            case 'GESTION':
                return permiso.permiso===2 ?<NavGroup key={item.id} item={item}/>:null;
            case 'ADMINISTRADOR':
                return permiso.permiso===1 ?<NavGroup key={item.id} item={item}/>:null;
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

export default MenuList;
