import {
    LOAD_AUTH
} from '../actions/types';

export default function (auth = {authenticated: false, currentUser: null, loading: false}, action) {
    switch (action.type) {
        case LOAD_AUTH:
            return Object.assign({}, auth, {
                authenticated: true,
                currentUser: action.user,
                loading: false
            })
        default:
            return auth
    }

}