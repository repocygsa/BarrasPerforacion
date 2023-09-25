import { useRoutes } from 'react-router-dom';

import config from 'config';
import routes from './routes';
import { useDispatch} from 'react-redux';
import { userAction } from 'store/user/userAction';

// ==============================|| ROUTING RENDER ||============================== //

export default  function ThemeRoutes({dataSesion}) {
  
  const dispatch = useDispatch();

  if(dataSesion!==0){
    dispatch(userAction(dataSesion))
  }

  return useRoutes(routes(dataSesion),config.basename)

}