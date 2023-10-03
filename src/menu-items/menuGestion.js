// assets
 import { Shield, GppGood, AdminPanelSettings } from '@mui/icons-material';

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
                    id: 'entrega',
                    title: 'Gestionar solicitudes EPP',
                    type: 'item',
                    url: '/list_solicitudes',
                    breadcrumbs: false,
                    icon: GppGood,
                },          
            ]
        },
    ]

};

export default menuGestion;
