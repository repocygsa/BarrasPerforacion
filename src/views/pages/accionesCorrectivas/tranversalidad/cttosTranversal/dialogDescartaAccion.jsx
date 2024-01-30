import { useMutation, useQueryClient } from 'react-query';

import { Send } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { getDescartaAcc, guardarCierre } from 'helpers/gets';


export const DialogDescartaAccion = ({ abrirDialog, setAbrirDialog, setSnackMensaje,formik, datos,  setModalPrin, ctto, usuario }) => {

  const queryClient = useQueryClient();
  const preguntar =()=> {
    setAbrirDialog(!abrirDialog)
  }



    const {mutate: mutateInsertStock, isLoading:isLoadindMutateSaveStock} = useMutation(getDescartaAcc,{
      onSuccess:(res)=>{
 
          if(res.data.result.affectedRows===1){
              
              setSnackMensaje({                   
                  open:true,
                  mensaje:'Acción correctiva descartada correctamente',
                  estado:'success'
              });
    
              queryClient.invalidateQueries('QueryIncidenteDet');
              queryClient.invalidateQueries('QueryIncidente');
              queryClient.invalidateQueries('QueryCst');
           //   socket.emit('eppStock')
         //  formik.resetForm();
          }else{
    
              setSnackMensaje({
                  open:true,
                  mensaje:'Ha ocurrido un error al actualizar los datos',
                  estado:'error'
              });
    
          }
      }

  });

  const confirmaSalida =()=> {

const valores= {
datos,
ctto,
usuario,
}
    mutateInsertStock(valores); 
    setAbrirDialog(false);

  }
   
  return (
    <>
      <Dialog
        open={abrirDialog}
        onClose={setAbrirDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{fontSize: '18px'}}>
          Descartar acción correctiva
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de descartar esta acción correctiva?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" style= {{textTransform: 'none'}}onClick={()=>preguntar()} autoFocus>
            Cancelar
          </Button>
          <LoadingButton
            loading={isLoadindMutateSaveStock}
            loadingPosition="start"
            startIcon={<Send />}
            variant="contained"
            onClick={()=>confirmaSalida()}
          >
            Confirmar
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </>
  )

}