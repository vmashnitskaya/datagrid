import { Reducer } from 'redux';
import types, { TableDataActions } from './tableDataTypes';
import { TableDataInterface } from './TableDataInterface';

const filterStringsAndNumbers = (
    column: string,
    query: string,
    array: { [key: string]: any }[]
): { [key: string]: any }[] => {
    return array.filter((element) => {
        if (typeof element[column] === 'string') {
            return element[column].toLowerCase().startsWith(query.toLowerCase());
        }
        if (typeof element[column] === 'number') {
            return element[column] === Number(query);
        }
        return false;
    });
};

const initialState: TableDataInterface = {
    sorting: '',
    sortingColumn: '',
    sortedFilteredRenderData: [],
    notFilteredRenderData: [],
    filteredColumnAndValue: {},
    rowsPerPage: 10,
    currentPage: 1,
    totalPages: 1,
};

const tableDataReducer: Reducer<TableDataInterface, TableDataActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case types.SET_SORTING:
            return { ...state, sorting: action.payload };
        case types.SET_SORTING_COLUMN:
            return {
                ...state,
                sortingColumn: action.payload,
            };
        case types.SET_SORTED_FILTERED_RENDER_DATA:
            return {
                ...state,
                sortedFilteredRenderData: action.payload,
            };
        case types.SET_NOT_FILTERED_RENDER_DATA:
            return {
                ...state,
                notFilteredRenderData: action.payload,
            };
        case types.SET_FILTERED_COLUMN_AND_VALUE:
            return {
                ...state,
                filteredColumnAndValue: { ...state.filteredColumnAndValue, ...action.payload },
            };
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
        case types.SORT_RENDER_DATA: {
            const arrayToSort = [...state.sortedFilteredRenderData];
            arrayToSort.sort((a, b) => {
                if (a[state.sortingColumn] < b[state.sortingColumn]) {
                    return state.sorting === 'up' ? -1 : 1;
                }
                if (a[state.sortingColumn] > b[state.sortingColumn]) {
                    return state.sorting === 'up' ? 1 : -1;
                }
                return 0;
            });
            return {
                ...state,
                sortedFilteredRenderData: arrayToSort,
            };
        }
        case types.FILTER_RENDER_DATA: {
            const filteringColumns = Object.keys(state.filteredColumnAndValue).filter((element) => {
                return state.filteredColumnAndValue[element].length > 0;
            });

            let data: { [key: string]: any }[] = [...state.notFilteredRenderData];
            filteringColumns.forEach((column) => {
                data = filterStringsAndNumbers(column, state.filteredColumnAndValue[column], data);
            });
            return {
                ...state,
                sortedFilteredRenderData: data,
            };
        }
        default:
            return state;
    }
};

export default tableDataReducer;
