import { Reducer } from 'redux';
import types, { AuthActions } from './authenticationTypes';
import { AuthState } from './authentificationInterfaces';

const initialState = {
    token: '',
    userId: '',
    error: '',
    loading: false,
};

const authReducer: Reducer<AuthState, AuthActions> = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_AUTH_PENDING:
            return { ...state, error: '', loading: true, token: '', userId: '' };
        case types.FETCH_AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                userId: action.payload.userId,
            };
        case types.FETCH_AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
                token: '',
                userId: '',
            };
        default:
            return state;
    }
};

export default authReducer;
