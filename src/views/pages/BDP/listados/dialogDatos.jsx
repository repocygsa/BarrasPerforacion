/* eslint-disable no-unused-vars */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import moment from 'moment';
import { useQueryClient } from 'react-query';



export const DialogDatos = ({ abrirDialogDat, setAbrirDialogDat,datos }) => {

  const queryClient = useQueryClient();
  const preguntar =()=> {
    setAbrirDialogDat(!abrirDialogDat)
  
  }

  const styles = theme => ({
    boldCell: {
      fontWeight: 'bold'
    }
  });
   
  return (
    <>
 <Dialog
        open={abrirDialogDat}
        onClose={setAbrirDialogDat}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontSize: '18px' }}>
          Datos de la asignacion
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Causal de Retiro</TableCell>
                  <TableCell>{datos.bdp_causal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Observación del Retiro</TableCell>
                  <TableCell>{datos.bdp_obs}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Responsable del Retiro</TableCell>
                  <TableCell>{datos.nom_resp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Retiro</TableCell>
                  <TableCell>{moment(datos.bdp_fec_hora_ret).format('DD-MM-YYYY HH:mm')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" style={{ textTransform: 'none' }} onClick={preguntar} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

}