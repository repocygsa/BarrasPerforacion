/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Tooltip, Checkbox, FormControlLabel  } from '@mui/material';
import { useState } from 'react';
import * as yup from "yup";
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { getContratos, getEmpresa } from 'helpers/gets';
import { useQuery, useQueryClient } from 'react-query';

export const FormFilter = ({setFiltroStock, usuario, setSnackMensaje, permiso, contrato}) => {

    const queryClient = useQueryClient();

    const [empFil, setEmpFil] = useState('');

    const contratoAdd = permiso ===2?contrato:'';

    const {
      data: DataEmpresas, 
      isLoading:isLoadingDataEmpresas
  } = useQuery(['QueryEmpresas', {tipo: 'filtro', ctto: 'Todo'}], 
      ()=>getEmpresa({tipo: 'filtro', ctto: 'Todo'})
  );

  const {
      data: DataCttos, 
      isLoading: isLoadingDataCttos
  } = useQuery(['QueryCttos', empFil], 
      ()=>getContratos(empFil)
  );

  const validaciones = yup.object().shape({
    emp_inf: yup
    .string()
    // .required('Debe ingresar una empresa')
,

        
  }).required('Campo Requerido');

  
const formik = useFormik({

  initialValues: {
   
    emp_inf:'',
    ctt_inf:contratoAdd,
    asignacionResponsable:'',

  },

  validationSchema: validaciones,
  enableReinitialize: true,
  
  onSubmit: (row) => {
    const fil ={
      emp_inf:row.emp_inf,
      ctt_inf:row.ctt_inf,
      asignacionResponsable:row.asignacionResponsable
    }
    setFiltroStock(fil)
  console.log(fil)
  }
});


    return (
      
        <>

        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} rowSpacing={1} mt={1} >
                  
        
        {permiso===1 && (
          <Grid item md={3} xs={3}>
                           <FormControl
                        fullWidth
                        size="small"
                        error={formik.touched.emp_inf && Boolean(formik.errors.emp_inf)}
                    >
                        <InputLabel id="lbl_emp_inf">Empresa</InputLabel>
                        <Select
                            name="emp_inf"
                            label="Empresa"
                            labelId="lbl_emp_inf"
                            value={formik.values.emp_inf}
                            onBlur={(e) => {
                                formik.handleBlur(e);
                            }}
                            onChange={(e) => {
                                formik.setFieldValue('emp_inf', e.target.value);
                                formik.setFieldValue('ctt_inf', 'Todo');
                                setEmpFil(e.target.value);
                                

                            }}
                        >
                        {
                        isLoadingDataEmpresas ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            :
                            DataEmpresas.data.result && DataEmpresas.data.result.map(emp => (
                                    <MenuItem key={emp.rut_empre} value={emp.rut_empre} >
                                        {emp.nom_empre}
                                    </MenuItem>
                                  )
                             )}

                        </Select>
                        <FormHelperText>{formik.touched.emp_inf && formik.errors.emp_inf}</FormHelperText>
                    </FormControl>
          </Grid> 
        )}
  {permiso===1 && (
          <Grid item md={2.3} xs={12}>
            <FormControl
                        fullWidth
                        size="small"
                        error={formik.touched.ctt_inf && Boolean(formik.errors.ctt_inf)}
                    >
                        <InputLabel id="lbl_ctt_inf">Contrato</InputLabel>
                        <Select
                            name="ctt_inf"
                            label="Contrato"
                            labelId="lbl_ctt_inf"
                            value={formik.values.ctt_inf}
                            onBlur={(e) => {
                                formik.handleBlur(e);
                            }}
                            onChange={(e) => {
                                formik.setFieldValue('ctt_inf', e.target.value);
                            }}
                        >
                        {
                        isLoadingDataCttos ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            :
                            DataCttos.data.result && DataCttos.data.result.map(ctt => (
                            <MenuItem key={ctt.num_ctto} value={ctt.num_ctto} >
                                {ctt.num_ctto}
                            </MenuItem>
                            ))
                        }
                        </Select>
                        <FormHelperText>{formik.touched.ctt_inf && formik.errors.ctt_inf}</FormHelperText>
                    </FormControl>
          </Grid>

  )}
      
          <Grid item md={3} xs={12}>
          <FormControl
                        fullWidth
                        size="small"
                        error={formik.touched.asignacionResponsable && Boolean(formik.errors.asignacionResponsable)}
                    >
                        <InputLabel id="lbl_asig">Asignación</InputLabel>
                        <Select
                            name="asignacionResponsable"
                            label="Asignación"
                            labelId="lbl_asig"
                            value={formik.values.asignacionResponsable}
                            onBlur={(e) => {
                                formik.handleBlur(e);
                            }}
                            onChange={(e) => {
                                formik.setFieldValue('asignacionResponsable', e.target.value);
                            }}
                        >
                            <MenuItem value={0}>Todos</MenuItem>
                            <MenuItem value={1}>Con asignación</MenuItem>
                            <MenuItem value={2}>Sin asignación</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.asignacionResponsable && formik.errors.asignacionResponsable}</FormHelperText>
                    </FormControl>
          </Grid>

  <Grid item md={0.8} xs={12}>
  <Tooltip title="Buscar" arrow>
    <LoadingButton
      type="submit"
      loadingPosition="start"
      style={{ textTransform: 'none', margin: '1px' }}
      startIcon={<SearchIcon />}
      variant="contained"
>Buscar</LoadingButton>
</Tooltip>
  </Grid>
 {/**
   <Grid item md={0.5} xs={12}  >
    <BtnNuevaAccion setSnackMensaje={setSnackMensaje} usuario={usuario} style={{ textTransform: 'none'}} />
  </Grid>  
  
  */} 

</Grid>
</form></>


    )

}