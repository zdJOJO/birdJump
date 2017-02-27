/**
 * Created by Administrator on 2017/02/27 0027.
 */
import { setCookie, port } from '../utils/index'

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './actionTypes'



//登录成功
const loginSuccess = json =>{
    return{
        type: LOGIN_SUCCESS,
        json
    }
}


//登录失败
const loginFail = (isFail) =>{
    return{
        type: LOGIN_FAIL,
        isFail
    }
}



//提交登录信息 POST
const fetchPost =(obj)=>{
    let url = port + '/fund/login';
    let data = {
        userName: obj.userName,
        password: obj.password
    }
    return dispatch => {
        return fetch( url ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then( res =>{
                return res.json()
            })
            .then( json =>{
                if(json.code === '101'){
                    dispatch(loginFail(true))
                }else if(json.code === '100'){
                    setCookie('adminToken', json.message, 365)
                    dispatch(loginSuccess(json.data))
                    dispatch(loginFail(false))
                    location.hash = '#/home';
                }
            })
            .catch( e =>{
                console.log(e)
                dispatch(loginFail(true))
            })
    }
}


export const disPatchFetchData =(obj)=>{
    return dispatch =>{
        dispatch(fetchPost(obj))
    }
}