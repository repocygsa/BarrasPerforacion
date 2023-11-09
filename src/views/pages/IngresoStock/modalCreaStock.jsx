import { Button, DialogActions, DialogContent } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';
import { Stock } from '../stock/stock';



import { FormStock } from './formStock';



export const ModalCreaStock = ({ abrirModal, setAbrirModal, tipo, setSnackMensaje, usuario }) => {

    const nada = ''
   
    return (
        <>
        <BootstrapDialog
            open={abrirModal}
            maxWidth="md"
            fullWidth
        >
            <BootstrapDialogTitle id="customized-dialog-title">
              Ingreso de stock de elementos de protección personal
            </BootstrapDialogTitle>
            <DialogContent dividers>
            {/* <FormStock setAbrirModal={setAbrirModal}/> */} 
             <Stock usuario ={usuario} setModalPrin = {setAbrirModal} />
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