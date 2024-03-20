
import {
  CircularProgress, Grid, Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { getCtaCascos } from 'helpers/gets';

import { useState } from 'react';
import { useQuery } from 'react-query';
import * as yup from 'yup';
import { TablaCtaCascos } from './tablaCtaCascos';


const validationSchema = yup.object({
  nombreTrabajador: yup.string(),
  empresa: yup.string(),
  contrato: yup.string(),
});

const FormBusquedaCtaCascos = ({setSnackMensaje, setRut, setNom, setAbrirModal, actualizarRutResponsable}) => {
    const [buscarDCC, setBuscarDCC] = useState(false);
    const [rutBuscar, setRutBuscar] = useState('');




  const formik = useFormik({
    initialValues: {
      nombreTrabajador: '',
      empresa: '',
      contrato: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Lógica de búsqueda y actualización del listado
      console.log(values);
      // Actualiza el estado o realiza la búsqueda aquí
    },
  });





  



const filtroInicial = {
    emp_inf:'0',
    ctt_inf: 'Todo',
    pos_inf:'',
}

  const [filtrosStock, setFiltroStock] = useState(filtroInicial)

const {
    data: DataIncidente, 
    isLoading:isLoadingDataIncidente
  } = useQuery(['QueryCtaCascos', filtrosStock], 
    ()=>getCtaCascos(filtrosStock)
  );


const BuscarRut = (rut) => {
    setRutBuscar(rut);
   setBuscarDCC(true)  
}    
  return (
    <Grid container spacing={3}>
     {/*
     <Grid item xs={12}>
        <Typography variant="h5">Búsqueda de Personas</Typography>
      </Grid>
      
     
      <Grid item xs={4}>
        <TextField
          fullWidth
          id="nombreTrabajador"
          name="nombreTrabajador"
          label="Nombre del Trabajador"
          value={formik.values.nombreTrabajador}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  aria-label="Buscar Rut"
                  onClick={() => {
                    if (formik.values.rut_usu.length > 0) {
    
                    
                      BuscarRut(formik.values.rut_usu);
                    } else {
                      setSnackMensaje({
                        open: false,
                      });
                    }
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={formik.handleChange}
          error={formik.touched.nombreTrabajador && Boolean(formik.errors.nombreTrabajador)}
          helperText={formik.touched.nombreTrabajador && formik.errors.nombreTrabajador}
          size='small'
          
        />
      </Grid>
      <Grid item xs={4}>
      <TextField
      name="rut_usu"
      label="Rut trabajador"
      size="small"
      fullWidth
      autoComplete="off"
      value={formik.values.rut_usu}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              color="primary"
              aria-label="Buscar Rut"
              onClick={() => {
                if (formik.values.rut_usu.length > 0) {

                
                  BuscarRut(formik.values.rut_usu);
                } else {
                  setSnackMensaje({
                    open: false,
                  });
                }
              }}
            >
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={formik.handleChange}
      error={formik.touched.rut_usu && Boolean(formik.errors.rut_usu)}
      helperText={formik.touched.rut_usu && formik.errors.rut_usu}
      onBlur={(e) => {
        // eslint-disable-next-line no-unused-expressions
        checkRut(e.target.value)
          ? formik.setFieldValue("rut_usu", prettifyRut(e.target.value))
          : formik.handleBlur;
      }}
      // Deshabilita el campo si isComisionInvestigadora es false
      disabled={!formik.values.isComisionInvestigadora}
    />
    </Grid>
      <Grid item xs={12}>
       {/*
       <Button variant="contained" color="primary" onClick={formik.handleSubmit}>
          Buscar
        </Button>
       */} 
 
      <Grid item xs={12} style={{ width: '100%' }}>
      {isLoadingDataIncidente ? 
      <Box sx={{ display: 'flex' }}>
          <CircularProgress /> <Typography fontWeight="bold"> Cargando Información...</Typography>
      </Box> 
      : 
      <TablaCtaCascos dataRegistroStock={DataIncidente.data.result} setSnackMensaje={setSnackMensaje} setNom={setNom} setRut={setRut} setAbrirModal={setAbrirModal} actualizarRutResponsable={actualizarRutResponsable} />}
      </Grid>
    </Grid>
  );
};

export default FormBusquedaCtaCascos;
