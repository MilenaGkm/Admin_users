import { combineReducers } from 'redux';
import users from './users';
import msgs from './msgs';
import schedule from './schedule';

const rootReducer = combineReducers({
    users: users,
    msgs: msgs,
    schedule: schedule,
});

export default rootReducer;