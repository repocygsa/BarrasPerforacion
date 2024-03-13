/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query';
import { Send } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {guardarBdp } from 'helpers/gets';

export const DialogGuardaBDP = ({ abrirDialog, setAbrirDialog, setSnackMensaje,formik, datos }) => {
  const queryClient = useQueryClient();
  const preguntar =()=> {
    setAbrirDialog(!abrirDialog)
  
  }

  const {mutate: mutateInsertBdp, isLoading:isLoadindMutateSaveStock} = useMutation(guardarBdp,{
    onSuccess:(res)=>{
        if(res.data.result.affectedRows===1){
            setSnackMensaje({                   
                open:true,
                mensaje:'Datos registrados correctamente',
                estado:'success'
            });
          
            queryClient.invalidateQueries('QueryBDP');

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

  const confirmaInsert =()=> {
    mutateInsertBdp(datos); 
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
          Registro de barra de perforación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de registrar la barra de perforación?
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
            onClick={()=>confirmaInsert()}
          >
            Confirmar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )

}