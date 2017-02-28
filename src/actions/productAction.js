/**
 * Created by Administrator on 2017/02/28 0028.
 */

import {port, getCookie, delCookie} from '../utils/index';

import {
    GET_GOOD_COLLECTIONLIST_SUCCESS,
    CHANGE_STARTTIME, CHANGE_PIC,
    SHOW_ERROR,
    CHANGE_TABS
} from '../actions/actionTypes'



//报错
export const showError =(isShowError)=>{
    return{
        type: SHOW_ERROR,
        isShowError
    }
}

//修改时间
export const changeStartTime =(startTime)=>{
    return{
        type: CHANGE_STARTTIME,
        startTime
    }
}

//修改图片
export const changePic =(pic)=>{
    return{
        type: CHANGE_PIC,
        pic
    }
}


// 切换 tab
export const changeTab = key =>{
    return{
        type: CHANGE_TABS,
        key
    }
}



// 获取列表
const getGoodCollectionListSuccess =(list)=>{
    return {
        type: GET_GOOD_COLLECTIONLIST_SUCCESS,
        list
    }
}


//创建一个商品集合
const createGoodCollection =(obj)=>{
    let url = port + '/fund/goodsFolder/create?token='+ getCookie('adminToken') +'&tp=' + parseInt(new Date().getTime()/1000, 10);
    let data = obj.data;
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
                if(json.code === '666'){
                    delCookie('adminToken');
                    location.hash = '#/login';
                    return
                }
                dispatch( getGoodCollectionList({ page: 1 }))
            })
            .catch( e =>{
                console.log(e)
            })
    }
}


//获取 商品集合列表  GET
const getGoodCollectionList =(obj)=>{
    return dispatch =>{
        return fetch( port + '/fund/goodsFolder?currentPage='+obj.page+'&size=10')
            .then( res=>{
                return res.json()
            }).
            then( json =>{
                dispatch(getGoodCollectionListSuccess(json.data.list))
            })
            .catch( e =>{
                console.log(e)
            })
    }
}


/*
*  obj.type 取值
*  1 - 创建新商品集合
*  2 - 获取商品集合列表
* */
export const disPatchFetchFn =(obj)=>{
    return dispatch =>{
        switch (obj.type){
            case 1:
                return dispatch(createGoodCollection(obj));
            case 2:
                return dispatch(getGoodCollectionList(obj));
            default:
                return false
        }
    }
}