import { useMutation, useQueryClient } from 'react-query';
import * as yup from "yup";
import { Send } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, TextField } from '@mui/material';
import { insertReserva, rechazaSolicitud } from 'helpers/gets';
import { useContext, useState } from 'react';
import { SocketContext } from 'context/SocketContext';
import { useFormik } from 'formik';
import { correctFloat } from 'highcharts';

export const DialogConfirmarSolicitudRechazo = ({ abrirDialog, setAbrirDialog, setSnackMensaje, formikRef, dataSolicitud, submiteado, setSubmiteado, titulo, setAbrirModal }) => {

  const preguntar =()=> {
    setAbrirDialog(!abrirDialog)
  }

  const queryClient = useQueryClient();

  const { socket } = useContext(SocketContext);

  const {mutate: mutateInsertReserva, isLoading:isLoadindMutateSaveReserva} = useMutation(rechazaSolicitud,{
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

const validationUsers = yup.object().shape({
 
        obs_epp: yup.string()
        .required('Observación es requerida')
       
     
});

const [datos, setDatos] = useState({})


const formik = useFormik({
  initialValues: {
      ftur_ultima_actividad:null,
      ftur_mejora:'',
      tipo:3,
      obs_epp:''

      
  },

  validationSchema: validationUsers,
  enableReinitialize: true,


  onSubmit: (valuesForm,{setSubmitting}) => {

      const values = {
          form:valuesForm,
      }

      const data ={
        values,
        dataSolicitud
      }
      setDatos(data)
  
     mutateInsertReserva(data)
      setAbrirDialog(false)


//             setValuesF(values)
//             setopenDialog(true)
//             setHabilita(false);
    
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
          Confirmar el rechazo de la solicitud, ingrese una observación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {titulo}
          </DialogContentText>
          <form  onSubmit={formik.handleSubmit}>

<DialogContent dividers>
  <br/>
    <Grid container spacing={1} rowSpacing={1}>
        <Grid item md={12} xs={12}>
            <FormControl fullWidth>
                <TextField
                    size="small"
                    autoComplete="off"
                    name="obs_epp"
                    multiline   
                    rows={1}
                    label="Observación"
                    value={formik.values.obs_epp}
                    onChange={formik.handleChange}
                    error={formik.touched.obs_epp && Boolean(formik.errors.obs_epp)}
                    helperText={formik.touched.obs_epp && formik.errors.obs_epp}
                    onBlur={(e) => {
                        formik.handleBlur(e);
                    
                       
                    }}
                />
            </FormControl>
        </Grid>                    
        <br/>

       
    

    </Grid>



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
            type="submit"
          >
            Enviar
          </LoadingButton>
        </DialogActions>
</form> 
        </DialogContent>
       
      </Dialog>

    </>
  )

}

