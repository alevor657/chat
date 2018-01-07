import * as types from '../constants/actionTypes';

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return Object.assign({}, {token: action.payload});
        case types.LOGIN_FAILURE:
            return {};
        default:
            return state;
    }
}
