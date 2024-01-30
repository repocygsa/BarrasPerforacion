// assets
 import { AdminPanelSettings, Shield } from '@mui/icons-material';


import AltRouteIcon from '@mui/icons-material/AltRoute';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InventoryIcon from '@mui/icons-material/Inventory';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SummarizeIcon from '@mui/icons-material/Summarize';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const menuGestion = {
    id: 'menuGestion',
    title: 'Menú',
    type: 'GESTION',
    children: [
        {
            id: 'gestor',
            title: 'Acciones correctivas',
            type: 'collapse',
            icon: Shield,
            breadcrumbs: false,
            children: [
                {
                    id: 'accCorr',
                    title: 'Registro de acciones',
                    type: 'item',
                    url: '/accCorrectivas',
                    breadcrumbs: false,
                    icon: InventoryIcon,
                },         
                
                {
                    id: 'accCorr2',
                    title: 'Listado de registros',
                    type: 'item',
                    url: '/registro',
                    breadcrumbs: false,
                    icon: FactCheckIcon,
                },   
                {
                    id: 'accCorr3',
                    title: 'Acciones por contrato',
                    type: 'item',
                    url: '/tranversal',
                    breadcrumbs: false,
                    icon: AltRouteIcon,
                },   


            ]
        },
    ]

};

export default menuGestion;
