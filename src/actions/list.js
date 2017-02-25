/**
 * Created by Administrator on 2017/02/23 0023.
 */
import {getCookie} from '../utils';

export const GET_COMMENT_LIST_SUCCESS = 'GET_COMMENT_LIST_SUCCESS';



//成功获取list
const getListSuccess = list =>{
    console.log(3333333)
    return{
        type: GET_COMMENT_LIST_SUCCESS,
        list
    }
}


const getList = ()=>{
    return dispatch =>{
        return fetch('http://test.winthen.com/card/commentv2?size=10&currentPage=1&type=29&itemId=7&isAudit=0')
            .then( res =>{
                return res.json()
            })
            .then( json =>{
                console.log(json.data.list)
                dispatch(getListSuccess(json.data.list))
            })
            .catch( e=>{
                console.log(e)
            })
    }
}



export const fetchInfo =(type)=>{
    return(dispatch, getState) =>{
        switch (type){
            case 0:
                return dispatch( getList() )
            default:
                return true
        }
    }
}

