// assets

import AltRouteIcon from '@mui/icons-material/AltRoute';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InventoryIcon from '@mui/icons-material/Inventory';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SummarizeIcon from '@mui/icons-material/Summarize';
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const menuAdmin = {
    id: 'menuAdmin',
    title: 'Menú',
    type: 'ADMINISTRADOR',
    children: [
        {
            id: 'epp',
            title: 'Barras de perforación',
            type: 'collapse',
            icon: PendingActionsIcon,
            breadcrumbs: false,
            children: [

              
                {
                    id: 'accCorr',
                    title: 'Registro de barras de perforación',
                    type: 'item',
                    url: '/registro',
                    breadcrumbs: false,
                    icon: InventoryIcon,
                },         
                
             
                 
            ]
        },
    ]

};



export default menuAdmin;
