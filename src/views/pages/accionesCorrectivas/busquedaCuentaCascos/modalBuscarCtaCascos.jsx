import { Button, Card, CardContent, DialogActions, DialogContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';
import moment from 'moment';

import { getIncidentesArch } from 'helpers/gets';
import { useQuery } from 'react-query';
import FormBusquedaCtaCascos from './formBusquedaCtaCasco';




export const ModalBuscarCtaCascos = ({ abrirModal, setAbrirModal, setRut, setNom, setSnackMensaje, actualizarRutResponsable}) => {

    function createData(
        name,
        dato,
      
      ) {
        return { name, dato };
      }


    return (
        <>
        <BootstrapDialog
            open={abrirModal}
            maxWidth="xL"
            fullWidth
            
        >
            <BootstrapDialogTitle id="customized-dialog-title">
             Busqueda avanzada
            </BootstrapDialogTitle>
            <DialogContent dividers>
            <Container maxWidth="xL">

                    <Grid item xs={12}>

                     <FormBusquedaCtaCascos setSnackMensaje={setSnackMensaje} setRut={setRut} setNom={setNom} setAbrirModal={setAbrirModal} actualizarRutResponsable={actualizarRutResponsable}/>

                    </Grid>

                
            </Container>



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