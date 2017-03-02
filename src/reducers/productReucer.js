/**
 * Created by Administrator on 2017/02/28 0028.
 */
import {
    GET_GOOD_COLLECTIONLIST_SUCCESS, GET_GOODLIST_SUCCESS,
    ClEAN_FORM_DATA, CHANGE_STARTTIME, CHANGE_PIC, CHANGE_TABS,
    SHOW_ERROR,FETCH_SUCCESS,FETCH_ERROR,
    SET_FOLDERID,
    GET_FUUNDER_SUCCESS,
    CHANGE_EDIT_STATU
} from '../actions/actionTypes'

const initialState = {
    currentKey: '1', //控制 tab 当前的显示key
    isShowError: false,   //true 出现
    createData:{
        collectionTitle: '',
        pic: "",
        startTime: 0
    },   //创建商品合集
    isLoading: false,   //是否加载中 是-true
    goodCollectionList: [],
    totalPage: 1,   //总页数
    currentPage: 1,   //当期页数

    good: {
        folderId: '',   //某个商品集合id
        goodList: [],  // 某个商品集合的众筹列表
        info:{
            title: "",
            subtitle: "",
            detail: "",
            price: 0,
            sum: 1
        },  // 创建需要提交的信息
        totalPage: 1,  //总页数
        currentPage: 1,  //总页数
        isShowFunder: false, //展示具体众筹的人数
        goodFunderList: [], //展示具体众筹的人数
    },

    editId: ''      // 要编辑的id
};


export default function productReducer( state=initialState ,action) {
    switch (action.type){
        case SHOW_ERROR:
            return{
                ...state,
                isShowError: action.isShowError
            }
        case FETCH_SUCCESS:
            return{
                ...state,
                isLoading: false
            }
        case FETCH_ERROR:
            return{
                ...state,
                isLoading: true
            }
        case ClEAN_FORM_DATA:
            return{
                ...state,
                createData:{
                    ...state.createData,
                    collectionTitle: '',
                    pic: '',
                    startTime: ''
                },
                good:{
                    ...state.good,
                    info:　{
                        ...state.good.info,
                        title: '',
                        subtitle: '',
                        detail: '',
                        price: '',
                        sum: ''
                    }
                }

            }
        case CHANGE_STARTTIME:
            return{
                ...state,
                createData:{
                    ...state.createData,
                    startTime: action.startTime
                }
            }
        case CHANGE_PIC:
            return{
                ...state,
                createData:{
                    ...state.createData,
                    pic: action.pic
                }
            }
        case CHANGE_TABS:
            return{
                ...state,
                currentKey: String(action.currentKey),
                isSuccess: false,
                imgList: []
            }
        case SET_FOLDERID:
            return{
                ...state,
                good:{
                    ...state.good,
                    folderId: action.id
                }
            }
        case CHANGE_EDIT_STATU:
            if(action.typeNum === 1){
                return{
                    ...state,
                    editId: action.obj.id,
                    createData: {
                        ...state.createData,
                        collectionTitle: action.obj.title,
                        pic: action.obj.pic,
                        startTime: action.obj.startTime
                    }
                }
            }else if(action.typeNum === 2){
                return{
                    ...state,
                    editId: action.obj.id,
                    good:{
                        ...state.good,
                        info:　{
                            ...state.good.info,
                            title: action.obj.title,
                            subtitle: action.obj.subtitle,
                            detail: action.obj.detail,
                            price: action.obj.price,
                            sum: action.obj.sum
                        }
                    }
                }
            }else {
                return{
                    ...state,
                    editId: ''
                }
            }
        case GET_GOOD_COLLECTIONLIST_SUCCESS:
            return{
                ...state,
                goodCollectionList: action.list,
                currentPage: action.currentPage,
                totalPage: action.totalPage
            }
        case GET_GOODLIST_SUCCESS:
            return{
                ...state,
                good:{
                    ...state.good,
                    goodList: action.list,
                    currentPage: action.currentPage,
                    totalPage: action.totalPage
                }
            }
        case GET_FUUNDER_SUCCESS:
            return{
                ...state,
                good:{
                    ...state.good,
                    goodFunderList: action.list || [],
                    isShowFunder: action.isShowFunder
                }
            }
        default:
            return state
    }
}