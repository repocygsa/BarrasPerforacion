// assets

import AltRouteIcon from '@mui/icons-material/AltRoute';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InventoryIcon from '@mui/icons-material/Inventory';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ListAltIcon from '@mui/icons-material/ListAlt';
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
            icon: PrecisionManufacturingIcon,
            breadcrumbs: false,
            children: [

              
                {
                    id: 'accCorr1',
                    title: 'Registro de barras de perforación',
                    type: 'item',
                    url: '/registro',
                    breadcrumbs: false,
                    icon: InventoryIcon,
                },      
                {
                    id: 'accCorr',
                    title: 'Listado de registros',
                    type: 'item',
                    url: '/listado',
                    breadcrumbs: false,
                    icon: ListAltIcon,
                },         
                
             
                 
            ]
        },
    ]

};



export default menuAdmin;
