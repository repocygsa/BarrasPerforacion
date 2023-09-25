import config from 'config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import SamplePage from 'views/sample-page';

export const Inicio = ({permiso}) =>{

   const navigate  = useNavigate()
   
   useEffect(() => {
      if(permiso===0){
         navigate(`${config.basename}/solicitud`)
      }else if(permiso===1){
         navigate(`${config.basename}/entrega`)
      }

    }, [permiso])
    
   return  <SamplePage/>

}


// navigate(`${config.basename}/programacion`)