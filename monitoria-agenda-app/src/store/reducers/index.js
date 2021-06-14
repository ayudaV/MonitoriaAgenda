import {combineReducers} from 'redux';

import login from './login';
import horario from './horario';

export default combineReducers({
    login,
    horario
})