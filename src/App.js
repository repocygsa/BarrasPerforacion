import { useSelector } from 'react-redux';

import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports

import NavigationScroll from 'layout/NavigationScroll';
import { useQuery } from 'react-query';
import { getPermisoSessionBDP } from 'helpers/login';

// import { io } from 'socket.io-client';
// import { useEffect, useState } from 'react';

// ==============================|| APP ||============================== //


const App = () => {

    const customization = useSelector((state) => state.customization);
    const {data, isLoading} = useQuery('getPermisoSessionBDP',()=>getPermisoSessionBDP());
 
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    {isLoading ? null: <Routes dataSesion={data} />}              
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
