/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Save } from '@mui/icons-material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, CircularProgress, DialogActions, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { getCausal, getEmpresa } from 'helpers/gets';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { checkRut, prettifyRut } from 'react-rut-formatter';
import * as yup from "yup";
import { ModalBuscarCtaCascos } from '../busquedaCuentaCascos/modalBuscarCtaCascos';
import { DialogActualiza } from './dialogActualiza';

export const FormResponsableBDP = ({ setSnackMensaje, user, setAbrirDialog, id, empresa, permiso}) => {


const [abrirDialogAct, setAbrirDialogAct] = useState('');
const [empreDesc, setEmpreDesc] = useState('');
const [empFil, setEmpFil] = useState('');
const [usuario, setUsuario] = useState('');
const [userCrea, setUserCrea] = useState(user);    
const [data, setData] = useState({});
const [abrirModal, setAbrirModal] = useState(false); 
const [nom, setNom] = useState('')
const [rut, setRut] = useState('')


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
    data: DataCausal, 
    isLoading: isLoadingDataCausal
} = useQuery(['QueryCausal'], 
    ()=>getCausal()
);
    
const BuscarRut = (rut) => {
 //   setRutBuscar(rut);
  // setBuscarDCC(true)  
}    

const validaciones = yup.object().shape({

    bpd_causa: yup
        .string()
        .required('Debe seleccionar una causa')
    ,
    bdp_obs: yup
        .string()
        .trim()
        .matches(/^\S.{2,}$/, 'El tipo de acero debe tener al menos 3 caracteres y no contener espacios')
        .required('Ingrese una observación')
    ,


    rut_usu: yup
        .string()
        .required('Ingrese un responsable')
        .max(12, 'Máximo de 12 caracteres')
        .trim('No debe dejar campos en blanco')
        .strict(true)
        .test('test-name','Rut inválido', (value)=>checkRut(value))
    ,
    nom_usu:yup
      .string()
      .required('ingrese un rut valido para el responsable'),

       
}).required('Campo Requerido');


const formik = useFormik({
    initialValues: { 
        bdp_obs: '',
        bdp_user:userCrea,
        rut_usu:'',
        nom_usu:'',
        bpd_causa:'',
        id,
       
    },
    validationSchema: validaciones,
    enableReinitialize: true,
    onSubmit: (datos) => {
        setData(datos)
        setAbrirDialogAct(true)
    }       
});

const actualizarRutResponsable = (rutTrab, nomTrab ) => {
    // Actualiza el valor en el campo rut_responsable del formulario
    formik.setFieldValue("rut_usu", prettifyRut(rutTrab))
    formik.setFieldValue("nom_usu", nomTrab)
    BuscarRut(rutTrab)
  };

  const cerrar =()=> {
    setAbrirDialog(false)
  
  }



return (
        <>

<ModalBuscarCtaCascos 
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      setSnackMensaje={setSnackMensaje}
      actualizarRutResponsable={actualizarRutResponsable}
      setRut={setRut}
      setNom={setNom}
      empresa={empresa}
      permiso={permiso}
    />  

<DialogActualiza
      abrirDialogAct={abrirDialogAct} 
      setAbrirDialogAct={setAbrirDialogAct}
      setSnackMensaje={setSnackMensaje}
      formik= {formik}
      datos={data}
      usuario={usuario}
      setAbrirDialog={setAbrirDialog}
    />

    <form onSubmit={ formik.handleSubmit }>
    <Grid container spacing={1} mt={1} rowSpacing={1}>
    <Grid item md={3} xs={12}>
    <TextField
      name="rut_usu"
      label="Rut responsable"
      size="small"
      fullWidth
      autoComplete="off"
      value={formik.values.rut_usu}
      InputProps={{
        readOnly: true,
        disabled: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              color="primary"
              aria-label="Buscar Rut"
              onClick={() => {
               /* if (formik.values.rut_usu.length > 0) {
                  setActivaSnack(true);
                  setTrut('1');
                  BuscarRut(formik.values.rut_usu);
                } else {
                    setAbrirModal(true)
                } */
                setAbrirModal(true)
              }}
            >
               <PersonSearchIcon />
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
    
    />
    </Grid>

    <Grid item md={5} xs={12}>
  
    <TextField
      fullWidth
      size="small"
      autoComplete="off"
      name="nom_usu"
      label="Nombre"
      value={formik.values.nom_usu}
      onChange={formik.handleChange}
      error={formik.touched.nom_usu && Boolean(formik.errors.nom_usu)}
      helperText={formik.touched.nom_usu && formik.errors.nom_usu}
      InputProps={{
        readOnly: true,
        disabled: true,
      }}
      onBlur={(e) => {
        formik.handleBlur(e);
      }}
    />
</Grid>

    <Grid item md={4} xs={12}>
        <FormControl
            fullWidth
            size="small"
            error={formik.touched.bpd_causa && Boolean(formik.errors.bpd_causa)}
        >
            <InputLabel id="lbl_causa">Causal del retiro</InputLabel>
            <Select
                name="bpd_causa"
                label="Causal del retiro"
                labelId="lbl_causa"
                value={formik.values.bpd_causa}
                onBlur={(e) => {
                    formik.handleBlur(e);
                }}
                onChange={(e) => {
                    formik.setFieldValue('bpd_causa', e.target.value);
                }}
            >
            {
            isLoadingDataCausal ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                :
                DataCausal.data.result.map(cau => (
                <MenuItem key={cau.id} value={cau.id} >
                    {cau.bdp_causal}
                </MenuItem>
                ))
            }
            </Select>
            <FormHelperText>{formik.touched.bpd_causa && formik.errors.bpd_causa}</FormHelperText>
        </FormControl>
    </Grid> 

    <Grid item md={12} xs={12}>
        <TextField
            fullWidth
            size="small"
            autoComplete="off"
            multiline
            rows={2}
            name="bdp_obs"
            label="Observación"
            value={formik.values.bdp_obs}
            onChange={formik.handleChange}
            error={formik.touched.bdp_obs && Boolean(formik.errors.bdp_obs)}
            helperText={formik.touched.bdp_obs && formik.errors.bdp_obs}
            onBlur={(e) => {
                formik.handleBlur(e);
            }}
        />
    </Grid>

</Grid>
<Grid container spacing={1} rowSpacing={1} columnSpacing={2} mt={1} align="right">
    <Grid item md={12} xs={12} align="right">
    <DialogActions style={{ justifyContent: 'flex-end' }}>
    <Button color="error" variant="contained" style= {{textTransform: 'none'}}onClick={()=>cerrar()} autoFocus>
            Cancelar
          </Button>
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
        </DialogActions>

    </Grid>
</Grid>

    </form>

        </>
    )

}