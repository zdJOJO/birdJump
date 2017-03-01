/**
 * Created by Administrator on 2017/02/28 0028.
 */

import {port, getCookie, delCookie} from '../utils/index';

import {
    GET_GOOD_COLLECTIONLIST_SUCCESS,GET_GOODLIST_SUCCESS,
    ClEAN_FORM_DATA, CHANGE_STARTTIME, CHANGE_PIC,
    SHOW_ERROR,FETCH_SUCCESS,FETCH_ERROR,
    CHANGE_TABS,SET_FOLDERID,
    GET_FUUNDER_SUCCESS
} from '../actions/actionTypes'


//loading
const showLoadingFn =(isLoading)=>{
    if(isLoading){
        return{
            type: FETCH_ERROR
        }
    }else {
        return{
            type: FETCH_SUCCESS
        }
    }

}

//报错
export const showError =(isShowError)=>{
    return{
        type: SHOW_ERROR,
        isShowError
    }
}


//修改名称
export const cleanFormData =()=>{
    return{
        type: ClEAN_FORM_DATA
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

// 切换 tab   isSuccess都会变成 false
export const changeTab = currentKey =>{
    return{
        type: CHANGE_TABS,
        currentKey
    }
}

//folderId 设置
export const setFolderId = id =>{
    return{
        type: SET_FOLDERID,
        id
    }
}


// 获取列表
const getGoodCollectionListSuccess =(list, currentPage, totalPage)=>{
    return {
        type: GET_GOOD_COLLECTIONLIST_SUCCESS,
        list,
        currentPage,
        totalPage
    }
}

// 获取众筹
const getGoodListSuccess =(list, currentPage, totalPage) =>{
    return {
        type: GET_GOODLIST_SUCCESS,
        list,
        currentPage,
        totalPage
    }
}


//某众筹产品下的获取众筹人情况
const getFunderSuccees =(isShowFunder, _list)=>{
    return{
        type: GET_FUUNDER_SUCCESS,
        isShowFunder,
        _list
    }
}


//创建一个商品集合 POST
const createGoodCollection =(obj)=>{
    // obj.type=== 1 || 6
    let url = obj.type===1 ? port + '/fund/goodsFolder/create?token='+ getCookie('adminToken') +'&tp=' + parseInt(new Date().getTime()/1000, 10)
        : port + '/fund/goods/create?token=' + getCookie('adminToken') ;
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
                }else if(json.code === '201'){
                    if( obj.type===1){
                        dispatch( getList({type: 2, page: 1 }));
                        dispatch(changeTab(1))
                    }else {
                        dispatch( getList({type: 7, page: 1, id: obj.id }));
                        dispatch(changeTab(3))
                    }
                }else if(json.code === '601'){
                    console.log('创建失败')
                }
            })
            .catch( e =>{
                console.log(e)
            })
    }
}


//获取列表  GET
const getList =(obj)=>{
    let goodStr = obj.type===2 ? 'goodsFolder' : 'goodsFolder/goods/'+obj.id ;
    let url = port + '/fund/'+goodStr+'?currentPage=' + obj.page + '&size=10';
    return dispatch =>{
        dispatch(showLoadingFn(true))
        return fetch(url)
            .then( res=>{
                return res.json()
            }).
            then( json =>{
                if(obj.type===2){
                    dispatch(getGoodCollectionListSuccess(json.data.list, obj.page, json.data.pageCount))
                }else {
                    dispatch(getGoodListSuccess(json.data.list, obj.page, json.data.pageCount))
                }
                dispatch(showLoadingFn(false))
            })
            .catch( e =>{
                console.log(e)
            })
    }
}


//删除 DELETE
const deleteData =(obj)=>{
    let deleteStr = obj.type===5 ? 'goodsFolder' : 'goods'
    let url = port + '/fund/'+deleteStr+'/delete/' + obj.id + '?token=' + getCookie('adminToken');
    return dispatch =>{
        return fetch( url ,{
            method: 'DELETE'
        })
            .then( res =>{
                return res.json()
            })
            .then( json =>{
                dispatch(getList({
                    type: obj.type===5 ? 2 : 7,
                    page: obj.page,
                    id: obj.type===5 ? '' : obj.id
                }))
            })
            .catch( e =>{
                console.log(e)
            })
    }
}


//某众筹产品下的获取众筹人情况
const getFunder = (obj)=>{
    let url = obj.id ? port + '/fund/goods/fund/'+obj.id+'?currentPage=1&size=200&forUserId=0' : '' ;
    return dispatch =>{
        if(!obj.id){
            dispatch(getFunderSuccees(obj.isShowFunder));
            return
        }
        return fetch(url)
            .then( res=>{
                return res.json()
            })
            .then( json=>{
                if(json.data.list.length > 0){
                    dispatch(getFunderSuccees(obj.isShowFunder, json.data.list));
                }else {
                    dispatch(getFunderSuccees(obj.isShowFunder));
                }
            })
            .catch( e =>{
                console.log(e)
            } )
    }
}


/*
*  obj.type 取值
*  1 - 创建新商品集合
*  2 - 获取商品集合列表
*  4 - 编辑此商品集合
*  5 - 删除此商品集合
*
*  3 - 查看商品集合下的众筹列表
*  6 - 创建某商品集合下的众筹
*  7 - 获取某商品集合下的众筹列表
*  8 - 删除此众筹商品
*  9 - 查看某众筹商品下的具体众筹人数
* */
export const disPatchFetchFn =(obj)=>{
    return dispatch =>{
        switch (obj.type){
            case 1:
                return dispatch(createGoodCollection(obj));
            case 2:
                return dispatch(getList(obj));
            case 5:
                return dispatch(deleteData(obj));
            case 6:
                return dispatch(createGoodCollection(obj));
            case 7:
                return dispatch(getList(obj));
            case 8:
                return dispatch(deleteData(obj));
            case 9:
                return dispatch(getFunder(obj))
            default:
                return false
        }
    }
}