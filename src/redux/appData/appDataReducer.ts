import { Reducer } from 'redux';
import types, { AppDataActions } from './appDataTypes';
import { AppDataState } from './appDataInterfaces';

const initialState = {
    appData: {},
    allIds: [],
    error: '',
    loading: false,
};

const appDataReducer: Reducer<AppDataState, AppDataActions> = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_APPDATA_PENDING:
            return { ...state, error: '', loading: true, appData: {}, allIds: [] };
        case types.FETCH_APPDATA_SUCCESS:
            return {
                ...state,
                loading: false,
                appData: { ...action.payload.dataNormalized },
                allIds: { ...action.payload.allIds },
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
