import { useMutation } from 'react-query';

import { Send } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { guardarSolicitudEpp } from './helperSolicitudes';


export const DialogEnviarSolicitud = ({ abrirDialog, setAbrirDialog, setSnackMensaje, formikRef, dataSolicitud, submiteado, setSubmiteado }) => {

  const preguntar =()=> {
    setAbrirDialog(!abrirDialog)
  }

  const {mutate:mutateSolicitud, isLoading:isLoadindMutateSolicitud} = useMutation(guardarSolicitudEpp,{

    onSuccess:(res)=>{

      if(res.data.affectedRows===1){

        setSnackMensaje({                   
          open:true,
          mensaje:'Datos guardados correctamente',
          estado:'success'
        });

      }else{

        setSnackMensaje({
          open:true,
          mensaje:'Ha ocurrido un error al guardar los datos',
          estado:'error'
        });

      }
    }

  });

  const confirmaSalida =()=> {
    formikRef.current?.resetForm();
    mutateSolicitud(dataSolicitud);
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
          Solicitud EPP
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de enviar la solicitud de EPP?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" style= {{textTransform: 'none'}}onClick={()=>preguntar()} autoFocus>
            Cancelar
          </Button>
          <LoadingButton
            loading={isLoadindMutateSolicitud}
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