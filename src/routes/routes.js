
// project imports
import MainLayout from 'layout/MainLayout';
import { Navigate } from 'react-router';
import { Inicio } from 'views/inicio/Inicio';

import MensajeSinPermiso from 'components/theme/MensajeSinPermiso';

import { FormularioRegistroAcciones } from 'views/pages/accionesCorrectivas/formularioRegistroAcciones';
import { ListaAcciones } from 'views/pages/accionesCorrectivas/listaAcciones';
import { ListaTranversal } from 'views/pages/accionesCorrectivas/tranversalidad/listaTranversal';
import TabsTranversalidad from 'views/pages/accionesCorrectivas/tranversalidad/tabTranversalidad';


const Routes =({data})=>{

    const { rutUsu, perUsu, cttUsu } = data.user;
   

    if(perUsu !== null){
        return (
            [{
                path: '/',
                element:  perUsu ===1? <MainLayout permiso={perUsu}/>:<MensajeSinPermiso/>,
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
                        path: '/accCorrectivas',
                        element: perUsu===1 || perUsu ===2 ?<FormularioRegistroAcciones permiso={perUsu} usuario={rutUsu} /> : <Navigate to='/web/accionesCorrectivas' />
                    
                    },
                   {
                        path: '/tranversal',
                        element: perUsu===1 || perUsu ===2 ?<TabsTranversalidad permiso={perUsu} usuario={rutUsu} /> : <Navigate to='/web/accionesCorrectivas' />
                    
                    }, 
                    {
                        path: '*',
                        element: <Navigate to='/accionesCorrectivas' />
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