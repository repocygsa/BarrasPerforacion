import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router';
import { Inicio } from 'views/inicio/Inicio';

import MensajeSinPermiso from 'components/theme/MensajeSinPermiso';

import { ListaAcciones } from 'views/pages/accionesCorrectivas/listaAcciones';


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
                        path: '/registro',
                        element: perUsu===1 || perUsu ===2 ?<ListaAcciones permiso={perUsu} usuario={rutUsu} /> : <Navigate to='/web/accionesCorrectivas' />
                    
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