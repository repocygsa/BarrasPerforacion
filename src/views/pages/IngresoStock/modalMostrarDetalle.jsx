import { AppBar, Button, Card, CardActionArea, CardContent, DialogActions, DialogContent, Grid, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';

import { forwardRef,useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {TablaStockDetalle} from './tablaStockDetalle';
import { useQuery } from 'react-query';
import { getEppAllDetalle } from 'helpers/gets';



export const ModalMostrarDetalle = ({ abrirModal, setAbrirModal,row }) => {
    
    const Transition = forwardRef((props, ref ) => <Slide direction="up" ref={ref} {...props} />);
    const [filtrosStock, setFiltroStock] = useState([row])
   
    const {
        data: DataEppAll, 
        isLoading:isLoadingDataEppAll
      } = useQuery(['getEppAllDetalle', filtrosStock], 
        ()=>getEppAllDetalle(filtrosStock)
      );
      const estiloNegrita = {
        fontWeight: 'bold',
        fontSize: '0.8 rem', 
      };

      const customDialogTitleStyle = {
        minWidth: '200px', // Establece el ancho mínimo del título
      };

      const cardContentStyle = {
        textAlign: 'center', // Centrar el contenido horizontalmente
      };
    return (
        <>

        <BootstrapDialog
            open={abrirModal}
            maxWidth="md"
            fullWidth
          //  TransitionComponent={Transition}
        >
    
  
            <BootstrapDialogTitle id="customized-dialog-title"   >
                {row.des_epp}
                <Typography variant="body1" style={estiloNegrita}>
                Talla: {row.des_tal}
            </Typography>
            <Typography variant="body1" style={estiloNegrita}>
                Sexo: {row.des_sex}
            </Typography>
            </BootstrapDialogTitle>
            <DialogContent>
           
            <Grid container spacing={2} style={{ maxHeight: '400px', overflow: 'auto' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent style={cardContentStyle}>
              <Typography gutterBottom variant="h3" component="div">
                {row.suma_cantidades_1}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total ingresos
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent style={cardContentStyle}>
              <Typography gutterBottom variant="h3" component="div">
                {row.suma_cantidades_2}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total egresos
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent style={cardContentStyle}>
              <Typography gutterBottom variant="h3" component="div">
                {row.suma_cantidades}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock total
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>


            
            
            </DialogContent>

            <DialogContent dividers>
            {isLoadingDataEppAll?'':<TablaStockDetalle dataRegistroStock={DataEppAll.data.result} />}
        
            </DialogContent>

            
             <DialogActions>
                <Button color="error" variant="contained"style= {{textTransform: 'none'}} autoFocus onClick={()=>setAbrirModal(false)}>
                   Cerrar
                </Button>
            </DialogActions>
            
          
        </BootstrapDialog>


        </>
    )

}