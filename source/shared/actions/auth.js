import {
    LOAD_AUTH
} from './types';

import axios from 'axios'

export function loadAuth() {
    return dispatch => {
        return axios.get('/loadAuth').then((response)=>{
            dispatch({type: LOAD_AUTH, user: response.data});
        });
    }
}