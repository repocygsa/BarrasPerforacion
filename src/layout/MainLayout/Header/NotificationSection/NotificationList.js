// material-ui
import {
    Avatar,
    Button,
    Divider,
    Grid,   
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import { memo } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BallotIcon from '@mui/icons-material/Ballot';
import moment from 'moment';


const ListItemWrapper = styled('div')(() => ({  
    padding: 15,
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = memo(({notiUsers,setOpenDialogNoti,setDetaVali}) => {
    const theme = useTheme();  

    const detalleValida =(res)=>{
        setOpenDialogNoti(true)
        setDetaVali(res)
    }

    const listado=(res)=>{
        let   color = theme.palette.success.dark
        let  backgroundColor = theme.palette.success.light             
        let  borderColor = theme.palette.success.main

        let listado=''
        let emisor=''
        if(res.fk_tip_noti===1){
            emisor='Validación avance'     
          listado=
          <Button onClick={()=>detalleValida(res)}>
          <ListItemWrapper  sx={{marginTop:-1}}>
            <ListItem>
            <ListItemAvatar>
                    <Avatar
                        sx={{
                            color,
                            backgroundColor,
                            border: 'none',
                            borderColor,
                            width: 35, height: 35                                                
                        }}                            
                    >
                     <AssignmentIcon/>                   
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={emisor} />  
            </ListItem>
            <Grid container direction="row" className="list-container">
                <Grid item xs={12} textAlign='left'>  
    
                    <Typography mt={-1} variant="caption" display="block" gutterBottom >
                                {moment(res.fecHorValida).fromNow()}
                    </Typography>  
                    <Typography variant="subtitle2" sx={{textTransform:'none'}}>{res.men} {moment(res.fecHorAvance).format('DD-MM-YYYY')} en</Typography>                      
                    <Typography variant="subtitle2">{res.actividad}/{res.postura}</Typography>   
                </Grid>
            </Grid>                
        </ListItemWrapper>
        </Button>
        }else if(res.fk_tip_noti===2 ||res.fk_tip_noti===3 ){
            color = theme.palette.info.dark
            backgroundColor = theme.palette.info.light             
            borderColor = theme.palette.info.main
            emisor=res.fk_tip_noti===2?'Notificación PAM':'Notificación Hito y TC'
            listado=  <ListItemWrapper  sx={{marginTop:-1}}>
            <ListItem>
            <ListItemAvatar>
                    <Avatar
                        sx={{
                            color,
                            backgroundColor,
                            border: 'none',
                            borderColor,
                            width: 35, height: 35                                                
                        }}                            
                    >
                      <BallotIcon/>                 
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={emisor} />  
            </ListItem>
            <Grid container direction="row" className="list-container">
                <Grid item xs={12} textAlign='left'>  
    
                    <Typography mt={-1} variant="caption" display="block" gutterBottom >
                                {moment(res.fec_hor_noti).fromNow()}
                    </Typography>  
                    <Typography variant="subtitle2" sx={{textTransform:'none'}}>{res.men} {moment.months((res.pam_mes-1))} {res.pam_year}</Typography>                      
                   
                </Grid>
            </Grid>                
        </ListItemWrapper>
        }
    return listado       
    }

    const mostrarNotifica=()=>       
      (
           <>
           {
           notiUsers.data.length>0 ?
            notiUsers.data.map(res=>(
            <div key={res.id}>            
               {listado(res)}   
             <Divider />
            </div>
               )
           )
           :
           <ListItemWrapper >
           <ListItem alignItems="center">
           <ListItemAvatar>
                   <Avatar
                       sx={{
                        color : theme.palette.success.dark,
                        backgroundColor : theme.palette.success.light,             
                        borderColor : theme.palette.success.main,                        
                        border: 'none',                         
                       }}
                   >
                   <MarkChatUnreadIcon stroke={1.5} size="1.3rem" />                   
                   </Avatar>
               </ListItemAvatar>
               <ListItemText primary="No tiene notificaciones" />  
           </ListItem>
       </ListItemWrapper>
       
        }
        </>
        )    

    return (
       <> 
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
                  {mostrarNotifica()}

        </List>
   
   </>
    );
});
export default NotificationList;