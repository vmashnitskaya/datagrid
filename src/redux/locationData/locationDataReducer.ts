import { Reducer } from 'redux';
import types, { LocationDataActions } from './locationDataTypes';
import { LocationDataState } from './locationDataInterfaces';

const initialState = {
    locationData: [],
    error: '',
    loading: false,
};

const locationDataReducer: Reducer<LocationDataState, LocationDataActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case types.FETCH_LOCATIONDATA_PENDING:
            return { ...state, error: '', loading: true };
        case types.FETCH_LOCATIONDATA_SUCCESS:
            return {
                ...state,
                loading: false,
                locationData: [...action.payload],
            };
        case types.FETCH_LOCATIONDATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default locationDataReducer;
