import PropTypes from 'prop-types';

// material-ui
import { Avatar, Box, Button, ButtonBase, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import LogoSection from '../LogoSection';

// assets
import { IconMenu2 } from '@tabler/icons';

import logoCodelco from 'assets/images/logo_codelco2.png';

import HomeIcon from '@mui/icons-material/Home';
import { orange } from '@mui/material/colors';
import NotificationSection from './NotificationSection';




// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle,permiso}) => {
    const theme = useTheme();

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
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 0.03 }} />
            <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                <h2>Control y seguimiento de barras de perforación</h2>
            </Box>

            <NotificationSection permiso={permiso}/>
            {/* <ProfileSection /> */}

            <Tooltip title="Volver a APPSGOBM">
                <Button
                    variant="contained"
                    sx={{ backgroundColor: orange[500], '&:hover': { backgroundColor: orange[800] } }}
                    onClick={() => window.location.replace(`../../../`)}
                >
                    <HomeIcon />
                </Button>
            </Tooltip>

            <Box ml={2}>
                <img src={logoCodelco} alt="APPS GOBM" width="70" />
            </Box>
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
