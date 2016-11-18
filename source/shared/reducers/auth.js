import {
    SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAIL,
    FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILED
} from '../actions/types';

export default function (auth = {logining: false, token: null, currentUser: null, loading: false}, action) {
    switch (action.type) {
        case SIGN_IN:
            return Object.assign({}, auth, {
                logining: true,
                token: null
            })
        case SIGN_IN_SUCCESS:
            return Object.assign({}, auth, {
                logining: false,
                token: action.result.data
            })
        case SIGN_IN_FAIL:
            return Object.assign({}, auth, {
                logining: false,
                token: null
            })

        case FETCH_USER:
            return Object.assign({}, auth, {
                loading: true,
                currentUser: null
            })
        case FETCH_USER_SUCCESS:
            return Object.assign({}, auth, {
                loading: false,
                currentUser: action.result.data?action.result.data:null
            })
        case FETCH_USER_FAILED:
            return Object.assign({}, auth, {
                loading: false,
                currentUser: null
            })
        default:
            return auth
    }

}