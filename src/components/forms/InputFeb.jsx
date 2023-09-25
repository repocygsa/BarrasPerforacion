
// import { FormControl, TextField } from '@mui/material'
// import { Field } from 'formik'
// import { memo } from 'react'


// export const InputFeb = memo(({name,label,formik,index}) =>{


//     return(
//         <Field name={name}>
//         {({ field,meta}) => (   
         
//             <FormControl fullWidth>
//              <TextField  
//             {...field}                  
//             size='small'                        
//             autoComplete="off"  
//             label={label}        
//             error={meta.touched && Boolean(meta.error)}
//             helperText={meta.touched && meta.error}          
//             // onBlur={(e)=>{                         
//             //     if(suma===0){
//             //       formik.setFieldValue(`progControl[${index}].total`,'')
//             //     }else{
//             //         formik.setFieldValue(`progControl[${index}].total`,suma)
//             //     }
//             // }}                     
    
//               />         
//             </FormControl>        
           
//          )}
//     </Field>
//     )
// })