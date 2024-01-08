import { Button, Card, CardContent, DialogActions, DialogContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';
import moment from 'moment';

import { getIncidentesArch } from 'helpers/gets';
import { useQuery } from 'react-query';
import { ListaTranversalId } from './listaTranversalId';



export const ModalEditarTranversal = ({ abrirModal, setAbrirModal, row }) => {

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
             Complementar registro
            </BootstrapDialogTitle>
            <DialogContent dividers>
            <Container maxWidth="xL">

                    <Grid item xs={12}>
                    <Card variant="outlined" style={{ borderRadius: '10px' }}>
                        <CardContent>

                        <ListaTranversalId id={row.id} row={row}/>
                    </CardContent>
                    </Card>
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