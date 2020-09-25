import { Reducer } from 'redux';
import types, { AppDataActions } from './appDataTypes';
import { AppDataState } from './appDataInterfaces';

const initialState = {
    appData: [],
    error: '',
    loading: false,
};

const appDataReducer: Reducer<AppDataState, AppDataActions> = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_APPDATA_PENDING:
            return { ...state, error: '', loading: true };
        case types.FETCH_APPDATA_SUCCESS:
            return {
                ...state,
                loading: false,
                appData: [...action.payload],
            };
        case types.FETCH_APPDATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default appDataReducer;
