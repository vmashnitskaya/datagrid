import { ThunkAction } from 'redux-thunk';
import types, { AppDataActions } from './appDataTypes';
import fetchApiData from '../api';
import { RootState } from '../rootReducer';
import { NormalizedData } from './appDataInterfaces';

const fetchAppDataPending = (): AppDataActions => ({
    type: types.FETCH_APPDATA_PENDING,
});

const fetchAppDataSuccess = (appData: NormalizedData): AppDataActions => ({
    type: types.FETCH_APPDATA_SUCCESS,
    payload: appData,
});

const fetchAppDataFailed = (error: string): AppDataActions => ({
    type: types.FETCH_APPDATA_FAILED,
    payload: error,
});

const fetchAppData = (
    tabActive: string
): ThunkAction<Promise<void>, RootState, unknown, AppDataActions> => async (dispatch) => {
    try {
        dispatch(fetchAppDataPending());
        const appData = fetchApiData(tabActive.toLowerCase());
        dispatch(fetchAppDataSuccess(appData));
    } catch (e) {
        dispatch(fetchAppDataFailed(e.message));
    }
};

export default fetchAppData;
