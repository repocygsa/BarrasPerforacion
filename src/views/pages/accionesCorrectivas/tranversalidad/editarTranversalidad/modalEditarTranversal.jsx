import { Button, Card, CardContent, DialogActions, DialogContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';
import moment from 'moment';
import { getIncidentesArch } from 'helpers/gets';
import { useQuery } from 'react-query';
import { ListaTranversalId } from './listaTranversalId';



export const ModalEditarTranversal = ({ abrirModal, setAbrirModal, row, usuario, ctto, setSnackMensaje, empre }) => {

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
            maxWidth="lg"
            fullWidth
            
        >
            <BootstrapDialogTitle id="customized-dialog-title">
             Complementar acción correctiva  {empre} - {ctto}
            </BootstrapDialogTitle>
            <DialogContent dividers>
            <Container maxWidth="xL">

                    <Grid item xs={12}>


                        <ListaTranversalId id={row.id} row={row} user={usuario}  setAbrirModal={setAbrirModal} ctto ={ctto} setSnackMensaje={setSnackMensaje}/>

                    </Grid>

                
            </Container>



            </DialogContent>
           
      {/*
                   <DialogActions>
                <Button color="error" variant="contained"style= {{textTransform: 'none'}} autoFocus onClick={()=>setAbrirModal(false)}>
                   Cerrar
                </Button>
            </DialogActions>
      */}      

            
           
        </BootstrapDialog>
        </>
    )

}