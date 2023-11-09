// assets
import { Shield, GppGood, AdminPanelSettings } from '@mui/icons-material';

import AddModeratorIcon from '@mui/icons-material/AddModerator';
import InventoryIcon from '@mui/icons-material/Inventory';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const menuAdmin = {
    id: 'menuAdmin',
    title: 'Menú administrador',
    type: 'ADMINISTRADOR',
    children: [
        {
            id: 'epp',
            title: 'EPP',
            type: 'collapse',
            icon: Shield,
            breadcrumbs: false,
            children: [
                {
                    id: 'solicitud',
                    title: 'Solicitar EPP',
                    type: 'item',
                    url: '/solicitud',
                    breadcrumbs: false,
                    icon: AddModeratorIcon,
                },
              
                {
                    id: 'stock',
                    title: 'Controlar stock',
                    type: 'item',
                    url: '/stock',
                    breadcrumbs: false,
                    icon: InventoryIcon,
                },    
                {
                    id: 'gsol',
                    title: 'Gestionar solicitudes EPP',
                    type: 'item',
                    url: '/list_solicitudes',
                    breadcrumbs: false,
                    icon: AdminPanelSettings,
                },               
                 
            ]
        },
    ]

};



export default menuAdmin;
