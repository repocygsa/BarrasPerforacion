import { Button, FormControl, FormHelperText, Grid, Typography } from '@mui/material';
import { useRef, useState } from 'react';

import { FieldArray, Form, Formik } from 'formik';
import * as yup from "yup";
import { DialogEnviarStock } from './dialogEnviarStock';
import InputsStockEpp from './inputsStockEpp';


export const FormStockEpp = ({ permiso, usuario, setSnackMensaje, setModalPrin }) => {

  const [helperText, setHelperText] = useState('');
  const [abrirDialog, setAbrirDialog] = useState(false);
  const [dataSolicitud, setDataSolicitud] = useState('');
  const [submiteado, setSubmiteado] = useState(false);
  
  const formikRef = useRef();

  const valoresIniciales = {
    solicitud: [
      {
        id: Math.random(),
        detEpp: '',
        sexEpp: '',
        talEpp: '',
        canEpp: '',
      }
    ],
    obsEpp: '',
    fonEpp: '',
    corEpp: '',
    rutUsu: usuario,
    perUsu: permiso
  }

  const validaFormSolicitud = yup.object().shape({
    solicitud: yup.array().of(
      yup.object().shape({
        detEpp: yup
          .string()
          .required('Campo Requerido')
        ,
        sexEpp: yup
          .string()
          .required("Campo requerido")
        ,
        talEpp: yup
          .string()
          .required("Campo requerido")
        ,
        canEpp: yup
          .number()
          .positive('Ingrese un número mayor a 0')
          /*
          .min(1, 'Debe ser mayor o igual a uno')
          .max(inventario, `No hay inventario suficiente, máx. ${inventario}`)
          */
          .required("Campo requerido")
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
    <>
    <DialogEnviarStock
      abrirDialog={abrirDialog} 
      setAbrirDialog={setAbrirDialog}
      setSnackMensaje={setSnackMensaje}
      formikRef={formikRef} 
      dataSolicitud={dataSolicitud}
      submiteado={submiteado}
      setSubmiteado={setSubmiteado}
      setModalPrin={setModalPrin}
      usuario={usuario}
    />
    <Formik
      innerRef={formikRef}
      initialValues={valoresIniciales}
      validationSchema={validaFormSolicitud}
      // enableReinitialize
      onSubmit={(values, { resetForm }) => {

        setDataSolicitud(values);
        setAbrirDialog(true);

       //  console.log(values);
        // resetForm();
        // mutateSolicitud(values)
  
    }}
    >
    {({ values }) => (
      <Form>
        <Typography               
          sx={{ fontSize: 15, mb: 4 }}
          color="text.secondary"
          gutterBottom
        >
          Seleccione el EPP que necesita y su detalle, si requiere agregar más EPPs haga clic en el botón azul, de lo contrario si desea quitar equipos haga clic en el botón rojo.
        </Typography>
        <FieldArray name="solicitud">
        {({ push, remove }) => (
          <>
            {
            values.solicitud.map((p, index) => {

              const detEpp = `solicitud[${index}].detEpp`;
              const sexEpp = `solicitud[${index}].sexEpp`;
              const talEpp = `solicitud[${index}].talEpp`;
              const canEpp = `solicitud[${index}].canEpp`;

              return (
                <InputsStockEpp
                  detEpp={detEpp} 
                  sexEpp={sexEpp} 
                  talEpp={talEpp} 
                  canEpp={canEpp} 
                  values={values} 
                  remove={remove} 
                  index={index}
                  submiteado={submiteado}
                  key={p.id}
                />
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

          <Grid container spacing={1} rowSpacing={4} mb={2}>
            <Grid item md={2} xs={12}>
              <FormControl fullWidth>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() =>
                    push({ id: Math.random(), detEpp: '', sexEpp: '', talEpp: '', canEpp: ''})
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

        <Grid container spacing={1} rowSpacing={4}>
            <Grid item md={10.5} xs={12} textAlign='right'>
              <FormControl>
              <Button color="error" variant="contained"style= {{textTransform: 'none'}} autoFocus onClick={()=>setModalPrin(false)}>
                   Cerrar
                </Button>
              </FormControl>
            </Grid>
            <Grid item md={1.5} xs={12} textAlign='right'>
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
  );

}
