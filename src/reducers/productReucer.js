/**
 * Created by Administrator on 2017/02/28 0028.
 */
import {
    GET_GOOD_COLLECTIONLIST_SUCCESS,
    CHANGE_STARTTIME, CHANGE_PIC, CHANGE_TABS,
    SHOW_ERROR
} from '../actions/actionTypes'

const initialState = {
    currentKey: '1', //控制 tab 当前的显示key
    isShowError: false,   //true 出现
    createData:{
        pic: "",
        startTime: 0
    },
    goodCollectionList: []
};


export default function productReducer( state=initialState ,action) {
    switch (action.type){
        case SHOW_ERROR:
            return{
                ...state,
                isShowError: action.isShowError
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
                currentKey: action.key
            }
        case GET_GOOD_COLLECTIONLIST_SUCCESS:
            return{
                ...state,
                goodCollectionList: action.list
            }
        default:
            return state
    }
}