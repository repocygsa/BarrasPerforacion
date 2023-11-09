/* eslint-disable array-callback-return */
import { Button, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import * as yup from "yup";

import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { SnackComponent } from 'components/theme/SnackComponent';
import { useFormik } from 'formik';
import { updCantidadReserva } from 'helpers/gets';
import { useMutation, useQueryClient } from 'react-query';


export const FormStockUpd = ({setAbrirModal, row, setSnackMensaje}) => {

   // const [snackMensaje, setSnackMensaje] = useState('');

    const [tipoVestimenta, setTipoVestimenta] = useState(''); // Estado para almacenar la opción seleccionada
    const [tipoSex, setTipoSex] = useState('');
    const queryClient = useQueryClient();
    const [usuario, setUsuario] = useState('');
   
    
   
    const [selectedEpp, setSelectedEpp] = useState(null);
    const [eppSeleccionado, setEppSeleccionado] =useState(row.id)
    const [cantidadSol, setCantidadSol] =useState(row.can_reservada)
    useEffect(() => {
      const usu = localStorage.getItem('rut_session');
      setUsuario(usu);
  }, [])


 

const {mutate: mutateInsertStock, isLoading:isLoadindMutateSaveStock} = useMutation(updCantidadReserva,{
  onSuccess:(res)=>{

      if(res.data.affectedRows===1){
          
          setSnackMensaje({                   
              open:true,
              mensaje:'Cantidad reservada actualizada',
              estado:'success'
          });

          queryClient.invalidateQueries('getSolicitudesId');

      }else{

          setSnackMensaje({
              open:true,
              mensaje:'Ha ocurrido un error al actualizar los datos',
              estado:'error'
          });

      }
  }
});

const VALOR_MAXIMO = row.can_solicitada; // Reemplaza esto con tu valor máximo
  const validaciones = yup.object().shape({
   
      epp_cantidad: yup
          .string()
          .required('Debe ingresar una cantidad')
          .test('es-menos-o-igual', 'El valor debe ser menor o igual al solicitado', (value) => {
            // Convierte el valor a un número antes de la comparación
            const cantidad = Number(value);
            return cantidad <= VALOR_MAXIMO;
          })
      ,

     
     
  }).required('Campo Requerido');


const formik = useFormik({

  initialValues: {
    sel_epp :eppSeleccionado,
    epp_cantidad: cantidadSol,
   
  },

  validationSchema: validaciones,
  enableReinitialize: true,
  
  onSubmit: (row) => {
  mutateInsertStock(row)
  formik.resetForm()
  setSelectedEpp(null)
  setEppSeleccionado(0)
  setAbrirModal(false)

  }
});

const handleEppChange = (event, newValue) => {
  


  if(newValue){
    setTipoVestimenta(newValue.fk_tip_tal)
    setTipoSex(newValue.fk_tip_sex)
    setSelectedEpp(newValue);
    setEppSeleccionado(newValue.id)

  }else{
    formik.setFieldValue('sel_epp','')
    setTipoVestimenta('')
    setTipoSex('')
    setSelectedEpp(null)
    setEppSeleccionado(0)
  }
  formik.setFieldValue('epp_sexo','')
  formik.setFieldValue('epp_talla', '')

};


    return (
      
        <>
        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} rowSpacing={1} mt={1}>
          
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              size="small"
              autoComplete="off"
              name="epp_cantidad"
              label="Cantidad"
              value={formik.values.epp_cantidad}
              onChange={formik.handleChange}
              error={formik.touched.epp_cantidad && Boolean(formik.errors.epp_cantidad)}
              helperText={formik.touched.epp_cantidad && formik.errors.epp_cantidad}
              onBlur={(e) => {
                formik.handleBlur(e);
              } } />
          </Grid>
          
        </Grid>
    
          <Grid container spacing={1} rowSpacing={1} mt={1} align="right" >
              <Grid item md={8} xs={12}>
             
                  <Button color="error" variant="contained"  style= {{textTransform: 'none' }} autoFocus onClick={()=>setAbrirModal(false)}>
                    Cerrar
                  </Button>
                
              </Grid>
              <Grid item md={3} xs={12}>
               
                  <LoadingButton
                      type="submit"
                      loading={isLoadindMutateSaveStock}
                      loadingPosition="start"
                      style={{ textTransform: 'none' }}
                      startIcon={<Save />}
                      variant="contained"
                    >
                      Registrar
                  </LoadingButton>
             
              </Grid>
           
          </Grid>
          
     
     
      </form></>


    )

}