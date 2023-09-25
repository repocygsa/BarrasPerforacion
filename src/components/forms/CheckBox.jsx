// import { Checkbox, FormControlLabel } from '@mui/material';
// import React from 'react'

// export const CheckBox = ({name}) => {
//   return (
//     <Field name={name}>
//         {({ field,meta}) => (   
//     <FormControl                  
//     fullWidth
//     sx={{display:'flex', flexDirection:`${direction}`} }
//     error={meta.touched && Boolean(meta.error)}
//     >                 
//                 {array.map(check=>(                           
//                 <FormControlLabel key={check.id} control={<Checkbox
//                 {...field}
//                 name={name}                            
//                 checked={checked}
//                 onChange={(res)=>{
//                 if(setCheckCont){
//                     setCheckCont(res.target.checked)
//                 }
                
//                 formik.setFieldValue(`${name}`, res.target.checked); 
//                 }}
//                 value={check.id}                              
//                 />} label={check.nom} />  
//                 )
        
//     )}
//     <FormHelperText error>
//             {meta.touched && meta.error}        
//     </FormHelperText>
//     </FormControl>
//      )}
// </Field>
//   )
// }
