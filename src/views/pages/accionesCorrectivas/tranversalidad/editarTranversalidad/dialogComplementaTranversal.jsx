import { useMutation, useQueryClient } from 'react-query';

import { Send } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { AgregarAccionTranversal } from 'helpers/gets';


export const DialogComplementaTranversal = ({ abrirDialog, setAbrirDialog, setSnackMensaje,formik, datos,  setModalPrin }) => {
  const queryClient = useQueryClient();
  const preguntar =()=> {
    setAbrirDialog(!abrirDialog)
  }



    const {mutate: mutateInsertStock, isLoading:isLoadindMutateSaveStock} = useMutation(AgregarAccionTranversal,{
      onSuccess:(res)=>{
 
          if(res.data.result.affectedRows===1){
              
              setSnackMensaje({                   
                  open:true,
                  mensaje:'Agregado correctamente',
                  estado:'success'
              });
    
              queryClient.invalidateQueries('QueryTranversalID');
            
           //   socket.emit('eppStock')
           formik.resetForm();
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

    mutateInsertStock(datos); 
    setAbrirDialog(false);
    setModalPrin(false);
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
        Complementar
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Confirme para complementar la acción correctiva?
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