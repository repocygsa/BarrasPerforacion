/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import * as yup from "yup";

import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { getContratos, getEmpresa, insertStock } from 'helpers/gets';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const FormAccionesFilter = ({setFiltroStock, usuario, setSnackMensaje}) => {

   

    const [tipoVestimenta, setTipoVestimenta] = useState(''); // Estado para almacenar la opción seleccionada
    const [tipoSex, setTipoSex] = useState('');
    const queryClient = useQueryClient();
    
    const [selectedEpp, setSelectedEpp] = useState(null);
    const [eppSeleccionado, setEppSeleccionado] =useState('')

    const [empFil, setEmpFil] = useState('');
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





const {mutate: mutateInsertStock, isLoading:isLoadindMutateSaveStock} = useMutation(insertStock,{
  onSuccess:(res)=>{

      if(res.data.result.affectedRows===1){
          
          setSnackMensaje({                   
              open:true,
              mensaje:'Datos registrados correctamente',
              estado:'success'
          });

          queryClient.invalidateQueries('QueryEppAll');

      }else{

          setSnackMensaje({
              open:true,
              mensaje:'Ha ocurrido un error al actualizar los datos',
              estado:'error'
          });

      }
  }
});
  const validaciones = yup.object().shape({
    emp_inf: yup
    .string()
    // .required('Debe ingresar una empresa')
,

     
     
  }).required('Campo Requerido');

  

const formik = useFormik({

  initialValues: {
   
    emp_inf:'',
    ctt_inf:'',
    pos_inf:'',

  },

  validationSchema: validaciones,
  enableReinitialize: true,
  
  onSubmit: (row) => {
    setFiltroStock(row)

  
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
        <Grid container spacing={1} rowSpacing={1} mt={1} >
                  
        
       
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
          <Grid item md={5} xs={12}>
             <TextField
                        fullWidth
                        size="small"
                        autoComplete="off"
                        name="pos_inf"
                        label="Palabras claves acciones correctivas"
                        value={formik.values.pos_inf}
                        onChange={formik.handleChange}
                        error={formik.touched.pos_inf && Boolean(formik.errors.pos_inf)}
                        helperText={formik.touched.pos_inf && formik.errors.pos_inf}
                        onBlur={(e) => {
                            formik.handleBlur(e);
                        }}
                    />
          </Grid>

          
       



  <Grid item md={0.8} xs={12}>
  <Tooltip title="Buscar aprendizaje" arrow>
    <LoadingButton
      type="submit"
      loading={isLoadindMutateSaveStock}
      loadingPosition="start"
      style={{ textTransform: 'none', margin: '1px' }}
      startIcon={<SearchIcon />}
      variant="contained"
/>
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