

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import * as yup from "yup";

import { Save, Search } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Card, CardContent, CircularProgress, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

import { getActividad, getActividad2, getActividad3, getActividad4, getArea, getContratos, getEmpresa, getMina, getNivel, getPersona } from 'helpers/gets';


import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from "date-fns/locale/es";

import Checkbox from '@mui/material/Checkbox';
import { checkRut, prettifyRut } from 'react-rut-formatter';
import { DialogGuardaAccion } from './dialogGuardaAccion';
import { SnackComponent } from 'components/theme/SnackComponent';



export const FormAcciones = ({  setModalPrin, setSnackMensaje}) => {

  const [helperText, setHelperText] = useState('');
  const [abrirDialog, setAbrirDialog] = useState(false);
  const [dataSolicitud, setDataSolicitud] = useState('');
  const [submiteado, setSubmiteado] = useState(false);

  const [activaSnack, setActivaSnack] = useState(false)
  const [buscarDCC, setBuscarDCC] = useState(false);
  const [rutBuscar, setRutBuscar] = useState('');
    const [empFil, setEmpFil] = useState('');
    const [minFil, setMinFil] = useState('');
    const [texto, setTexto] = useState('');
    const [usuario, setUsuario] = useState('');
    const [trut, setTrut] = useState('')
    const [idAct1, setIdAct1] = useState('')
    const [idAct2, setIdAct2] = useState('')
    const [idAct3, setIdAct3] = useState('')
    const [data, setData] = useState({})

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const usu = localStorage.getItem('rut_session');
        setUsuario(usu);
    }, [])

    const queryClient = useQueryClient();


    const {
        data: DataMina, 
        isLoading:isLoadingDataMina
    } = useQuery(['QueryMina'], 
        ()=>getMina()
    );

    const {
        data: DataArea, 
        isLoading: isLoadingDataArea
    } = useQuery(['QueryArea', minFil], 
        ()=>getArea(minFil)
    );

    const {
        data: DataNivel, 
        isLoading:isLoadingDataNivel
    } = useQuery(['QueryNivel'], 
        ()=>getNivel()
    );

    const {
        data: DataActividad, 
        isLoading:isLoadingDataActividad
    } = useQuery(['QueryActividad'], 
        ()=>getActividad()
    );

    const {
        data: DataActividad2, 
        isLoading:isLoadingDataActividad2
    } = useQuery(['QueryActividad2',idAct1], 
        ()=>getActividad2(idAct1)
    );

    const {
        data: DataActividad3, 
        isLoading:isLoadingDataActividad3
    } = useQuery(['QueryActividad3', idAct2], 
        ()=>getActividad3(idAct2)
    );

    const {
        data: DataActividad4, 
        isLoading:isLoadingDataActividad4
    } = useQuery(['QueryActividad4', idAct3], 
        ()=>getActividad4(idAct3)
    );


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
    
    
    

    const noIngreso = (e) => {
        e.preventDefault();
    };
/* let textoC
if(!isLoadingDataTipo){
    const selectedData =  DataTipo.data.result.find((item) => item.id === selectedIndex);                   
    const selectedLabel = selectedData ? selectedData.des_tipo_insfraestructura : '';
    const regex = /\(([^)]+)\)/;
    const matches = selectedLabel.match(regex);  
    const extractedText=matches && matches[1] ? matches[1] : '';            
 textoC=extractedText

    console.log(textoC)
} */
  
const preguntar =()=> {
  setModalPrin(false)
}

