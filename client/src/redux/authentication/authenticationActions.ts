import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';
import types, { AuthActions } from './authenticationTypes';
import { Auth, User } from './authentificationInterfaces';
import authHttp from './authHttp';

const fetchAuthPending = (): AuthActions => ({
    type: types.FETCH_AUTH_PENDING,
});

const fetchAuthSuccess = (authData: Auth): AuthActions => ({
    type: types.FETCH_AUTH_SUCCESS,
    payload: authData,
});

const fetchAuthFailed = (error: string): AuthActions => ({
    type: types.FETCH_AUTH_FAILED,
    payload: error,
});

const logout = (): AuthActions => ({
    type: types.LOGOUT,
});

const registerUser = (
    userObject: User
): ThunkAction<Promise<void>, RootState, unknown, AuthActions> => async (dispatch) => {
    try {
        dispatch(fetchAuthPending());
        await authHttp('/api/auth/register', 'POST', { ...userObject });
        const data = await authHttp('/api/auth/login', 'POST', { ...userObject });
        dispatch(fetchAuthSuccess(data));
    } catch (e) {
        dispatch(fetchAuthFailed(e.message));
    }
};

const loginUser = (
    userObject: User
): ThunkAction<Promise<void>, RootState, unknown, AuthActions> => async (dispatch) => {
    try {
        dispatch(fetchAuthPending());
        const tokenData = await authHttp('/api/auth/login', 'POST', { ...userObject });
        dispatch(fetchAuthSuccess(tokenData));
    } catch (e) {
        dispatch(fetchAuthFailed(e.message));
    }
};

export default { loginUser, registerUser, logout };
