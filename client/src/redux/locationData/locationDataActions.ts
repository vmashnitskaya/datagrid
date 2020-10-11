import { ThunkAction } from 'redux-thunk';
import types, { LocationDataActions } from './locationDataTypes';
import { NormalizedData } from './locationDataInterfaces';
import { RootState } from '../rootReducer';
import selectors from '../authentication/authenticationSelectors';
import dataHttp from '../dataHttp';
import normalizeData from '../normalizeData';

const fetchLocationDataPending = (): LocationDataActions => ({
    type: types.FETCH_LOCATIONDATA_PENDING,
});

const fetchLocationDataSuccess = (locationData: NormalizedData): LocationDataActions => ({
    type: types.FETCH_LOCATIONDATA_SUCCESS,
    payload: locationData,
});

const fetchLocationDataFailed = (error: string): LocationDataActions => ({
    type: types.FETCH_LOCATIONDATA_FAILED,
    payload: error,
});

const fetchLocationData = (): ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    LocationDataActions
> => async (dispatch, getState) => {
    try {
        dispatch(fetchLocationDataPending());
        const token = selectors.getToken(getState());

        const userData = await dataHttp('/api/locations/', 'GET', null, {
            Authorization: `Bearer ${token}`,
        });

        const normalizedData = normalizeData(userData);

        dispatch(fetchLocationDataSuccess(normalizedData));
    } catch (e) {
        /* dispatch(fetchLocationDataFailed(e.message)); */
        console.log(e);
    }
};

export default fetchLocationData;
