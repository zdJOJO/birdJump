import {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/actionTypes';

const initialState = {
    user: {},
    loginFail: false,  // true 表示登录失败
    loggingOut: false  //true 表示登出
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
      case LOGIN_SUCCESS:
          return{
              ...state,
              user: action.json
          }
      case LOGIN_FAIL:
          return{
              ...state,
              loginFail: action.isFail
          }
        default:
          return state;
  }
}
