import { useState, useRef } from 'react';
import { Button, Grid, Typography, FormControl, FormHelperText } from '@mui/material';

import { Form, Formik, FieldArray } from 'formik';
import * as yup from "yup";
import { CustomInput } from 'components/forms/CustomInput';
import InputsSolicitudEpp from './inputsSolicitud';
import { DialogEnviarSolicitud } from './dialogEnviarSolicitud';


export const FormSolicitudEpp = ({ permiso, usuario, setSnackMensaje }) => {

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
          .positive()
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
    obsEpp: yup
      .string()
    ,
    corEpp: yup
      .string()
      .email('Debe ingresar un correo')
      .required('Campo Requerido')
      /*
      .when('obsEpp', {
        is: (obsEpp) => obsEpp && obsEpp.length > 0,
        then: yup.string().required('El correo es obligatorio cuando hay una observación'),
        otherwise: yup.string(),
      
    })
    */
    ,
    fonEpp: yup
      .string()
      .matches(/^\d{8}$/, 'El número de teléfono debe tener 8 dígitos')
      .nullable()
    ,
  })


  return (
    <>
    <DialogEnviarSolicitud 
      abrirDialog={abrirDialog} 
      setAbrirDialog={setAbrirDialog}
      setSnackMensaje={setSnackMensaje}
      formikRef={formikRef} 
      dataSolicitud={dataSolicitud}
      submiteado={submiteado}
      setSubmiteado={setSubmiteado}
    />
    <Formik
      innerRef={formikRef}
      initialValues={valoresIniciales}
      validationSchema={validaFormSolicitud}
      // enableReinitialize
      onSubmit={(values, { resetForm }) => {

        setDataSolicitud(values);
        setAbrirDialog(true);

        // console.log(values);
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
                <InputsSolicitudEpp 
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

        <Grid container spacing={1} rowSpacing={4} mb={1}>
          <Grid item md={12} xs={12}>
            <CustomInput
              type={3}
              cantRows={2}
              name='obsEpp'
              label="Observaciones"
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} rowSpacing={4} mb={3}>
          <Grid item md={6} xs={12}>
            <CustomInput
              type={3}
              cantRows={1}
              name='corEpp'
              label="Correo"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <CustomInput
              type={4}
              cantRows={1}
              name='fonEpp'
              label="Teléfono"
              adorment='+56 9'
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} rowSpacing={4}>
            <Grid item md={12} xs={12} textAlign='center'>
              <FormControl>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Enviar solicitud
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
