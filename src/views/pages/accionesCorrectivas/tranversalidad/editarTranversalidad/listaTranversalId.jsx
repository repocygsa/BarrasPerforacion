/* eslint-disable no-unused-vars */


import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import * as yup from "yup";

import { Save, Search, Send } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, DialogActions } from '@mui/material';
import { getActividad, getActividad2, getActividad3, getActividad4, getArea, getCalIncidente, getContratos, getContratosCst, getContratosEmpresa, getEmpresa, getJerarquia, getMina, getNivel, getPersona, getRiesgoCritico, getTipoIncidente } from 'helpers/gets';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from "date-fns/locale/es";

import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { checkRut, prettifyRut } from 'react-rut-formatter';
import { DialogGuardaAccion } from '../../dialogGuardaAccion';
import { SnackComponent } from 'components/theme/SnackComponent';
import { DialogComplementaTranversal } from './dialogComplementaTranversal';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { ModalBuscarCtaCascos } from '../../busquedaCuentaCascos/modalBuscarCtaCascos';




export const ListaTranversalId = ({ id, row, user, setAbrirModal,setSnackMensaje, ctto}) => {

  const medCorrectiva= row.inc_med_correctiva
  const idIncidente= row.fk_id_incidente
  const idMedida = row.id
  const jer =row.fk_jerarquia

  const cttoArr = [];  // Declara un arreglo vacío

  cttoArr[0] = ctto; 
const userCrea = user

  const [abrirDialog, setAbrirDialog] = useState(false);
  const [submiteado, setSubmiteado] = useState(false);
  const [valoresArray, setValoresArray] = useState([]);
  const [activaSnack, setActivaSnack] = useState(false)
  const [buscarDCC, setBuscarDCC] = useState(false);
  const [rutBuscar, setRutBuscar] = useState('');
  const [usuario, setUsuario] = useState('');
  const [trut, setTrut] = useState('')

  const [data, setData] = useState({})
  const [nom, setNom] = useState('')
  const [rut, setRut] = useState('')

    useEffect(() => {
        setUsuario(user.usuario)
    }, []) 
 


    const queryClient = useQueryClient();

    const {
        data: DataJer, 
        isLoading:isLoadingDataJer
    } = useQuery(['QueryJer'], 
        ()=>getJerarquia()
    );

    const {
      data: DataCst, 
      isLoading:isLoadingDataCst
  } = useQuery(['QueryCst', user], 
      ()=>getContratosCst(user)
  );

    const noIngreso = (e) => {
        e.preventDefault();
    };

const BuscarRut = (rut) => {
    setRutBuscar(rut);
   setBuscarDCC(true)  
}    



    const validaciones = yup.object().shape({
      fk_jerarquia: yup
      .string()
      .required('Seleccione una jerarquia')
      ,

    fec_cierre: yup
    .date('Fecha invalida')
    .nullable('ingrese fecha')
    .required('Debe seleccionar una fecha')
   // .max(moment().endOf('day'), 'La fecha del incidente no puede ser posterior a la fecha actual')
    ,


   
    rut_usu: yup
    .string()
    .required('Ingrese un rut valido')
    .max(12, 'Máximo de 12 caracteres')
    .trim()
    .strict(true)
    .test('validar-rut', 'Rut inválido', (value) => checkRut(value)),
  
  nom_usu: yup
    .string()
    .required('Ingrese un rut válido para el responsable'),
  

     
       
    }).required('Campo Requerido');


    const formik = useFormik({
        initialValues: {
            rut_usu: '',
            fec_cierre: null,
            nom_usu:'',
            fk_jerarquia:jer,
            contratos_cst:cttoArr,
            tx_medidaCorr:medCorrectiva,
            id_incidente: idIncidente,
            id_medida: idMedida,
            usuario:userCrea,
            medidaCorrDesc:medCorrectiva,




        },
        validationSchema: validaciones,
        enableReinitialize: true,
        onSubmit: (datos) => {
          
          setData(datos)
    
          setAbrirDialog(true)
           
          }
          
    });
 
    const {
        isLoading:isLoadingUsuario
    } = useQuery(['DatosPersona', rutBuscar], 
        ()=>getPersona(rutBuscar), {
            onSuccess: (usuario) => {
                if(usuario.data.result.length === 0  ){
                    setSnackMensaje({
                        open:true,
                        mensaje:'Trabajador no encontrado',
                        estado:'error'
                    });
                    if(trut === '1'){
                        formik.setFieldValue('nom_usu', '');
                    }else if(trut ==='2'){
                        formik.setFieldValue('nom_usu_resp', '');
                    }
                   
                  
 
                    setBuscarDCC(false);

                }else{
                    setSnackMensaje({
                        open:true,
                        mensaje:'Trabajador encontrado',
                        estado:'success'
                    });
   
                        formik.setFieldValue('nom_usu', usuario.data.result[0].Nombre);
                   
                   
                
                    setBuscarDCC(false);
                }
            },
            enabled: buscarDCC
        }
    );

    const [abrirModalP, setAbrirModalP] = useState(false);

    const actualizarRutResponsable = (rutTrab, nomTrab ) => {
     // Actualiza el valor en el campo rut_responsable del formulario
     formik.setFieldValue("rut_usu", prettifyRut(rutTrab))
     BuscarRut(rutTrab)
   };

    return (
        <>
  <DialogComplementaTranversal
      abrirDialog={abrirDialog} 
      setAbrirDialog={setAbrirDialog}
      setSnackMensaje={setSnackMensaje}
      formik= {formik}
      datos={data}
      submiteado={submiteado}
      setSubmiteado={setSubmiteado}
      usuario={user}
      setModalPrin={setAbrirModal}
    
    />

<ModalBuscarCtaCascos 
      abrirModal={abrirModalP} 
      setAbrirModal={setAbrirModalP}
      setSnackMensaje={setSnackMensaje}
      actualizarRutResponsable={actualizarRutResponsable}
      setRut={setRut}
      setNom={setNom}
    />  


    
  <form onSubmit={ formik.handleSubmit }>
      <Grid container spacing={1} mt={1} rowSpacing={1}>
        <Grid item md={2} xs={12}>
          <TextField
            name="rut_usu"
            label="Responsable"
            size="small"
            fullWidth
            autoComplete="off"
            value={formik.values.rut_usu}
            InputProps={{
            /*  endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    aria-label="Buscar Rut"
                    onClick={() => {
                      if (formik.values.rut_usu.length > 0) {
                        setActivaSnack(true);
                        setTrut('1');
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
              ), */

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
                      setAbrirModalP(true)
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

      <Grid item md={4} xs={12}>

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
      <Grid item md={3} xs={12}>
        <FormControl fullWidth>
            <LocalizationProvider 
                dateAdapter={AdapterDateFns} 
                adapterLocale={esLocale}
            >
                <DatePicker
                    label="Fecha cierre"
                    name="fec_cierre"
                    value={formik.values.fec_cierre}
                   
                    autocomplete="off"
                    onChange={(fecha) => {
                        formik.setFieldValue("fec_cierre",fecha)
                        
                    }}
                    InputProps={{
                        autoComplete: 'off', 
                      }}
                    renderInput={(params) =>{
                        params.inputProps.placeholder='día/mes/año';
                        return(
                        <TextField 
                            size="small"
                            {...params} 
                            error={formik.touched.fec_cierre && Boolean(formik.errors.fec_cierre)}
                            helperText={formik.touched.fec_cierre && formik.errors.fec_cierre}
                            onBlur={formik.handleBlur}
                            onKeyDown={noIngreso}
                        />
                        )
                    }
                    } 
                />
            </LocalizationProvider>
        </FormControl>
    </Grid>
{/* 
    <Grid item md={3} xs={12}>
                    <FormControl
                        fullWidth
                        size="small"
                        error={formik.touched.contratos_cst && Boolean(formik.errors.contratos_cst)}
                        InputProps={{
                          readOnly: true,
                          disabled: true,
                      }}
                    >
                        <InputLabel id="lbl_contratos_cst">Contratos cst</InputLabel>
                        <Select

                            multiple
                            name="contratos_cst"
                            label="Contratos cst"
                            labelId="lbl_contratos_cst"
                            value={formik.values.contratos_cst}
                           
                            onBlur={(e) => {
                                formik.handleBlur(e);
                            }}
                            onChange={(e) => {
                                formik.setFieldValue('contratos_cst', e.target.value);
                            }}
                        >
                        {
                        isLoadingDataCst ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            :
                            DataCst.data.result && DataCst.data.result.map((cst) => (
                            <MenuItem key={cst.id} value={cst.fk_cst_ctto} >
                                {cst.fk_cst_ctto}
                            </MenuItem>
                            ))
                        }
                        </Select>
                        <FormHelperText>{formik.touched.contratos_cst && formik.errors.contratos_cst}</FormHelperText>
                    </FormControl>
                </Grid> 
*/}
    <Grid item md={3} xs={12}>
        <FormControl
            fullWidth
            size="small"
            error={formik.touched.fk_jerarquia && Boolean(formik.errors.fk_jerarquia)}
        >
            <InputLabel id="lbl_emp_fk_jerarquia">Jerarquia</InputLabel>
            <Select
                name="fk_jerarquia"
                label="Jerarquia"
                labelId="lbl_emp_fk_jerarquia"
                value={formik.values.fk_jerarquia}
                onBlur={(e) => {
                    formik.handleBlur(e);
                }}
                onChange={(e) => {
                    formik.setFieldValue('fk_jerarquia', e.target.value);
                }}
                disabled
            >
            {
            isLoadingDataJer ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                :
                DataJer.data.result && DataJer.data.result.filter(emps => emps.id !== '0').map(emp => (
                        <MenuItem key={emp.id} value={emp.id} >
                            {emp.nom}
                        </MenuItem>
                      )
                  )}

            </Select>
            <FormHelperText>{formik.touched.fk_jerarquia && formik.errors.fk_jerarquia}</FormHelperText>
        </FormControl>
    </Grid> 

</Grid>

<Grid container spacing={1} rowSpacing={1} columnSpacing={2} mt={1} align="right">
<Grid item md={12} xs={12} align="right">


<DialogActions style={{ justifyContent: 'flex-end' }}>
<Button color="error" variant="contained"style= {{textTransform: 'none'}} autoFocus onClick={()=>setAbrirModal(false)}>
                   Cerrar
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



