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
            title: 'ACCIONES CORRECTIVAS ',
            type: 'collapse',
            icon: Shield,
            breadcrumbs: false,
            children: [

              
                {
                    id: 'accCorr',
                    title: 'Acciones correctivas',
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