const BuscarRut = (rut) => {
    setRutBuscar(rut);
   setBuscarDCC(true)  
}    


    const validaciones = yup.object().shape({
        emp_inf: yup
        .string()
        .required('Debe seleccionar una empresa')
    ,
    ctt_inf: yup
        .string()
        .required('Debe seleccionar un contrato')
    ,
 
    min_inf: yup
        .string()
        .required('Debe seleccionar la mina')
    ,
    are_inf: yup
        .string()
        .required('Debe seleccionar el área')
    ,
    niv_inf: yup
        .string()
        .required('Debe seleccionar el nivel')
    ,
    pos_inf: yup
        .string()
        .required('Debe ingresar un lugar')
        .trim('No debe contener espacios')
    ,

    acc_corr: yup
    .string()
    .required('Debe ingresar acciones correctivas')
    .trim('No debe contener espacios')
    ,

    incidente: yup
    .string()
    .required('Debe ingresar un incidente')
    .trim('No debe contener espacios')
,

    nom_usu_resp:yup
    .string()
    .required('ingrese un rut valido para el responsable')
    ,


    acc_Actividad: yup
        .string()
        .required('Debe seleccionar una actividad')
        ,
        
    acc_Actividad_2: yup
    .string()
    .required('Debe seleccionar una Sub-Actividad nivel 1')
    ,
      
    acc_Actividad_3: yup
      .string()
      .required('Debe seleccionar una Sub-Actividad nivel 2')
    ,
    
    acc_Actividad_4: yup
    .string()
    .required('Debe seleccionar una Sub-Actividad nivel 3')
    ,

    fec_ins: yup
    .date('Fecha invalida')
    .required('Debe seleccionar una fecha'),

    fec_cierr: yup
    .date('Fecha invalida')
    .required('Debe seleccionar una fecha')
    .when('fec_ins', (fecIns, schema) => schema.min(yup.ref('fec_ins'), 'La fecha de cierre debe ser mayor que la fecha del incidente')),

    isComisionInvestigadora: yup.boolean(),
    rut_usu: yup
      .string()
      .when('isComisionInvestigadora', {
        is: true,
        then: yup
          .string()
          .required('Ingrese un líder')
          .max(12, 'Máximo de 12 caracteres')
          .trim('No debe dejar campos en blanco')
          .strict(true)
          .test('test-name', 'Rut inválido', (value) => checkRut(value)),
        otherwise: yup.string(), // Sin reglas de validación si isComisionInvestigadora es false
      }),
  
    nom_usu: yup
      .string()
      .when('isComisionInvestigadora', {
        is: true,
        then: yup.string().required('Ingrese un rut válido para el responsable'),
        otherwise: yup.string(), // Sin reglas de validación si isComisionInvestigadora es false
      }),

    rut_usu_resp: yup
    .string()
    .required('Ingrese un responsable')
    .max(12, 'Máximo de 12 caracteres')
    .trim('No debe dejar campos en blanco')
    .strict(true)
    .test('test-name','Rut inválido', (value)=>checkRut(value))
    ,
  
       
    }).required('Campo Requerido');


    const formik = useFormik({
        initialValues: {
            rut_usu: '',
            emp_inf: '',
            ctt_inf: '',
            tip_inf: '',
            min_inf: '',
            are_inf: '',
            niv_inf: '',
            pos_inf: '',
            tip_seg: '',
            fec_ins: '',
            iel_identificador:texto,
            fec_cierr:'',
            acc_corr:'',
            acc_Actividad:'',
            acc_Actividad_2:'',
            acc_Actividad_3:'',
            acc_Actividad_4:'',
            nom_usu:'',
            rut_usu_resp:'',
            incidente:'',
            nom_usu_resp:'',
            isComisionInvestigadora: false,
        },
        validationSchema: validaciones,
        enableReinitialize: true,
        onSubmit: (datos) => {
         console.log(datos)
        setData(datos)
            setAbrirDialog(true);
            // formik.resetForm();
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
                        mensaje:'Usuario no registrado',
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
                        mensaje:'Datos encontrados',
                        estado:'success'
                    });
                    if(trut === '1'){
                        formik.setFieldValue('nom_usu', usuario.data.result[0].Nombre);
                    }else if(trut ==='2'){
                        formik.setFieldValue('nom_usu_resp', usuario.data.result[0].Nombre);
                    }
                   
                
                    setBuscarDCC(false);
                }
            },
            enabled: buscarDCC
        }
    );

    return (
        <>
  <DialogGuardaAccion
      abrirDialog={abrirDialog} 
      setAbrirDialog={setAbrirDialog}
      setSnackMensaje={setSnackMensaje}
      formik= {formik}
      datos={data}
      submiteado={submiteado}
      setSubmiteado={setSubmiteado}
      setModalPrin={setModalPrin}
      usuario={usuario}
    />
     
        <form onSubmit={ formik.handleSubmit }>

  

            <Grid container spacing={1} mt={1} rowSpacing={1}>
            <Grid item md={2} xs={12}>
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
                <Grid item md={2} xs={12}>
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
                <Grid item md={2} xs={12}>
                    <FormControl
                        fullWidth
                        size="small"
                        error={formik.touched.min_inf && Boolean(formik.errors.min_inf)}
                    >
                        <InputLabel id="lbl_min_inf">Mina</InputLabel>
                        <Select
                            name="min_inf"
                            label="Mina"
                            labelId="lbl_min_inf"
                            value={formik.values.min_inf}
                            onBlur={(e) => {
                                formik.handleBlur(e);
                            }}
                            onChange={(e) => {
                                formik.setFieldValue('min_inf', e.target.value);
                                formik.setFieldValue('are_inf', '');
                                setMinFil(e.target.value);
                            }}
                        >
                        {
                        isLoadingDataMina ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            :
                            DataMina.data.result && DataMina.data.result.map((min) => (
                            <MenuItem key={min.id} value={min.id} >
                                {min.nom}
                            </MenuItem>
                            ))
                        }
                        </Select>
                        <FormHelperText>{formik.touched.min_inf && formik.errors.min_inf}</FormHelperText>
                    </FormControl>
                </Grid> 
                <Grid item md={2} xs={12}>
                    <FormControl
                        fullWidth
                        size="small"
                        error={formik.touched.are_inf && Boolean(formik.errors.are_inf)}
                    >
                        <InputLabel id="lbl_are_inf">Área</InputLabel>
                        <Select
                            name="are_inf"
                            label="Área"
                            labelId="lbl_are_inf"
                            value={formik.values.are_inf}
                            onBlur={(e) => {
                                formik.handleBlur(e);
                            }}
                            onChange={(e) => {
                                formik.setFieldValue('are_inf', e.target.value);
                            }}
                        >
                        {
                        isLoadingDataArea ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            :
                            DataArea.data.result && DataArea.data.result.map((are) => (
                            <MenuItem key={are.id} value={are.id} >
                                {are.nom}
                            </MenuItem>
                            ))
                        }
                        </Select>
                        <FormHelperText>{formik.touched.are_inf && formik.errors.are_inf}</FormHelperText>
                    </FormControl>
                </Grid> 
                <Grid item md={2} xs={12}>
                    <FormControl
                        fullWidth
                        size="small"
                        error={formik.touched.niv_inf && Boolean(formik.errors.niv_inf)}
                    >
                        <InputLabel id="lbl_niv_inf">Nivel</InputLabel>
                        <Select
                            name="niv_inf"
                            label="Nivel"
                            labelId="lbl_niv_inf"
                            value={formik.values.niv_inf}
                            onBlur={(e) => {
                                formik.handleBlur(e);
                            }}
                            onChange={(e) => {
                                formik.setFieldValue('niv_inf', e.target.value);
                            }}
                        >
                        {
                        isLoadingDataNivel ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            :
                            DataNivel.data.result && DataNivel.data.result.map((niv) => (
                            <MenuItem key={niv.id} value={niv.id} >
                                {niv.nom}
                            </MenuItem>
                            ))
                        }
                        </Select>
                        <FormHelperText>{formik.touched.niv_inf && formik.errors.niv_inf}</FormHelperText>
                    </FormControl>
                </Grid> 
             
                <Grid item md={2} xs={12}>
                    <TextField
                        fullWidth
                        size="small"
                        autoComplete="off"
                        name="pos_inf"
                        label="Lugar"
                        value={formik.values.pos_inf}
                        onChange={formik.handleChange}
                        error={formik.touched.pos_inf && Boolean(formik.errors.pos_inf)}
                        helperText={formik.touched.pos_inf && formik.errors.pos_inf}
                        onBlur={(e) => {
                            formik.handleBlur(e);
                        }}
                    />
                </Grid>
                <Grid item md={2} xs={12}>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="isComisionInvestigadora"
                        color="primary"
                        checked={formik.values.isComisionInvestigadora}
                        onChange={(e) => {
                        formik.handleChange(e)
                        
                       
                        if (!e.target.checked) {
                            formik.setFieldValue("rut_usu", ''); 
                            formik.setFieldValue("nom_usu", ''); 
                           formik.validateForm(); // Vuelve a validar el formulario
                        }
                        
                        }}

                    />
                    }
                    label="Comisión Investigadora"
                />
                </Grid>

                <Grid item md={2} xs={12}>
  {formik.values.isComisionInvestigadora && (
    <TextField
      name="rut_usu"
      label="Líder comisión"
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
  )}
