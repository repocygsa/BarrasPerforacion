import { useMutation, useQueryClient } from 'react-query';

import { Send } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { SocketContext } from 'context/SocketContext';
import { insertStock } from 'helpers/gets';
import { useContext } from 'react';


export const DialogEnviarStock = ({ abrirDialog, setAbrirDialog, setSnackMensaje, formikRef, dataSolicitud, submiteado, setSubmiteado, setModalPrin, usuario }) => {
  const queryClient = useQueryClient();
  const preguntar =()=> {
    setAbrirDialog(!abrirDialog)
  }

  const { socket } = useContext(SocketContext);

    const {mutate: mutateInsertStock, isLoading:isLoadindMutateSaveStock} = useMutation(insertStock,{
      onSuccess:(res)=>{
 
          if(res.data===1){
              
              setSnackMensaje({                   
                  open:true,
                  mensaje:'Datos registrados correctamente',
                  estado:'success'
              });
    
              queryClient.invalidateQueries('QueryEppAll');
              socket.emit('eppStock')
              
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
    formikRef.current?.resetForm();
    const dataInsert ={
      dataSolicitud,
      usuario
    }
    mutateInsertStock(dataInsert);
    setSubmiteado(!submiteado);
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
          Registro de stock EPP
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de registrar los stocks?
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