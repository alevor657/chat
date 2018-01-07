import * as types from '../constants/actionTypes';
import {API_URL} from '../constants';
import axios from 'axios';

export function loginSuccess(token) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: token
    };
}

export function loginFailure() {
    return {
        type: types.LOGIN_FAILURE,
        payload: false
    };
}

export function login(formData) {
    return function(dispatch) {
        return axios.post(`${API_URL}/user/signin`, formData).then(function(res) {
            let { token } = res.data;

            dispatch(loginSuccess(token));
        }).catch(() => {
            dispatch(loginFailure());
        });
    };
}
