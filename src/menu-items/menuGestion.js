// assets
 import { Shield, GppGood, AdminPanelSettings } from '@mui/icons-material';
 import InventoryIcon from '@mui/icons-material/Inventory';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const menuGestion = {
    id: 'menuGestion',
    title: 'Menú gestión',
    type: 'GESTION',
    children: [
        {
            id: 'epp',
            title: 'EPP',
            type: 'collapse',
            icon: Shield,
            breadcrumbs: false,
            children: [
                {
                    id: 'stock',
                    title: 'Controlar stock',
                    type: 'item',
                    url: '/stock',
                    breadcrumbs: false,
                    icon: InventoryIcon,
                },    
                {
                    id: 'entrega',
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

export default menuGestion;
