import { Action } from 'redux';
import { NormalizedData } from './appDataInterfaces';

const FETCH_APPDATA_PENDING = 'FETCH_APPDATA_PENDING';
const FETCH_APPDATA_SUCCESS = 'FETCH_APPDATA_SUCCESS';
const FETCH_APPDATA_FAILED = 'FETCH_APPDATA_FAILED';

type FetchAppDataPendingAction = Action<typeof FETCH_APPDATA_PENDING>;

interface FetchAppDataSuccessAction extends Action<typeof FETCH_APPDATA_SUCCESS> {
    payload: NormalizedData;
}

interface FetchAppDataFailedAction extends Action<typeof FETCH_APPDATA_FAILED> {
    payload: string;
}

export type AppDataActions =
    | FetchAppDataPendingAction
    | FetchAppDataSuccessAction
    | FetchAppDataFailedAction;

export default {
    FETCH_APPDATA_PENDING,
    FETCH_APPDATA_SUCCESS,
    FETCH_APPDATA_FAILED,
} as const;
