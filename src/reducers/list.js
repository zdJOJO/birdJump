/**
 * Created by Administrator on 2017/02/23 0023.
 */


import {
    GET_COMMENT_LIST_SUCCESS
} from '../actions/list';

const initialState = {
    commentList: []
}

export default function list(state = initialState, action) {
    switch (action.type){
        case GET_COMMENT_LIST_SUCCESS:
            return{
                ...state,
                commentList: action.list
            }
        default:
            return state;
    }
}