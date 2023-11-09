import { useMutation, useQueryClient } from 'react-query';

import { Send } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { insertReserva } from 'helpers/gets';
import { useContext } from 'react';
import { SocketContext } from 'context/SocketContext';





export const DialogConfirmarSolicitud = ({ abrirDialog, setAbrirDialog, setSnackMensaje, formikRef, dataSolicitud, submiteado, setSubmiteado, titulo, setAbrirModal }) => {

  const preguntar =()=> {
    setAbrirDialog(!abrirDialog)
  }

  const queryClient = useQueryClient();

  const { socket } = useContext(SocketContext);

  const {mutate: mutateInsertReserva, isLoading:isLoadindMutateSaveReserva} = useMutation(insertReserva,{
    onSuccess:(res)=>{

        if(res.data===1){
            
            setSnackMensaje({                   
                open:true,
                mensaje:'Registrado correctamente',
                estado:'success'
            });
           
            queryClient.invalidateQueries('QueryListaSolicitudes');
            socket.emit('eppReserva')
            setAbrirModal(false)
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
    mutateInsertReserva(dataSolicitud)
  //  setSubmiteado(!submiteado);
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
          Confirmacion de solicitud EPP
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {titulo}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" style= {{textTransform: 'none'}}onClick={()=>preguntar()} autoFocus>
            Cancelar
          </Button>
          <LoadingButton
            loading={isLoadindMutateSaveReserva}
            loadingPosition="start"
            startIcon={<Send />}
            variant="contained"
            onClick={()=>confirmaSalida()}
          >
            Enviar
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </>
  )

}