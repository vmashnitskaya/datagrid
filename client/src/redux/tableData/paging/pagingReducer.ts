import { Reducer } from 'redux';
import types, { PagingActions } from './pagingTypes';

interface PagingState {
    rowsPerPage: number;
    currentPage: number;
    totalPages: number;
}

const initialState = {
    rowsPerPage: 10,
    currentPage: 1,
    totalPages: 1,
};

const pagingReducer: Reducer<PagingState, PagingActions> = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ROWS_PER_PAGE:
            return {
                ...state,
                rowsPerPage: action.payload,
            };
        case types.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        case types.SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.payload,
            };
        default:
            return state;
    }
};

export default pagingReducer;
