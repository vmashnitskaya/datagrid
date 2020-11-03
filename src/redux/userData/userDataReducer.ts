import { Reducer } from 'redux';
import types, { UserdataActions } from './userDataTypes';
import { UserDataState } from './userDataInterfaces';

const initialState = {
    userData: {},
    allIds: [],
    error: '',
    loading: false,
};

const userDataReducer: Reducer<UserDataState, UserdataActions> = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_USERDATA_PENDING:
            return { ...state, error: '', loading: true, userData: {}, allIds: [] };
        case types.FETCH_USERDATA_SUCCESS:
            return {
                ...state,
                loading: false,
                userData: action.payload.dataNormalized,
                allIds: action.payload.allIds,
            };
        case types.FETCH_USERDATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userDataReducer;
