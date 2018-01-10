import * as types from '../constants/actionTypes';

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return Object.assign({}, action.payload);
        case types.LOGIN_FAILURE:
            return {};
        case types.LOGOUT:
            return {};
        default:
            return state;
    }
}
