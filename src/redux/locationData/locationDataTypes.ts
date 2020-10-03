import { Action } from 'redux';
import { NormalizedData } from './locationDataInterfaces';

const FETCH_LOCATIONDATA_PENDING = 'FETCH_LOCATIONDATA_PENDING';
const FETCH_LOCATIONDATA_SUCCESS = 'FETCH_LOCATIONDATA_SUCCESS';
const FETCH_LOCATIONDATA_FAILED = 'FETCH_LOCATIONDATA_FAILED';

type FetchLocationDataPendingAction = Action<typeof FETCH_LOCATIONDATA_PENDING>;

interface FetchLocationDataSuccessAction extends Action<typeof FETCH_LOCATIONDATA_SUCCESS> {
    payload: NormalizedData;
}

interface FetchLocationDataFailedAction extends Action<typeof FETCH_LOCATIONDATA_FAILED> {
    payload: string;
}

export type LocationDataActions =
    | FetchLocationDataPendingAction
    | FetchLocationDataSuccessAction
    | FetchLocationDataFailedAction;

export default {
    FETCH_LOCATIONDATA_PENDING,
    FETCH_LOCATIONDATA_SUCCESS,
    FETCH_LOCATIONDATA_FAILED,
} as const;
