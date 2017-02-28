import { combineReducers } from 'redux';
import user from './user';
import menu from './menu';
import productReducer from './productReucer'

const rootReducer = combineReducers({
  user,
  menu,
  productReducer
});

export default rootReducer;
