import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router';
import { Inicio } from 'views/inicio/Inicio';

import MensajeSinPermiso from 'components/theme/MensajeSinPermiso';
import { Solicitudes } from 'views/pages/solicitudes/Solicitudes';
import { Entregas } from 'views/pages/entregas/Entregas';


const Routes =({data})=>{

    const { perUsu } = data.user;

    if(perUsu !== null){
        return (
            [{
                path: '/',
                element:  perUsu !== null ? <MainLayout permiso={perUsu}/>:<MensajeSinPermiso/>,
                children: [
                    {
                        path: '/inicio',
                        element: <Inicio permiso={perUsu}/>
                    },
                    {
                        path: '/solicitud',
                        element: perUsu===0 ? <Solicitudes />:<Navigate to='/web/epp'/>
                    
                    },
                    {
                        path: '/entrega',
                        element: perUsu===2 ? <Entregas />:<Navigate to='/web/epp'/>
                    
                    },
                    {
                        path: '/entrega',
                        element: perUsu===1 ? <Entregas />:<Navigate to='/web/epp'/>
                    
                    },
                    {
                        path: '*',
                        element: <Navigate to='/epp'/>
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