import { ThunkAction } from 'redux-thunk';
import types, { AppDataActions } from './appDataTypes';
import { RootState } from '../rootReducer';
import { NormalizedData } from './appDataInterfaces';
import selectors from '../authentication/authenticationSelectors';
import dataHttp from '../dataHttp';
import normalizeData from '../normalizeData';

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

const fetchAppData = (): ThunkAction<Promise<void>, RootState, unknown, AppDataActions> => async (
    dispatch,
    getState
) => {
    try {
        dispatch(fetchAppDataPending());
        const token = selectors.getToken(getState());

        const userData = await dataHttp('/api/apps/', 'GET', null, {
            Authorization: `Bearer ${token}`,
        });

        const normalizedData = normalizeData(userData);

        dispatch(fetchAppDataSuccess(normalizedData));
    } catch (e) {
        dispatch(fetchAppDataFailed(e.message));
    }
};

export default fetchAppData;
