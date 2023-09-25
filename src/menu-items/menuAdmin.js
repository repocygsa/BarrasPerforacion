// assets
import { Shield, GppGood, AdminPanelSettings } from '@mui/icons-material';

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
                    icon: AdminPanelSettings,
                },
                {
                    id: 'entrega',
                    title: 'Entregar EPP',
                    type: 'item',
                    url: '/entrega',
                    breadcrumbs: false,
                    icon: GppGood,
                },         
            ]
        },
    ]

};



export default menuAdmin;
