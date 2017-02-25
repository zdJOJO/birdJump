import { combineReducers } from 'redux';
import user from './user';
import menu from './menu';
import list from './list'

const rootReducer = combineReducers({
  user,
  menu,
  list
});

export default rootReducer;
