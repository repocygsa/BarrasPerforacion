/* eslint-disable array-callback-return */
import { Autocomplete, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import * as yup from "yup";

import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import { SnackComponent } from 'components/theme/SnackComponent';
import { useFormik } from 'formik';
import { getMaterial, getSexo, getTalla, insertStock } from 'helpers/gets';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BtnNuevoStock } from './btnNuevStock';
import SearchIcon from '@mui/icons-material/Search';

export const FormStockFilter = ({setFiltroStock, usuario}) => {

    const [snackMensaje, setSnackMensaje] = useState('');

    const [tipoVestimenta, setTipoVestimenta] = useState(''); // Estado para almacenar la opción seleccionada
    const [tipoSex, setTipoSex] = useState('');
    const queryClient = useQueryClient();
    
    const [selectedEpp, setSelectedEpp] = useState(null);
    const [eppSeleccionado, setEppSeleccionado] =useState('')



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
      
        <><SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} />
        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
          <Grid item md={3} xs={3}>
            <FormControl
              fullWidth
              error={formik.touched.responsable && Boolean(formik.errors.responsable)}
              
            >
              {isLoadingDataMaterial ?
                <CircularProgress />
                :
                <Autocomplete
                
                  options={DataMaterial.data.result}
                  getOptionLabel={(epp) => epp.des_epp}
                  name="sel_epp"
                  value={selectedEpp}
                  onChange={handleEppChange}
                  size='small'
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
              error={formik.touched.epp_talla && Boolean(formik.errors.epp_talla)}
            >
              <InputLabel id="lbl_tall_inf">Talla</InputLabel>
              <Select
                name="epp_talla"
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
                  tallas && tallas.map((tall) => (
                    <MenuItem key={tall.id} value={tall.id}>
                      {tall.des_tal}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>{formik.touched.epp_talla && formik.errors.epp_talla}</FormHelperText>
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
                name="epp_sexo"
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
                 sexo && sexo.map((sex) => (
                    <MenuItem key={sex.id} value={sex.id}>
                      {sex.des_sex}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>{formik.touched.epp_sexo && formik.errors.epp_sexo}</FormHelperText>
            </FormControl>
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
            <BtnNuevoStock setSnackMensaje={setSnackMensaje} usuario={usuario}  style={{ textTransform: 'none', marginLeft: '1px' }} />
          </Grid>
        </Grid>
        



      </form></>


    )

}