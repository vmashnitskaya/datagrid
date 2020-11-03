import { ThunkAction } from 'redux-thunk';
import types, { UserdataActions } from './userDataTypes';
import { NormalizedData } from './userDataInterfaces';
import { RootState } from '../rootReducer';
import selectors from '../authentication/authenticationSelectors';
import dataHttp from '../dataHttp';
import normalizeData from '../normalizeData';

const fetchUserDataPending = (): UserdataActions => ({
    type: types.FETCH_USERDATA_PENDING,
});

const fetchUserDataSuccess = (userData: NormalizedData): UserdataActions => ({
    type: types.FETCH_USERDATA_SUCCESS,
    payload: userData,
});

const fetchUserDataFailed = (error: string): UserdataActions => ({
    type: types.FETCH_USERDATA_FAILED,
    payload: error,
});

const fetchUserData = (): ThunkAction<Promise<void>, RootState, unknown, UserdataActions> => async (
    dispatch,
    getState
) => {
    try {
        dispatch(fetchUserDataPending());
        const token = selectors.getToken(getState());

        const userData = await dataHttp(
            'https://datagrid-express.herokuapp.com/api/users/',
            'GET',
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        const normalizedData = normalizeData(userData);

        dispatch(fetchUserDataSuccess(normalizedData));
    } catch (e) {
        dispatch(fetchUserDataFailed(e.message));
    }
};

export default fetchUserData;
