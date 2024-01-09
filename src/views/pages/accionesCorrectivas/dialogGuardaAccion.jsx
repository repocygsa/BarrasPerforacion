/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query';

import { Send } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { guardarIncidente } from 'helpers/gets';


export const DialogGuardaAccion = ({ abrirDialog, setAbrirDialog, setSnackMensaje,formik, datos, submiteado, setSubmiteado, setModalPrin, usuario, formHijoRef }) => {
  const queryClient = useQueryClient();
  const preguntar =()=> {
    setAbrirDialog(!abrirDialog)
  
  }



    const {mutate: mutateInsertStock, isLoading:isLoadindMutateSaveStock} = useMutation(guardarIncidente,{
      onSuccess:(res)=>{

          if(res.result.affectedRows===1){
              
              setSnackMensaje({                   
                  open:true,
                  mensaje:'Datos registrados correctamente',
                  estado:'success'
              });
    
              queryClient.invalidateQueries('QueryIncidente');
           //   socket.emit('eppStock')
            formik.resetForm();
        
           if (formHijoRef.current) {
               formHijoRef.current.resetForm();
             
             }
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

   // setModalPrin(false);
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
          Registro incidente
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de registrar el incidente?
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