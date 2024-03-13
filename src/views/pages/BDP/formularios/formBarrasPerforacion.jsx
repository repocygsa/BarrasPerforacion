/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import * as yup from "yup";
import { Save } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getContratos, getEmpresa } from 'helpers/gets';
import { DialogGuardaBDP } from './dialogGuardaBDP';

export const FormBarrasPerforacion = ({ setSnackMensaje, user}) => {


const [abrirDialog, setAbrirDialog] = useState(false);
const [empreDesc, setEmpreDesc] = useState('');
const [empFil, setEmpFil] = useState('');
const [usuario, setUsuario] = useState('');
const [userCrea, setUserCrea] = useState(user);    
const [data, setData] = useState({});
  
useEffect(() => {
    const usu = localStorage.getItem('rut_session');
    setUsuario(usu);
}, [])

const queryClient = useQueryClient();

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
        .required('Debe seleccionar una empresa')
    ,
    ctt_inf: yup
        .string()
        .required('Debe seleccionar un contrato')
    ,
    bdp_tipo_acero: yup
        .string()
        .required('Ingrese un tipo de acero')
    ,
    bdp_marca: yup
        .string()
        .required('Ingrese una marca')
    ,
       
}).required('Campo Requerido');


const formik = useFormik({
    initialValues: { 
        emp_inf: '',
        ctt_inf: '',  
        bdp_user:userCrea,
        bdp_tipo_acero:'',
        bdp_marca:'',
    },
    validationSchema: validaciones,
    enableReinitialize: true,
    onSubmit: (datos) => {
        console.log(datos)
        setData(datos)
        setAbrirDialog(true)
    }       
});


return (
        <>
  <DialogGuardaBDP
      abrirDialog={abrirDialog} 
      setAbrirDialog={setAbrirDialog}
      setSnackMensaje={setSnackMensaje}
      formik= {formik}
      datos={data}
      usuario={usuario}
    />
   
    <form onSubmit={ formik.handleSubmit }>
    <Grid container spacing={1} mt={1} rowSpacing={1}>
    <Grid item md={3} xs={12}>
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
                    formik.setFieldValue('ctt_inf', '');
                    setEmpFil(e.target.value);

                    const selectedEmpre = DataEmpresas.data.result.find(emp => emp.rut_empre === e.target.value);
                    const tipoEmpre = selectedEmpre ? selectedEmpre.nom_empre : '';
                    
                    // Guarda la descripción en el estado
                    setEmpreDesc(tipoEmpre);
                        // Actualiza el valor de tipoIncidenteDesc en Formik
                        formik.setFieldValue('empreDesc', tipoEmpre);       
                }}
            >
            {
            isLoadingDataEmpresas ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                :
                DataEmpresas.data.result && DataEmpresas.data.result.filter(emps => emps.rut_empre !== '0').map(emp => (
                        <MenuItem key={emp.rut_empre} value={emp.rut_empre} >
                            {emp.nom_empre}
                        </MenuItem>
                        )
                    )}

            </Select>
            <FormHelperText>{formik.touched.emp_inf && formik.errors.emp_inf}</FormHelperText>
        </FormControl>
    </Grid> 
    <Grid item md={3} xs={12}>
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
                DataCttos.data.result && DataCttos.data.result.filter(cttos => cttos.num_ctto !== 'Todo').map(ctt => (
                <MenuItem key={ctt.num_ctto} value={ctt.num_ctto} >
                    {ctt.num_ctto}
                </MenuItem>
                ))
            }
            </Select>
            <FormHelperText>{formik.touched.ctt_inf && formik.errors.ctt_inf}</FormHelperText>
        </FormControl>
    </Grid> 

    <Grid item md={3} xs={12}>
        <TextField
            fullWidth
            size="small"
            autoComplete="off"
            name="bdp_tipo_acero"
            label="Tipo de acero"
            value={formik.values.bdp_tipo_acero}
            onChange={formik.handleChange}
            error={formik.touched.bdp_tipo_acero && Boolean(formik.errors.bdp_tipo_acero)}
            helperText={formik.touched.bdp_tipo_acero && formik.errors.bdp_tipo_acero}
            onBlur={(e) => {
                formik.handleBlur(e);
            }}
        />
    </Grid>
    <Grid item md={3} xs={12}>
        <TextField
            fullWidth
            size="small"
            autoComplete="off"
            name="bdp_marca"
            label="Marca"
            value={formik.values.bdp_marca}
            onChange={formik.handleChange}
            error={formik.touched.bdp_marca && Boolean(formik.errors.bdp_marca)}
            helperText={formik.touched.bdp_marca && formik.errors.bdp_marca}
            onBlur={(e) => {
                formik.handleBlur(e);
            }}
        />
    </Grid>

</Grid>
<Grid container spacing={1} rowSpacing={1} columnSpacing={2} mt={1} align="right">
    <Grid item md={12} xs={12} align="right">

        <LoadingButton
            type="submit" 
            //  loading={isLoadindMutateSaveInfraElectrica}
            loadingPosition="start"
            style= {{textTransform: 'none'}} 
            startIcon={<Save />}
            variant="contained"
        >
            Guardar
        </LoadingButton>

    </Grid>
</Grid>

    </form>

        </>
    )

}