</Grid>

<Grid item md={2} xs={12}>
  {formik.values.isComisionInvestigadora && (
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
  )}
</Grid>


                <Grid item md={3} xs={12}>
                    <FormControl fullWidth>
                        <LocalizationProvider 
                            dateAdapter={AdapterDateFns} 
                            adapterLocale={esLocale}
                        >
                            <DatePicker
                                label="Fecha ocurrencia"
                                name="fec_ins"
                                value={formik.values.fec_ins}
                                maxDate = {new Date()}
                                autocomplete="off"
                                onChange={(fecha) => {
                                    formik.setFieldValue("fec_ins",fecha)
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
                                        error={formik.touched.fec_ins && Boolean(formik.errors.fec_ins)}
                                        helperText={formik.touched.fec_ins && formik.errors.fec_ins}
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
                <Grid item md={3} xs={12}>
                    <FormControl fullWidth>
                        <LocalizationProvider 
                            dateAdapter={AdapterDateFns} 
                            adapterLocale={esLocale}
                        >
                            <DatePicker
                                label="Fecha cierre"
                                name="fec_cierr"
                                value={formik.values.fec_cierr}
                                autocomplete="off"
                                onChange={(fecha) => {
                                    formik.setFieldValue("fec_cierr",fecha)
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
                                        error={formik.touched.fec_cierr && Boolean(formik.errors.fec_cierr)}
                                        helperText={formik.touched.fec_cierr && formik.errors.fec_cierr}
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
                </Grid>
            <Grid container spacing={1} rowSpacing={1} mt={1}>

                <Grid item md={3} xs={12}>
                    <FormControl
                        fullWidth
                        size="small"
                        error={formik.touched.acc_Actividad && Boolean(formik.errors.acc_Actividad)}
                    >
                        <InputLabel id="lbl_actividad">Actividad</InputLabel>
                        <Select
                            
                            name="acc_Actividad"
                            label="Actividad 1"
                            labelId="lbl_actividad_1"
                            value={formik.values.acc_Actividad}
                            onBlur={(e) => {
                                formik.handleBlur(e);
                            }}
                            onChange={(e) => {
                                formik.setFieldValue('acc_Actividad', e.target.value);
                                formik.setFieldValue('acc_Actividad_2', '')
                                formik.setFieldValue('acc_Actividad_3', '')
                                formik.setFieldValue('acc_Actividad_4', '')
                                setIdAct1( e.target.value)
                                setIdAct2('')
                                setIdAct3('')
                                
                            }}
                        >
                        {
                        isLoadingDataActividad ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            :
                            DataActividad.data.result && DataActividad.data.result.map((act) => (
                            <MenuItem key={act.id} value={act.id} >
                                {act.nom}
                            </MenuItem>
                            ))
                        }
                        </Select>
                        <FormHelperText>{formik.touched.acc_Actividad && formik.errors.acc_Actividad}</FormHelperText>
                    </FormControl>
                </Grid> 

                <Grid item md={3} xs={12}>
                    <FormControl
                        fullWidth
                        size="small"
                        error={formik.touched.acc_Actividad_2 && Boolean(formik.errors.acc_Actividad_2)}
                    >
                        <InputLabel id="lbl_actividad">Sub-Actividad nivel 1</InputLabel>
                        <Select
                            
                            name="acc_Actividad_2"
                            label="Sub-Actividad nivel 1"
                            labelId="lbl_actividad_2"
                            value={formik.values.acc_Actividad_2}
                            onBlur={(e) => {
                                formik.handleBlur(e);
                            }}
                            onChange={(e) => {
                                formik.setFieldValue('acc_Actividad_2', e.target.value);
                                setIdAct2(e.target.value)
                                setIdAct3('')
                                formik.setFieldValue('acc_Actividad_3', '')
                                formik.setFieldValue('acc_Actividad_4', '')
                            }}
                        >
                        {
                        isLoadingDataActividad2 ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            :
                            DataActividad2.data.result && DataActividad2.data.result.map((act) => (
                            <MenuItem key={act.id} value={act.id} >
                                {act.nom}
                            </MenuItem>
                            ))
                        }
                        </Select>
                        <FormHelperText>{formik.touched.acc_Actividad_2 && formik.errors.acc_Actividad_2}</FormHelperText>
                    </FormControl>
                </Grid> 

                <Grid item md={3} xs={12}>
                    <FormControl
                        fullWidth
                        size="small"
                        error={formik.touched.acc_Actividad_3 && Boolean(formik.errors.acc_Actividad_3)}
                    >
                        <InputLabel id="lbl_actividad_3">Sub-Actividad nivel 2</InputLabel>
                        <Select
                            
                            name="acc_Actividad_3"
                            label="Sub-Actividad nivel 2"
                            labelId="lbl_actividad_3"
                            value={formik.values.acc_Actividad_3}
                            onBlur={(e) => {
                                formik.handleBlur(e);
                            }}
                            onChange={(e) => {
                                formik.setFieldValue('acc_Actividad_3', e.target.value);
                                setIdAct3( e.target.value)
                                formik.setFieldValue('acc_Actividad_4', '')
                            }}
                        >
                        {
                        isLoadingDataActividad3 ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            :
                            DataActividad3.data.result && DataActividad3.data.result.map((act) => (
                            <MenuItem key={act.id} value={act.id} >
                                {act.nom}
                            </MenuItem>
                            ))
                        }
                        </Select>
                        <FormHelperText>{formik.touched.acc_Actividad_3 && formik.errors.acc_Actividad_3}</FormHelperText>
                    </FormControl>
                </Grid> 

                <Grid item md={3} xs={12}>
                    <FormControl
                        fullWidth
                        size="small"
                        error={formik.touched.acc_Actividad_4 && Boolean(formik.errors.acc_Actividad_4)}
                    >
                        <InputLabel id="lbl_sb_actividad">Sub-Actividad nivel 3</InputLabel>
                        <Select
                            
                            name="acc_Actividad_4"
                            label="Sub-Actividad nivel 3"
                            labelId="acc_Actividad_4"
                            value={formik.values.acc_Actividad_4}
                            onBlur={(e) => {
                                formik.handleBlur(e);
                            }}
                            onChange={(e) => {
                                formik.setFieldValue('acc_Actividad_4', e.target.value);
                            }}
                        >
                        {
                        isLoadingDataActividad4 ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            :
                            DataActividad4.data.result && DataActividad4.data.result.map((act) => (
                              <MenuItem key={act.id} value={act.id} >
                                  {act.nom}
                              </MenuItem>
                            ))
                        }
                        </Select>
                        <FormHelperText>{formik.touched.acc_Actividad_4 && formik.errors.acc_Actividad_4}</FormHelperText>
                    </FormControl>
                </Grid> 

         
                   

                <Grid item md={12} xs={3}>
                    <TextField
                        fullWidth
                        size="small"
                        autoComplete="off"
                        name="incidente"
                        label="Descripción del incidente"
                        multiline
                        rows={3}
                        value={formik.values.incidente}
                        onChange={formik.handleChange}
                        error={formik.touched.incidente && Boolean(formik.errors.incidente)}
                        helperText={formik.touched.incidente && formik.errors.incidente}
                        onBlur={(e) => {
                            formik.handleBlur(e);
                        }}
                    />
                </Grid>

   

                <Grid item md={12} xs={3}>
                    <TextField
                        fullWidth
                        size="small"
                        autoComplete="off"
                        name="acc_corr"
                        label="Acciones correctivas"
                        multiline
                        rows={3}
                        value={formik.values.acc_corr}
                        onChange={formik.handleChange}
                        error={formik.touched.acc_corr && Boolean(formik.errors.acc_corr)}
                        helperText={formik.touched.acc_corr && formik.errors.acc_corr}
                        onBlur={(e) => {
                            formik.handleBlur(e);
                        }}
                    />
                </Grid>
                <Grid item md={3} xs={12}>
            <TextField
                name="rut_usu_resp"
                label="Responsable"
                size="small"
                fullWidth
                autoComplete="off"
                value={formik.values.rut_usu_resp}
                InputProps={{
                    endAdornment:                                         
                        <InputAdornment position="end">
                            <IconButton
                                color="primary"
                                aria-label="Buscar Rut"
                                onClick={() => {
                                    if (formik.values.rut_usu_resp.length > 0) {
                                        setActivaSnack(true)
                                        setTrut('2')
                                        BuscarRut(formik.values.rut_usu_resp)
                                    } else {
                                        setSnackMensaje({
                                            open: false
                                        });
                                    }   
                                }}
                            >
                                <Search />
                            </IconButton>
                        </InputAdornment>
                }}
                onChange={formik.handleChange}
                error={formik.touched.rut_usu_resp && Boolean(formik.errors.rut_usu_resp)}
                helperText={formik.touched.rut_usu_resp && formik.errors.rut_usu_resp}
                onBlur={(e) => {
                    // eslint-disable-next-line no-unused-expressions
                    checkRut(e.target.value) ? formik.setFieldValue("rut_usu_resp", prettifyRut(e.target.value)) : formik.handleBlur 
                }}
            />
        </Grid>
    
  
        <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        size="small"
                        autoComplete="off"
                        name="nom_usu_resp"
                        label="Nombre responsable"
                        value={formik.values.nom_usu_resp}
                        onChange={formik.handleChange}
                        error={formik.touched.nom_usu_resp && Boolean(formik.errors.nom_usu_resp)}
                        helperText={formik.touched.nom_usu_resp && formik.errors.nom_usu_resp}
                        InputProps={{
                            readOnly: true,
                            disabled: true,
                          }}

                        onBlur={(e) => {
                            formik.handleBlur(e);
                        }}
                    />
                </Grid>
            </Grid>



            <Grid container spacing={1} rowSpacing={1} columnSpacing={2} mt={1} align="right">
                <Grid item md={12} xs={12} align="right">
                <Button color="error" variant="contained" style= {{textTransform: 'none'}}onClick={()=>preguntar()} autoFocus>
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

                </Grid>
            </Grid>


        </form>

        </>
    )

}