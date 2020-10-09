import { Action } from 'redux';
import { Auth } from './authentificationInterfaces';

const FETCH_AUTH_PENDING = 'FETCH_AUTH_PENDING';
const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS';
const FETCH_AUTH_FAILED = 'FETCH_AUTH_FAILED';

export default {
    FETCH_AUTH_PENDING,
    FETCH_AUTH_SUCCESS,
    FETCH_AUTH_FAILED,
} as const;

type FetchAuthPendingAction = Action<typeof FETCH_AUTH_PENDING>;

interface FetchAuthSuccessAction extends Action<typeof FETCH_AUTH_SUCCESS> {
    payload: Auth;
}

interface FetchAuthFailedAction extends Action<typeof FETCH_AUTH_FAILED> {
    payload: string;
}

export type AuthActions = FetchAuthFailedAction | FetchAuthPendingAction | FetchAuthSuccessAction;
