// project imports
// project imports
import MensajeSinPermiso from 'components/theme/MensajeSinPermiso';
import MainLayout from 'layout/MainLayout';
import { Navigate } from 'react-router';
import { Inicio } from 'views/inicio/Inicio';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FormularioRegistroBDP } from 'views/pages/BDP/formularios/formularioRegistroBDP';
import { ListaBarrasPerforacion } from 'views/pages/BDP/listados/listadoBarrasPerforacion';

const Routes =({data})=>{
    const location = useLocation();
    const [activeRoute, setActiveRoute] = useState(location.pathname);
  
    useEffect(() => {
      setActiveRoute(location.pathname);
    }, [location.pathname]);

//    console.log(activeRoute,'ruta activa')
  
    if(data.permiso.length > 0){

        const { rut, ctto, empresa} = data.datosSesion;
        const perUsu =  data.permiso[0].fk_perfil

        console.log(data, 'data session')

        return (
            [{
                path: '/',
                element:  perUsu === 1 || perUsu ===2 ? <MainLayout permiso={perUsu}/>:<MensajeSinPermiso/>,
                children: [
                    {
                        path: '/inicio',
                        element: <Inicio permiso={perUsu}/>
                    },
                  
                   
                    {
                        path: '/registro',
                        element: perUsu===1 || perUsu ===2 ?<FormularioRegistroBDP permiso={perUsu} usuario={rut} ctto={ctto} empresa={empresa}/> : <Navigate to='/web/barrasPerforacion' />
                    
                    },

                    {
                        path: '/listado',
                        element: perUsu===1 || perUsu ===2 ?<ListaBarrasPerforacion permiso={perUsu} usuario={rut} ctto={ctto} /> : <Navigate to='/web/barrasPerforacion' />
                    
                    },
                   
                    {
                        path: '*',
                        element: <MensajeSinPermiso/>,  
                
                    },             
                    
                ]
            }]
        )
    }


    return(
        [
           
            
            {
                path: '*',
                element: <MensajeSinPermiso/>,  

            },
        ] 
        
    )
}


export default Routes;