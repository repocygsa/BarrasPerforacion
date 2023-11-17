import { DialogContent } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';
import { Accion } from './accion';







export const ModalCreaAccion = ({ abrirModal, setAbrirModal, tipo, setSnackMensaje, usuario }) => {

    const nada = ''
   
    return (
        <>
        <BootstrapDialog
            open={abrirModal}
            maxWidth="xL"
            fullWidth
        >
            <BootstrapDialogTitle id="customized-dialog-title">
              Registro de aprendizaje
            </BootstrapDialogTitle>
            <DialogContent dividers>
            {/* <FormStock setAbrirModal={setAbrirModal}/> */} 
             <Accion usuario ={usuario} setModalPrin = {setAbrirModal} setSnackMensaje={setSnackMensaje} />
            </DialogContent>
           {
            /*
             <DialogActions>
                <Button color="error" variant="contained"style= {{textTransform: 'none'}} autoFocus onClick={()=>setAbrirModal(false)}>
                   Cerrar
                </Button>
            </DialogActions>
            */
           }
        </BootstrapDialog>
        </>
    )

}