// assets
 import { Shield, GppGood, AdminPanelSettings } from '@mui/icons-material';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const menuEntrega = {
    id: 'menuEntrega',
    title: 'Menú personal',
    type: 'ENTREGADOR',
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

export default menuEntrega;
