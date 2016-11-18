import {
    SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAIL,
    FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILED
} from './types';

import { browserHistory } from 'react-router'

export function signInUser(username, password) {
    return {
        types: [SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAIL],
        promise: client => client.post('/signin', {
            username: username,
            password: password
        }),
        afterSuccess: (dispatch, getState, response) => {
            dispatch(fetchUser());
            localStorage.setItem('auth-token', getState().auth.token);
            if (getState().routing.locationBeforeTransitions) {
                const routingState = getState().routing.locationBeforeTransitions.state || {};
                browserHistory.push(routingState.nextPathname || '/');
            } else {
                browserHistory.push('/');
            }
        }
    };
}

export function fetchUser() {
    return {
        types: [FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILED],
        promise: client => client.get('/user')
    };
}

export function redirectToLoginWithMessage() {
    return (dispatch, getState) => {
        if (getState().routing.locationBeforeTransitions) {
            const currentPath = getState().routing.locationBeforeTransitions.pathname;
            browserHistory.replace({pathname: '/loginForm', state: {nextPathname: currentPath}});
        } else {
            browserHistory.push('/loginForm');
        }
    }
}