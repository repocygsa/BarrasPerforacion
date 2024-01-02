/* eslint-disable no-unused-vars */


import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import * as yup from "yup";

import { Save, Search } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getActividad, getActividad2, getActividad3, getActividad4, getArea, getCalIncidente, getContratos, getContratosEmpresa, getEmpresa, getJerarquia, getMina, getNivel, getPersona, getRiesgoCritico, getTipoIncidente } from 'helpers/gets';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from "date-fns/locale/es";

import { DateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { checkRut, prettifyRut } from 'react-rut-formatter';
import { DialogGuardaAccion } from '../../dialogGuardaAccion';





export const ListaTranversalId = ({ setSnackMensaje, user}) => {


  const [abrirDialog, setAbrirDialog] = useState(false);
 
  const [submiteado, setSubmiteado] = useState(false);
  const [valManual, setValManual] = useState(0)
const [valoresArray, setValoresArray] = useState([]);
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
    const [userCrea, setUserCrea] = useState(user)
    
    const [data, setData] = useState({})
    const [validationState, setValidationState] = useState(null);
   
    const [tipoIncidenteDesc, setTipoIncidenteDesc] = useState('');
    const [empreDesc, setEmpreDesc] = useState('')

    const [calificaIncidenteDesc, setCalificaIncidenteDesc] = useState('')

    const [rcDesc, setRcDesc] = useState('');

    const [minaIncidenteDesc, setMinaIncidenteDesc] = useState('')
    const [areaIncidenteDesc, setAreaIncidenteDesc] = useState('')
    const [nivelIncidenteDesc, setNivelIncidenteDesc] = useState('')

    useEffect(() => {
        const usu = localStorage.getItem('rut_session');
        setUsuario(usu);
    }, [])

    const queryClient = useQueryClient();

    const {
      data: DataEmpCtto, 
      isLoading:isLoadingEmpCtto
    } = useQuery(['getContratosEmpresa'], 
      ()=>getContratosEmpresa()
    );

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
        data: DataTipoIncidente, 
        isLoading:isLoadingTipoIncidente
    } = useQuery(['QueryTipIncidente'], 
        ()=>getTipoIncidente()
    );
    const {
        data: DataCalIncidente, 
        isLoading:isLoadingCalIncidente
    } = useQuery(['QueryCalIncidente'], 
        ()=>getCalIncidente()
    );
  
    const {
        data: DataActividad, 
        isLoading:isLoadingDataActividad
    } = useQuery(['QueryActividad'], 
        ()=>getActividad()
    );

    const {
        data: DataJer, 
        isLoading:isLoadingDataJer
    } = useQuery(['QueryJer'], 
        ()=>getJerarquia()
    );

    const {
        data: DataRC, 
        isLoading:isLoadingDataRc
    } = useQuery(['QueryRc'], 
        ()=>getRiesgoCritico()
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
/*
    acc_corr: yup
    .string()
    .required('Debe ingresar acciones correctivas')
    .trim('No debe contener espacios')
    ,

        nom_usu_resp:yup
    .string()
    .required('ingrese un rut valido para el responsable')
    ,

*/
    incidente: yup
    .string()
    .required('Debe ingresar un incidente')
    .trim('No debe contener espacios')
,
contratos: yup
.array()
.min(1, 'Debe seleccionar al menos un contrato de trabajo')
.required('Debe seleccionar contrato de trabajo')
,


    acc_Actividad: yup
        .string()
        .required('Debe seleccionar una actividad')
        ,
    
        cal_inc: yup
        .string()
        .required('Debe seleccionar una calificación')
        ,

        tipo_incidente: yup
        .string()
        .required('Debe seleccionar un tipo de incidente')
        ,

        inc_aprendizaje:yup
        .string()
        .required('Ingrese un aprendizaje')
        ,
        inc_causas_principales:yup
        .string()
        .required('Ingrese una causa principal del incidente')
        ,
        inc_consecuencias:yup
        .string()
        .required('Ingrese una consecuencia')
        ,


        fk_rc: yup
        .string()
        .required('Debe seleccionar un riesgo crítico')
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
    .nullable('ingrese fecha')
    .required('Debe seleccionar una fecha')
    .max(moment().endOf('day'), 'La fecha del incidente no puede ser posterior a la fecha actual')
    ,

/*
    fec_cierr: yup
    .date('Fecha invalida')
    .required('Debe seleccionar una fecha')
    .when('fec_ins', (fecIns, schema) => schema.min(yup.ref('fec_ins'), 'La fecha de cierre debe ser mayor que la fecha del incidente')),
*/
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

      fil_tab: yup
      .mixed()
      .required('Debe seleccionar un archivo')
    /*  .test('maxarchivos', 'Máximo 1 archivo', (values) => {
          let respuesta = '';
          if (values !== null) {
              respuesta = values.length <= 1;
          }
          return respuesta;
      }) */
  ,
      
/*
    rut_usu_resp: yup
    .string()
    .required('Ingrese un responsable')
    .max(12, 'Máximo de 12 caracteres')
    .trim('No debe dejar campos en blanco')
    .strict(true)
    .test('test-name','Rut inválido', (value)=>checkRut(value))
    ,
  */
       
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
            fec_ins: null,
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
            fil_tab:'',
            cal_inc:'',
            tipo_incidente:'',
            inc_aprendizaje:'',
            tipoIncidenteDesc:'',
            calificaIncidenteDesc:'',
            minaIncidenteDesc:'',
            areaIncidenteDesc:'',
            nivelIncidenteDesc:'',
            empreDesc:'',
            fil_tab_img:'',
            inc_consecuencias:'',
            inc_causas_principales:'',
            fk_rc:'',
            rcDesc:'',
            user:userCrea,
            contratos:[],
          

            

        },
        validationSchema: validaciones,
        enableReinitialize: true,
        onSubmit: (datos, { setSubmitting }) => {
            setSubmitting(true);
          
            const datosArr = {
              valoresArray,
              datos,
            };

            setData(datosArr);
      
         //   setAbrirDialog(true);

         




            // Maneja el submit del formulario hijo


          
         
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
      usuario={usuario}
    
    />

    
     
        <form onSubmit={ formik.handleSubmit }>

  

            <Grid container spacing={1} mt={1} rowSpacing={1}>
           







                


                <Grid item md={3} xs={12}>

    <TextField
      name="rut_usu"
      label="Responsable"
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
      
    />
  
</Grid>

<Grid item md={6} xs={12}>

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
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                        <DateTimePicker
                            name="fec_ins"
                            autoComplete='off'
                            label="Fecha cierre"
                            value={formik.values.fec_ins}
                            onChange={(newValue) => {
                            formik.setFieldValue('fec_ins',newValue);
                            
                           // setFechaHora(moment(newValue).format('DD-MM-YYYY HH:mm'))
                           
                            }
                            }
                            renderInput={(params) => (
                            <TextField {...params}
                            size='small'
                            error ={formik.touched.fec_ins && Boolean(formik.errors.fec_ins)}
                            helperText={formik.touched.fec_ins && formik.errors.fec_ins} 
                            onBlur={formik.handleBlur}
                            onKeyDown={noIngreso}
                            fullWidth
                            />
                            )}
                        />
                        </LocalizationProvider>
                        </Grid>

 
           



 

 

         
            
            
                 


                <Grid item md={12} xs={3}>
                    <TextField
                        fullWidth
                        size="small"
                        autoComplete="off"
                        name="inc_aprendizaje"
                        label="Observación"
                        multiline
                        rows={3}
                       
                        value={formik.values.inc_aprendizaje}
                        onChange={formik.handleChange}
                        error={formik.touched.inc_aprendizaje && Boolean(formik.errors.inc_aprendizaje)}
                        helperText={formik.touched.inc_aprendizaje && formik.errors.inc_aprendizaje}
                        onBlur={(e) => {
                            formik.handleBlur(e);
                        }}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
          <FormControl fullWidth size="small"  error={formik.touched.contratos && Boolean(formik.errors.contratos)}>
            <InputLabel id='contratos'>Contratos</InputLabel>
            <Select
              labelId='contratos'
              label="Contratos"
              name='contratos'
              multiple
              value={formik.values.contratos}
              onBlur={(e) => {
                formik.handleBlur(e);
            }}
            onChange={(e) => {
                formik.setFieldValue('contratos', e.target.value);
            }}
        >
            
              {isLoadingEmpCtto ? (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              ) : (
                DataEmpCtto.data.result &&
                DataEmpCtto.data.result.map((min, mapIndex) => (
                  <MenuItem key={`item-${min.contrato}-${mapIndex}`} value={min.Contrato}>
                    {min.resultConcat}
                  </MenuItem>
                ))
              )}
            </Select>
            <FormHelperText>{formik.touched.contratos && formik.errors.contratos}</FormHelperText>
          </FormControl>

        </Grid>
        <Grid item md={4} xs={12}>
          <FormControl fullWidth size="small"  error={formik.touched.contratos && Boolean(formik.errors.contratos)}>
            <InputLabel id='contratos'>Jerarquia</InputLabel>
            <Select
              labelId='contratos'
              label="Contratos"
              name='Jerarquia'
              multiple
              value={formik.values.contratos}
              onBlur={(e) => {
                formik.handleBlur(e);
            }}
            onChange={(e) => {
                formik.setFieldValue('contratos', e.target.value);
            }}
        >
            
              {isLoadingEmpCtto ? (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              ) : (
                DataEmpCtto.data.result &&
                DataEmpCtto.data.result.map((min, mapIndex) => (
                  <MenuItem key={`item-${min.contrato}-${mapIndex}`} value={min.Contrato}>
                    {min.resultConcat}
                  </MenuItem>
                ))
              )}
            </Select>
            <FormHelperText>{formik.touched.contratos && formik.errors.contratos}</FormHelperText>
          </FormControl>

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



