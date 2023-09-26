import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Field } from 'formik';

export const CustomInput=({type,name,label,nomSelectDependiente,setSelect,cleanSelect,array,cantRows})=>{

    switch (type) {
        case 1: // select dependiente
        return(

          <Field name={name}>
          {({ field,meta,form}) => (  
          
                  <FormControl fullWidth size='small'
                  error={meta.touched && Boolean(meta.error)}
                  >
                  <InputLabel>{label}</InputLabel>
                  <Select
                  size='small'         
                  label={label}
                  {...field}                           
                  onChange={(e) => {
                    form.setFieldValue(`${name}`, e.target.value);                                         

                        nomSelectDependiente.map((select,index)=>{
                          form.setFieldValue(select,'') 
                              
                             if(index===0){
                              cleanSelect.map(setClean=>{                                   
                                setClean('')                                  
                                return setClean
                              })
                             }                              
                          return select
                        }) 
                        setSelect(e.target.value) 
                  }}
                  onBlurCapture={()=>{
                        nomSelectDependiente.map(select=>{
                          form.setFieldTouched(select)                            
                          return select  
                        })
                  }}             
                  >                            
                    {  
                            array.map((select) => (
                                <MenuItem key={select.id} value={select.id}>
                                {select.nom}
                                </MenuItem>
                ))
                    }
                  </Select>
                  <FormHelperText>
                  {meta.touched && meta.error}       
                  </FormHelperText>
                  </FormControl> 
         
           )}
      </Field>  
      )
      case 2:  // select
      return(
          <Field name={name}>
          {({ field,meta,form}) => (   
          
                  <FormControl fullWidth   size='small'
                  error={meta.touched && Boolean(meta.error)}
                  >
                  <InputLabel>{label}</InputLabel>
                  <Select
                   size='small'          
                  label={label}
                  {...field}                           
                  onChange={(e) => {
                    form.setFieldValue(`${name}`, e.target.value); 
                  }}
                  >                            
                    { 
                      array.map((select) => (
                          <MenuItem key={select.id} value={select.id}>
                          {select.nom}
                          </MenuItem>
                      ))
                    }
                  </Select>
                  <FormHelperText>
                  {meta.touched && meta.error}       
                  </FormHelperText>
                  </FormControl> 
                 
           )}
      </Field>
      )
      case 3 : // Texto multilínea
      return(
        <Field name={name}>
        {({ field,meta}) => (   
            <FormControl fullWidth>
             <TextField 
            {...field}  
            multiline
            rows={cantRows}                
            size='small'                        
            autoComplete="off"  
            label={label}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}                  
              />         
            </FormControl>        
           
         )}
    </Field>
      )
        default:
            return null;
    }
}











