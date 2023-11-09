import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router';
import { Inicio } from 'views/inicio/Inicio';

import MensajeSinPermiso from 'components/theme/MensajeSinPermiso';
import { Solicitudes } from 'views/pages/solicitudes/Solicitudes';
import { Entregas } from 'views/pages/entregas/Entregas';
import { ListSolicitudes } from 'views/pages/revSolicitudes/listSolicitudes';
import { ListaStock } from 'views/pages/IngresoStock/listaStock';


const Routes =({data})=>{

    const { rutUsu, perUsu, cttUsu } = data.user;

    if(perUsu !== null){
        return (
            [{
                path: '/',
                element:  cttUsu === '4600021050' ? <MainLayout permiso={perUsu}/>:<MensajeSinPermiso/>,
                children: [
                    {
                        path: '/inicio',
                        element: <Inicio permiso={perUsu}/>
                    },
                    {
                        path: '/solicitud',
                        element: perUsu===1|| perUsu ===3? <Solicitudes permiso={perUsu} usuario={rutUsu} />:<Navigate to='/web/epp' />
                    
                    },
                    {
                        path: '/list_solicitudes',
                        element: perUsu===1 || perUsu ===2 ? <ListSolicitudes permiso={perUsu} usuario={rutUsu} />:<Navigate to='/web/epp' />
                    
                    },
                    {
                        path: '/entrega',
                        element: perUsu===1 ? <Entregas permiso={perUsu} usuario={rutUsu} />:<Navigate to='/web/epp' />
                    
                    },
                    {
                        path: '/stock',
                        element: perUsu===1 || perUsu ===2 ?<ListaStock permiso={perUsu} usuario={rutUsu} /> : <Navigate to='/web/epp' />
                    
                    },
                    {
                        path: '*',
                        element: <Navigate to='/epp' />
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