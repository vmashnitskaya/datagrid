import { Reducer } from 'redux';
import types, { TableDataActions } from './tableDataTypes';
import { RenderDataObject, TableDataInterface } from './tableDataInterface';
import sortingFilteringLogic from './sortingFilteringLogic';
import { FilteringColumn } from '../../components/Table/Filtering/FilteringColumnInterface';
import { ColumnInterface } from '../../components/ColumnInterface';

const initialState = {
    renderData: {},
    allIds: [],
    error: '',
    columnHeaders: [],
    loading: false,
    sorting: '',
    sortingColumn: '',
    sortedFilteredRenderDataIds: [],
    sortFilterSlicedDataIds: [],
    filteredColumnAndValue: {},
    checkedItems: [],
    rowsPerPage: 10,
    currentPage: 1,
    totalPages: 1,
};

const tableDataReducer: Reducer<TableDataInterface, TableDataActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case types.SET_RENDER_DATA:
            return { ...state, renderData: action.payload, loading: false };
        case types.SET_ALL_IDS:
            return { ...state, allIds: action.payload, loading: false };
        case types.SET_LOADING:
            return { ...state, loading: true };
        case types.SET_ERROR:
            return { ...state, error: action.payload };
        case types.SET_COLUMN_HEADERS:
            return { ...state, columnHeaders: [...action.payload] };
        case types.SET_SORTING:
            return { ...state, sorting: action.payload };
        case types.SET_SORTING_COLUMN:
            return {
                ...state,
                sortingColumn: action.payload,
            };
        case types.SET_SORTED_FILTERED_RENDER_DATA_IDS:
            return {
                ...state,
                sortedFilteredRenderDataIds: action.payload,
            };
        case types.SET_SORT_FILTER_SLICED_DATA_IDS:
            return {
                ...state,
                sortFilterSlicedDataIds: action.payload,
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
        case types.CHECK_ROW_CHECKBOX: {
            const id = Number(action.payload);
            return {
                ...state,
                checkedItems: state.checkedItems.includes(id)
                    ? state.checkedItems.filter((el) => el !== id)
                    : [...state.checkedItems, id],
            };
        }
        case types.RESET_FILTERS: {
            return {
                ...state,
                filteredColumnAndValue: {
                    ...state.columnHeaders.reduce(
                        (acc: FilteringColumn, el: ColumnInterface) => ({ ...acc, [el.name]: '' }),
                        {} as FilteringColumn
                    ),
                },
            };
        }
        case types.SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.payload,
            };
        case types.SORT_RENDER_DATA: {
            const arrayToSort = [
                ...state.sortedFilteredRenderDataIds.map((elem) => state.renderData[elem]),
            ];
            sortingFilteringLogic.sortArray(arrayToSort, state.sortingColumn, state.sorting);
            return {
                ...state,
                sortedFilteredRenderDataIds: arrayToSort.map((el) => el.id),
            };
        }
        case types.FILTER_RENDER_DATA: {
            const filteringColumns = Object.keys(state.filteredColumnAndValue).filter((el) => {
                return state.filteredColumnAndValue[el].length > 0;
            });

            let data: RenderDataObject[] = [...state.allIds.map((elem) => state.renderData[elem])];
            filteringColumns.forEach((column) => {
                data = sortingFilteringLogic.filterStringsAndNumbers(
                    column,
                    state.filteredColumnAndValue[column],
                    data
                );
            });
            return {
                ...state,
                sortedFilteredRenderDataIds: data.map((el) => el.id),
            };
        }
        case types.DELETE_ROWS: {
            let array: number[] = [];
            state.checkedItems.forEach((forEachEl) => {
                array = state.allIds.filter((filterEl) => filterEl !== forEachEl);
            });
            return {
                ...state,
                allIds: [...array],
            };
        }
        default:
            return state;
    }
};

export default tableDataReducer;
