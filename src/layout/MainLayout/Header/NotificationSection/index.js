import {
    Avatar,
    Badge,
    Box,
    Button,
    ButtonBase,
    CardActions,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useEffect, useRef, useState } from 'react';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';

// assets
import { IconBell } from '@tabler/icons';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { orange } from '@mui/material/colors';
import { SocketContext } from 'context/SocketContext';

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = ({permiso}) => {

     
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [openDialogNoti, setOpenDialogNoti] = useState(false)
    const [detaVali, setDetaVali] = useState('')
    // const [setValue] = useState('');
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const queryClient = useQueryClient()
 

    const handleClose = () => {
        // if (anchorRef.current && anchorRef.current.contains(event.target)) {
        //     return;
        // }
        // setOpen(false);
        console.log('')
    };

    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    // const handleChange = (event) => {
    //     if (event?.target.value) setValue(event?.target.value);
    // };



   const { socket } = useContext(SocketContext);
   const [cantNoti, setCantNoti] = useState(0)



   
  
     socket.on('avaValidados',()=>{
        queryClient.invalidateQueries('getUserNoti')             
     })
     
     socket.on('notificaPamResp',()=>{
        queryClient.invalidateQueries('getUserNoti')             
     })

     
     socket.on('notificaHitoResp',()=>{
        queryClient.invalidateQueries('getUserNoti')             
     })
   
   
   
   const handleToggle = () => {          
            // limpiar notificaciones leídas
   setOpen((prevOpen) => !prevOpen);

};

    return (
        <>

            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
nada
    
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2}>
                                 
                                        <Grid item xs={12}>
                                            <PerfectScrollbar
                                                style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}
                                            >
                                                <Grid container direction="column" spacing={2}>                                      
                                                    <Grid item xs={12} p={0}>
                                                        <Divider sx={{ my: 0 }} />
                                                    </Grid>
                                                </Grid>
                                              
                                            </PerfectScrollbar>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
              
            </Popper>
        </>
    );
};

export default NotificationSection;
