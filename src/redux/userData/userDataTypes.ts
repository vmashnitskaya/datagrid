import { Action } from 'redux';
import { DataObject } from './userDataInterfaces';

const FETCH_USERDATA_PENDING = 'FETCH_USERDATA_PENDING';
const FETCH_USERDATA_SUCCESS = 'FETCH_USERDATA_SUCCESS';
const FETCH_USERDATA_FAILED = 'FETCH_USERDATA_FAILED';

type FetchUserdataPendingAction = Action<typeof FETCH_USERDATA_PENDING>;

interface FetchUserdataSuccessAction extends Action<typeof FETCH_USERDATA_SUCCESS> {
    payload: DataObject[];
}

interface FetchUserdataFailedAction extends Action<typeof FETCH_USERDATA_FAILED> {
    payload: string;
}

export type UserdataActions =
    | FetchUserdataPendingAction
    | FetchUserdataSuccessAction
    | FetchUserdataFailedAction;

export default {
    FETCH_USERDATA_PENDING,
    FETCH_USERDATA_SUCCESS,
    FETCH_USERDATA_FAILED,
} as const;
