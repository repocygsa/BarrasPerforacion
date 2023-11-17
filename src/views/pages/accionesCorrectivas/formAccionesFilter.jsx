/* eslint-disable array-callback-return */
import { CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import * as yup from "yup";

import { SnackComponent } from 'components/theme/SnackComponent';
import { useFormik } from 'formik';
import { getContratos, getEmpresa, getMaterial, getSexo, getTalla, insertStock } from 'helpers/gets';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BtnNuevaAccion } from './btnNuevaAccion';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';

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
  const {
    data: DataMaterial, 
    isLoading:isLoadingDataMaterial
} = useQuery(['QueryMaterial'], 
    ()=>getMaterial()
);


const [tallas, setTallas] = useState([])
const {
  data: DataTalla, 
  isLoading:isLoadingDataTalla
} = useQuery(['QueryTalla', tipoVestimenta], 
  ()=>getTalla(tipoVestimenta),{
    onSuccess: (fTall) => {
  setTallas([{id:0, des_tal:'Todos', tip_tal:0}].concat(fTall.data.result))
    }
  }
);
const [sexo, setSexo] = useState([])
const {
data: DataSexo, 
isLoading:isLoadingDataSexo
} = useQuery(['QuerySexo', tipoSex], 
()=>getSexo(tipoSex),{
  onSuccess: (sex)=>{
    setSexo([{id:0, des_sex:'Todos', tip_sex:0}].concat(sex.data.result))
  }
}
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

     
     
  }).required('Campo Requerido');

  

const formik = useFormik({

  initialValues: {
    sel_epp :eppSeleccionado,
    epp_talla: '',
    epp_sexo: '',
    epp_cantidad: '',
    epp_movimiento: 1,
   
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
        <Grid container spacing={1} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
                  
        
       
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
          <Grid item md={4} xs={12}>
             <TextField
                        fullWidth
                        size="small"
                        autoComplete="off"
                        name="pos_inf"
                        label="Aprendizaje"
                        value={formik.values.pos_inf}
                        onChange={formik.handleChange}
                        error={formik.touched.pos_inf && Boolean(formik.errors.pos_inf)}
                        helperText={formik.touched.pos_inf && formik.errors.pos_inf}
                        onBlur={(e) => {
                            formik.handleBlur(e);
                        }}
                    />
          </Grid>

          
       
          <Grid item md={1} xs={1} >
            <LoadingButton
              type="submit"
              loading={isLoadindMutateSaveStock}
              loadingPosition="start"
              style={{ textTransform: 'none'}}
              startIcon={<SearchIcon />}
              variant="contained"
            >
              Buscar
            </LoadingButton>
          </Grid>

 
      
          <Grid item md={1} xs={1} >
            <BtnNuevaAccion setSnackMensaje={setSnackMensaje} usuario={usuario}  style={{ textTransform: 'none', marginLeft: '1px' }} />
          </Grid>
        </Grid>
        



      </form></>


    )

}