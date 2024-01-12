import { Formik, Field, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  Paper,
  Box,
  InputAdornment,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
  CircularProgress,
} from '@mui/material';

import { Search } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect, forwardRef } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from "date-fns/locale/es";
import { checkRut, prettifyRut } from 'react-rut-formatter';
import { useQuery } from 'react-query';
import { getContratosEmpresa, getJerarquia, getPersona } from 'helpers/gets';

import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { ModalBuscarCtaCascos } from './busquedaCuentaCascos/modalBuscarCtaCascos';

/*
const validationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({

      rut_responsable: 
      Yup.string()
      .required('Ingrese un responsable')
      .max(12, 'Máximo de 12 caracteres')
      .trim('No debe dejar campos en blanco')
      .strict(true)
      .test('test-name','Rut inválido', (value)=>checkRut(value))
      ,

      fec_cierre: Yup.date().required('Ingrese una fecha válida').nullable('ingrese fecha'),
      acc_correctiva: Yup.string().required('Este campo es obligatorio'),
    })
  ),
}); */

const MyForm = ({ setValoresArray, setSnackMensaje, setReport, report })=> {
   const { values, errors, touched, setFieldValue } = useFormikContext();
  const [rutBuscar, setRutBuscar] = useState('');
  const [trut, setTrut] = useState('');
  const [activaSnack, setActivaSnack] = useState(false);
  const [buscarDCC, setBuscarDCC] = useState(false);
  const [jerDesc, setJerDesc] = useState('');
  const [nom, setNom] = useState('')
const [rut, setRut] = useState('')
const [ind, setInd]=useState(0)
  const {
    data: DataEmpCtto, 
    isLoading:isLoadingEmpCtto
  } = useQuery(['getContratosEmpresa'], 
    ()=>getContratosEmpresa()
  );
  const {
    data: DataJer, 
    isLoading:isLoadingDataJer
} = useQuery(['QueryJer'], 
    ()=>getJerarquia()
);
  const BuscarRut = (rut) => {
    setRutBuscar(rut);
    setBuscarDCC(true);
  };
  const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));
  const handleBuscarRut = (rut) => {
    setActivaSnack(true);
    setTrut('2');
    BuscarRut(rut);
  };

  

  const noIngreso = (e) => {
    e.preventDefault();
};
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
                setFieldValue(`items[${ind}].nom_usu_det`, '');
               
              

                setBuscarDCC(false);

            }else{
                setSnackMensaje({
                    open:true,
                    mensaje:'Trabajador encontrado',
                    estado:'success'
                });

                    setFieldValue(`items[${ind}].nom_usu_det`, usuario.data.result[0].Nombre);
                
               
            
                setBuscarDCC(false);
            }
        },
        enabled: buscarDCC
    }
);

  useEffect(() => {
    setValoresArray(values.items)
 }, [values.items])


 const [abrirModal, setAbrirModal] = useState(false);

 const actualizarRutResponsable = (rutTrab, nomTrab ) => {
  // Actualiza el valor en el campo rut_responsable del formulario
  setFieldValue(`items[${ind}].rut_responsable`, rutTrab);
 handleBuscarRut(rutTrab)
};



  return (

    <>
      <ModalBuscarCtaCascos 
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      setSnackMensaje={setSnackMensaje}
      actualizarRutResponsable={actualizarRutResponsable}
      setRut={setRut}
      setNom={setNom}
    />
    <br/>
    <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info">Ingrese las acciones correctivas correspondientes al incidente</Alert>
         
      </Stack>
      <form>
              <FieldArray name="items">

    {({ push, remove }) => (
        <>
{values.items.map((_, index) => (
    <Grid container spacing={1} mt={1} rowSpacing={1} key={index} style={{ marginTop: '16px' }}>
        <Root>
            <Divider>
            {index > 0?(
            <Fab color="error" variant="extended" size="small"  onClick={() => remove(index)}>
            <DeleteForeverIcon sx={{ mr: 1 }} />
            {`Acción correctiva numero: ${index + 1}`}
            </Fab>
            ):(
            <Fab color="info" variant="extended" size="small" enabled="false">
            
            {`Acción correctiva numero: ${index + 1}`}
            </Fab>
            )
            
        
        }
                
                
            </Divider>
        </Root>
        <Grid container spacing={1} mt={1} rowSpacing={1} alignItems="center">
            <Grid item md={3} xs={12}>
                <FormControl fullWidth size="small">
                <Field name={`items[${index}].rut_responsable`}>
        {({ field, form }) => (
          <TextField
            {...field}
            label="RUT Responsable"
            size="small"
            
            fullWidth
            error={
              form.touched.items &&
              form.errors.items &&
              form.errors.items[index] &&
              form.errors.items[index].rut_responsable
            }
            helperText={
              form.touched.items &&
              form.errors.items &&
              form.errors.items[index] &&
              form.errors.items[index].rut_responsable
                ? form.errors.items[index].rut_responsable
                : ''
            }
            onChange={(e) => {
              form.setFieldValue(
                `items[${index}].rut_responsable`,
                prettifyRut(e.target.value)
              );
            }}
            InputProps={{
              readOnly: true,
              disabled: true,
            /*  endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    aria-label="Buscar Rut"
                    onClick={() => {
                      if (field.value.length > 0) {
                        handleBuscarRut(field.value);
                        setActivaSnack(true);
                        setTrut(index);
                        form.setFieldValue(
                          `items[${index}].rut_usu`,
                          prettifyRut(field.value)
                        );
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
                   /*   if (field.value.length > 0) {
                        setInd(index);
                        handleBuscarRut(field.value);
                        setActivaSnack(true);
                        form.setFieldValue(
                          `items[${index}].rut_usu`,
                          prettifyRut(field.value)
                        ); 
                      }else{
                      setInd(index);
                      setAbrirModal(true)
                      } */
                      setInd(index);
                      setAbrirModal(true)
                    }}
                  >
                    <PersonSearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </Field>
                    </FormControl>
                </Grid>
                <Grid item md={3} xs={12}>
                    <FormControl fullWidth size="small">
                        <TextField
                            fullWidth
                            size="small"
                            autoComplete="off"
                            name={`items[${index}].nom_usu_det`}
                            label="Nombre"
                            value={values.items[index].nom_usu_det || ''}
                            InputProps={{
                                readOnly: true,
                                disabled: true,
                            }}
                            error={touched.items &&
                                errors.items &&
                                errors.items[index] &&
                                errors.items[index].nom_usu_det}
                            helperText={touched.items &&
                                errors.items &&
                                errors.items[index] &&
                                errors.items[index].nom_usu_det
                                ? errors.items[index].nom_usu_det
                                : ''} />
                    </FormControl>
                </Grid>
                <Grid item md={3} xs={12}>
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                            <DatePicker
                                label="Fecha Cierre"
                                name={`items[${index}].fec_cierre`}
                                value={values.items[index].fec_cierre}
                                autoComplete="off"
                                InputProps={{
                                    autoComplete: 'off',
                                }}
                                onChange={(fecha) => {
                                    setFieldValue(`items[${index}].fec_cierre`, fecha);
                                } }
                                renderInput={(params) => {
                                    params.inputProps.placeholder = 'día/mes/año';
                                    return <TextField
                                        size="small"
                                        {...params}
                                        onKeyDown={noIngreso}
                                        error={touched.items &&
                                            errors.items &&
                                            errors.items[index] &&
                                            errors.items[index].fec_cierre}
                                        helperText={touched.items &&
                                            errors.items &&
                                            errors.items[index] &&
                                            errors.items[index].fec_cierre
                                            ? errors.items[index].fec_cierre
                                            : ''} />;
                                } } />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                <Grid item md={3} xs={12}>
                <FormControlLabel
                    control={
                    <Checkbox
                        name={`items[${index}].isReport`}
                        color="primary"
                        checked={values.items[index].isReport}
                        onChange={(e) => {
                        const isChecked = e.target.checked;
                        
                        // Actualiza el estado del checkbox directamente
                        setFieldValue(`items[${index}].isReport`, isChecked);

                        // Realiza acciones adicionales según el estado del checkbox
                        if (isChecked) {
                            setReport(0);
                            
                        } else {
                            setReport(1);
                            
                        }
                        }}
                    />
                    }
                    label="Incluir en reporte"
                />
                </Grid>

                <Grid item md={3} xs={12}>
                    {index > 0 && (
                        <>
                        {/*
                        <IconButton type="button" onClick={() => remove(index)}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        
                            
                            <Fab color="error" variant="extended" size="small" onClick={() => remove(index)}>
                                <DeleteForeverIcon sx={{ mr: 1 }} />
                                Eliminar acción correctiva
                        </Fab>

                            */}
                        </>
                    )}
                </Grid>
            
            <br />
            <Grid item md={12} xs={12}>
            <FormControl fullWidth size="small">
                <Field name={`items[${index}].acc_correctiva`}>
                {({ field }) => (
                    <TextField
                    {...field}
                    label="Acción Correctiva"
                    multiline
                    rows={3}
                    fullWidth
                    size="small"
                    error={
                        touched.items &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].acc_correctiva
                    }
                    helperText={
                        touched.items &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].acc_correctiva
                        ? errors.items[index].acc_correctiva
                        : ''
                    }
                    />
                )}
                </Field>
            </FormControl>
            </Grid>
{/* 
 <br/>
            <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
                <InputLabel id={`items[${index}].contratos`}>Contratos</InputLabel>
                <Field
                key={`field-${index}`}
                name={`items[${index}].contratos`}
                >
                {({ field }) => (
                    <Select
                    {...field}
                    name={`items[${index}].contratos`}
                    labelId={`items[${index}].contratos`}
                    label="Contratos"
                    multiple
                    value={field.value || []}
                    onChange={(e) => setFieldValue(`items[${index}].contratos`, e.target.value)}
                    onBlur={field.onBlur}
                    renderValue={(selected) => selected.join(', ')}
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
                )}
                </Field>
            </FormControl>
            </Grid>
*/}
           

        <br/>
        <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small" error={touched.items && errors.items && errors.items[index] && errors.items[index].fk_jerarquia}>
                <InputLabel id={`items[${index}].fk_jerarquia`}>Jerarquía</InputLabel>
                <Field name={`items[${index}].fk_jerarquia`}>
                {({ field }) => (
                    <>
                    <Select
                        {...field}
                        name={`items[${index}].fk_jerarquia`}
                        labelId={`items[${index}].fk_jerarquia`}
                        label="jerarquia"
                        value={field.value || ''}  // Asegúrate de que field.value sea un valor válido o proporciona un valor predeterminado
                        onChange={(e) => {
                        const selectedJer = DataJer.data.result.find(emp => emp.id === e.target.value);
                        const Jer = selectedJer ? selectedJer.nom : '';

                        // Guarda la descripción en el estado
                        setJerDesc(Jer);
                        // Actualiza el valor de tipoIncidenteDesc en Formik
                        setFieldValue(`items[${index}].jerDesc`, Jer);
                        setFieldValue(`items[${index}].fk_jerarquia`, e.target.value);
                        }}
                        onBlur={field.onBlur}
                    >
                        {isLoadingDataJer ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                        ) : (
                        DataJer.data.result &&
                        DataJer.data.result.filter(emps => emps.id !== '0').map(emp => (
                            <MenuItem key={emp.id} value={emp.id}>
                            {emp.nom}
                            </MenuItem>
                        ))
                        )}
                    </Select>
                    <FormHelperText>
                        {touched.items &&
                        errors.items &&
                        errors.items[index] &&
                        errors.items[index].fk_jerarquia
                        ? errors.items[index].fk_jerarquia
                        : ''}
                    </FormHelperText>
                    </>
                )}
                </Field>
            </FormControl>
            </Grid>

            </Grid>
        </Grid>

    ))}
<br/>
                       {/* <Button type="button" variant="contained" size="small" onClick={() => push({ rut_responsable: '', fec_cierre: '', acc_correctiva: '' })}>
                              Agregar más acciones correctivas
                          </Button> */}  
                          <Box sx={{ '& > :not(style)': { m: 1 } }}>
     
                            <Fab color="primary" variant="extended" size="medium" onClick={() => push({ rut_responsable: '', fec_cierre: '', acc_correctiva: '' })} >
                            <AddIcon sx={{ mr: 1 }} />
                            Agregar otra acción correctiva
                            </Fab>
                            
                        </Box>
                      </>
                  )}
              </FieldArray>


          </form></>
   
  );
};

export const App = forwardRef(({ setValoresArray, setSnackMensaje, validationSchema }, ref) => {
const [report, setReport]= useState(0);

    return(
        <Formik
        initialValues={{ items: [{ rut_responsable:'', nom_usu_det:'', fec_cierre:null, acc_correctiva: '', isReport:false, contratos:'', fk_jerarquia:'', jerDesc:''}] }}
        validationSchema={validationSchema}
        onSubmit={(values, { submitForm, setSubmitting }) => {
           console.log('')
          }}
        
        innerRef={ref}
      >
           
    
    <MyForm setValoresArray={setValoresArray} setSnackMensaje={setSnackMensaje} setReport={setReport} report={report} />
    
      
      </Formik>

    )

});

export default App;