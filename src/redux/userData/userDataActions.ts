import { ThunkAction } from 'redux-thunk';
import { strict } from 'assert';
import types, { UserdataActions } from './userDataTypes';
import { DataObject } from './userDataInterfaces';
import fetchApiData from '../api';
import { RootState } from '../rootReducer';

const fetchUserDataPending = (): UserdataActions => ({
    type: types.FETCH_USERDATA_PENDING,
});

const fetchUserDataSuccess = (userData: DataObject[]): UserdataActions => ({
    type: types.FETCH_USERDATA_SUCCESS,
    payload: userData,
});

const fetchUserDataFailed = (error: string): UserdataActions => ({
    type: types.FETCH_USERDATA_FAILED,
    payload: error,
});

const fetchUserData = (
    tabActive: string
): ThunkAction<Promise<void>, RootState, unknown, UserdataActions> => async (dispatch) => {
    try {
        dispatch(fetchUserDataPending());
        const userData = fetchApiData(tabActive.toLowerCase());
        dispatch(fetchUserDataSuccess(userData));
    } catch (e) {
        dispatch(fetchUserDataFailed(e.message));
    }
};

export default fetchUserData;
