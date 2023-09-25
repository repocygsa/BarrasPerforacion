import { Shield, AdminPanelSettings } from '@mui/icons-material';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const menuUser = {
    id: 'menuUser',
    title: 'Menú usuario',
    type: 'SOLICITANTE',
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
                    icon: AdminPanelSettings,
                },          
            ]
        },
    ]

};



export default menuUser;
