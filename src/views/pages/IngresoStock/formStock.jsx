/* eslint-disable array-callback-return */
import { Autocomplete, Button, CircularProgress, DialogActions, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import * as yup from "yup";

import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import { SnackComponent } from 'components/theme/SnackComponent';
import { Field, FieldArray, Form, Formik, useFormik } from 'formik';
import { getMaterial, getSexo, getTalla, insertStock } from 'helpers/gets';
import { useMutation, useQuery, useQueryClient } from 'react-query';


export const FormStock = ({setAbrirModal}) => {

    const [snackMensaje, setSnackMensaje] = useState('');

    const [tipoVestimenta, setTipoVestimenta] = useState(''); // Estado para almacenar la opción seleccionada
    const [tipoSex, setTipoSex] = useState('');
    const queryClient = useQueryClient();
    const [usuario, setUsuario] = useState('');
    const eppList = [
      { id: 1, nombre: 'Casco de seguridad' },
      { id: 2, nombre: 'Gafas de protección' },
      { id: 3, nombre: 'Guantes resistentes' },
      { id: 4, nombre: 'Botas de seguridad' },
      // Agrega más EPP según sea necesario
    ];
    
   
    const [selectedEpp, setSelectedEpp] = useState(null);
    const [eppSeleccionado, setEppSeleccionado] =useState('')

    useEffect(() => {
      const usu = localStorage.getItem('rut_session');
      setUsuario(usu);
  }, [])


const {
    data: DataMaterial, 
    isLoading:isLoadingDataMaterial
} = useQuery(['QueryMaterial'], 
    ()=>getMaterial()
);
const {
  data: DataTalla, 
  isLoading:isLoadingDataTalla
} = useQuery(['QueryTalla', tipoVestimenta], 
  ()=>getTalla(tipoVestimenta)
);

const {
data: DataSexo, 
isLoading:isLoadingDataSexo
} = useQuery(['QuerySexo', tipoSex], 
()=>getSexo(tipoSex)
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
    sel_epp: yup
    .string()
    .required('Debe ingresar un EPP')
,

      epp_cantidad: yup
          .string()
          .required('Debe ingresar una cantidad')
      ,

      epp_talla: yup
          .string()
          .required('Debe seleccionar una talla')
      ,
      epp_sexo: yup
          .string()
          .required('Debe ingresar el sexo')   
      ,
     
     
  }).required('Campo Requerido');

/*
const formik = useFormik({

  initialValues: {
    sel_epp :eppSeleccionado,
    epp_talla: '',
    epp_sexo: '',
    epp_cantidad: '',
    epp_movimiento: 1,
   usuario
  },

  validationSchema: validaciones,
  enableReinitialize: true,
  
  onSubmit: (row) => {
  mutateInsertStock(row)
  formik.resetForm()
  setSelectedEpp(null)
  setEppSeleccionado(0)
  formik.setFieldValue('sel_epp','')
  }
}); */

const handleEppChange = (event, newValue) => {



  if(newValue){
    setTipoVestimenta(newValue.fk_tip_tal)
    setTipoSex(newValue.fk_tip_sex)
    setSelectedEpp(newValue);
    setEppSeleccionado(newValue.id)

  }else{
   // formik.setFieldValue('sel_epp','')
    setTipoVestimenta('')
    setTipoSex('')
    setSelectedEpp(null)
    setEppSeleccionado(0)
  }
 // formik.setFieldValue('epp_sexo','')
 // formik.setFieldValue('epp_talla', '')

};

const [helperText, setHelperText] = useState('');
  const [abrirDialog, setAbrirDialog] = useState(false);
  const [dataSolicitud, setDataSolicitud] = useState('');
  const [submiteado, setSubmiteado] = useState(false);
  
  const formikRef = useRef();

  const valoresIniciales = {
    stock: [
      {
        sel_epp :eppSeleccionado,
        epp_talla: '',
        epp_sexo: '',
        epp_cantidad: '',
        epp_movimiento: 1,
        usuario
      }
    ],
 
  
  }

  const validaFormSolicitud = yup.object().shape({
    solicitud: yup.array().of(
      yup.object().shape({
        sel_epp: yup
        .string()
        .required('Debe ingresar un EPP')
    ,
    
          epp_cantidad: yup
              .string()
              .required('Debe ingresar una cantidad')
          ,
    
          epp_talla: yup
              .string()
              .required('Debe seleccionar una talla')
          ,
          epp_sexo: yup
              .string()
              .required('Debe ingresar el sexo')   
          ,
      })
    ).test('no-duplicate-elements', 'No se permiten elementos duplicados', (value) => {
      setHelperText('');
      if (Array.isArray(value)) {
        const seenElements = new Set();
  
        return !value.some((element) => {
          const key = `${element.detEpp}-${element.sexEpp}-${element.talEpp}`;
          if (seenElements.has(key)) {
            setHelperText('No se permiten elementos duplicados');
            return true; // Elemento duplicado encontrado
          }
          seenElements.add(key);
          return false;
        });
      }
      setHelperText('');
      return true; // No se encontraron elementos duplicados
    }),
   
   
  })


    return (
      
        <><SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} />
   
        <Formik
      innerRef={formikRef}
      initialValues={valoresIniciales}
      formik={Formik}   
     
      // enableReinitialize
      onSubmit={(values, { resetForm }) => {

        setDataSolicitud(values);

      //  mutateInsertStock(values)
   
        resetForm()
        setSelectedEpp(null)
        setEppSeleccionado(0)
       // setFieldValue('sel_epp','')

        // console.log(values);
        // resetForm();
        // mutateSolicitud(values)
  
    }}
    >
    {(formik) => (
      <Form>

        <FieldArray name="stock">
        {({ push, remove }) => (
          <>
            {
            formik.values.stock.map((p, index) => {

const num=0

              return (
                <Grid container spacing={1} rowSpacing={1} mt={1}>
                <Grid item md={4} xs={12}>
                  <FormControl
                    fullWidth
                    error={formik.touched.responsable && Boolean(formik.errors.responsable)}
                    
                  >
                    {isLoadingDataMaterial ?
                      <CircularProgress />
                      :
                      <Field
                      
                        options={DataMaterial.data.result}
                        getOptionLabel={(epp) => epp.des_epp}
                        name={`stock[${index}].sel_epp`}
                       // value={selectedEpp}
                        onChange={handleEppChange}
                        size='small'
                        component={Autocomplete}
                        renderInput={(params) => 
                        <TextField
                          
                          {...params} 
                          label="Selecciona un EPP" 
                          variant="outlined" 
                         
                          placeholder="Selecciona un EPP"
                     
                          onBlur={formik.handleBlur}
                          error={formik.touched.sel_epp && Boolean(formik.errors.sel_epp)}
                          helperText={formik.touched.sel_epp && formik.errors.sel_epp}
                        
                          />
                        }
                     />}
                  </FormControl>
                </Grid> 
      
                <Grid item md={2} xs={12}>
                  <FormControl
                    fullWidth
                    size="small"
                    // error={formik.touched.epp_talla && Boolean(formik.errors.epp_talla)}
                    error={formik.touched.stock?.[index]?.epp_talla && Boolean(formik.errors.stock?.[index]?.epp_talla)}
                  >
                    <InputLabel id="lbl_tall_inf">Talla</InputLabel>
                    <Field
                      name={`stock[${index}].epp_talla`}
                      as={Select}
                      label="Talla"
                      labelId="epp_talla"
                      value={formik.values.epp_talla}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                      } }
                      onChange={(e) => {
                        formik.setFieldValue('epp_talla', e.target.value);
                      } }
                    >
                      {isLoadingDataTalla ?
                        <Box sx={{ display: 'flex' }}>
                          <CircularProgress />
                        </Box>
                        :
                        DataTalla.data.result && DataTalla.data.result.map((tall) => (
                          <MenuItem key={tall.id} value={tall.id}>
                            {tall.des_tal}
                          </MenuItem>
                        ))}
                    </Field>
                    <FormHelperText>
    {formik.touched.stock?.[index]?.epp_talla && formik.errors.stock?.[index]?.epp_talla}
  </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={2} xs={12}>
                  <FormControl
                    fullWidth
                    size="small"
                    error={formik.touched.epp_sexo && Boolean(formik.errors.epp_sexo)}
                  >
                    <InputLabel id="lbl_sex_inf">Sexo</InputLabel>
                    <Select
                      name={`stock[${index}].epp_sexo`}
                      label="Sexo"
                      labelId="lbl_sex_inf"
                      value={formik.values.epp_sexo}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                      } }
                      onChange={(e) => {
                        formik.setFieldValue('epp_sexo', e.target.value);
                      } }
                    >
                      {isLoadingDataSexo ?
                        <Box sx={{ display: 'flex' }}>
                          <CircularProgress />
                        </Box>
                        :
                        DataSexo.data.result && DataSexo.data.result.map((sex) => (
                          <MenuItem key={sex.id} value={sex.id}>
                            {sex.des_sex}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{formik.touched.epp_sexo && formik.errors.epp_sexo}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={2} xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    autoComplete="off"
                    name={`stock[${index}].epp_cantidad`}
                    label="Cantidad"
                    value={formik.values.epp_cantidad}
                    onChange={formik.handleChange}
                    error={formik.touched.epp_cantidad && Boolean(formik.errors.epp_cantidad)}
                    helperText={formik.touched.epp_cantidad && formik.errors.epp_cantidad}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                    } } />
                </Grid>
                {
      formik.values.stock && formik.values.stock.length > 1 &&
      <Grid item md={1} xs={12}>
        <FormControl fullWidth>
          <Button 
            type="button"
            color="error"
            variant="contained"
            onClick={() => remove(index)}
          >
          Quitar
          </Button>
        </FormControl>
      </Grid> 
      }
              </Grid>
              ); // Fin return

            }) // Fin mapeo
          }

          <Grid container spacing={1} rowSpacing={4} mb={2}>
            <Grid item md={12} xs={12} textAlign='center'>
              <FormHelperText name="no-duplicate-elements" error>
                {helperText}
              </FormHelperText>
            </Grid>
          </Grid>

          <Grid container spacing={1} rowSpacing={1} mb={2}>
            <Grid item md={2} xs={12}>
              <FormControl fullWidth>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() =>
                    push({ id: Math.random(), sel_epp: '', epp_sexo: '', epp_talla: '', epp_cantidad: ''})
                  }
                >
                  Agregar EPP
                </Button>
              </FormControl>
            </Grid>
          </Grid>
          </>
        )}
        </FieldArray>


  

        <Grid  container spacing={2} rowSpacing={1} mt={1}>
        <Grid item md={10.5} xs={12} textAlign='right'>
              <FormControl>
               
                <Button color="error" variant="contained"  style= {{textTransform: 'none' }} autoFocus onClick={()=>setAbrirModal(false)}>
                    Cerrar
                  </Button>
              </FormControl>
            </Grid>
            <Grid item md={1} xs={12} textAlign='right'>
              <FormControl>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                 Registrar
                </Button>
               
              </FormControl>
            </Grid>
            
           
 
          </Grid>

      </Form>
    )}
    </Formik>

 
    
          
     
     
      </>


    )

}