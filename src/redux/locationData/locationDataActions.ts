import { ThunkAction } from 'redux-thunk';
import types, { LocationDataActions } from './locationDataTypes';
import { NormalizedData } from './locationDataInterfaces';
import fetchApiData from '../api';
import { RootState } from '../rootReducer';

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

const fetchLocationData = (
    tabActive: string
): ThunkAction<Promise<void>, RootState, unknown, LocationDataActions> => async (dispatch) => {
    try {
        dispatch(fetchLocationDataPending());
        const locationData = fetchApiData(tabActive.toLowerCase());
        dispatch(fetchLocationDataSuccess(locationData));
    } catch (e) {
        dispatch(fetchLocationDataFailed(e.message));
    }
};

export default fetchLocationData;
