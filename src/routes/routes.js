// project imports
// project imports
import MainLayout from 'layout/MainLayout';
import { Navigate } from 'react-router';
import { Inicio } from 'views/inicio/Inicio';
import MensajeSinPermiso from 'components/theme/MensajeSinPermiso';
import { FormularioRegistroAcciones } from 'views/pages/accionesCorrectivas/formularioRegistroAcciones';
import { ListaAcciones } from 'views/pages/accionesCorrectivas/listaAcciones';
import TabsTranversalidad from 'views/pages/accionesCorrectivas/tranversalidad/tabTranversalidad';
import PermisoModal from 'components/theme/SPermiso';

const Routes =({data})=>{

    const { rutUsu, perUsu, cttUsu } = data.user;

    if(perUsu !== null){
        return (
            [{
                path: '/',
                element:  perUsu === 1 ? <MainLayout permiso={perUsu}/>:<MensajeSinPermiso/>,
                children: [
        {
          path: '/inicio',
          element: <Inicio permiso={perUsu} />,
        },
        {
          path: '/registro',
          element: perUsu === 1 ? <ListaAcciones permiso={perUsu} usuario={rutUsu} /> : <Navigate to="/web/accionesCorrectivas" />,
        },
        {
          path: '/accCorrectivas',
          element: perUsu === 1 ? <FormularioRegistroAcciones permiso={perUsu} usuario={rutUsu} /> : <Navigate to="/web/accionesCorrectivas" />,
        },
        {
          path: '/tranversal',
          element: perUsu === 1 ? <TabsTranversalidad permiso={perUsu} usuario={rutUsu} /> : <Navigate to="/web/accionesCorrectivas" />,
        },
        {
          path: '*',
          element: <PermisoModal />,
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