import { combineReducers, Reducer } from 'redux';
import types, { TableDataActions } from './tableDataTypes';
import { RenderDataObject, TableDataInterface } from './tableDataInterface';
import sortingFilteringLogic from './sortingFilteringLogic';
import { FilteringColumn } from '../../components/Table/Filtering/FilteringColumnInterface';
import { ColumnInterface } from '../../components/ColumnInterface';
import pagingReducer from './paging/pagingReducer';

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
    tabActive: 'users',
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
        case types.SET_TAB_ACTIVE:
            return { ...state, tabActive: action.payload };
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
        case types.CHECK_ROW_CHECKBOX: {
            const _id = action.payload;
            const arrayChecked = state.checkedItems.includes(_id)
                ? state.checkedItems.filter((el) => el !== _id)
                : [...state.checkedItems, _id];
            return {
                ...state,
                checkedItems: state.sortedFilteredRenderDataIds.filter((el) =>
                    arrayChecked.includes(el)
                ),
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
        case types.SORT_RENDER_DATA: {
            const arrayToSort = [
                ...state.sortedFilteredRenderDataIds.map((elem) => state.renderData[elem]),
            ];
            sortingFilteringLogic.sortArray(arrayToSort, state.sortingColumn, state.sorting);
            return {
                ...state,
                sortedFilteredRenderDataIds: arrayToSort.map((el) => el._id),
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
                sortedFilteredRenderDataIds: data.map((el) => el._id),
            };
        }
        case types.DELETE_DATA_SUCCESS: {
            let array: string[] = [...state.allIds];
            action.payload.forEach((forEachEl) => {
                array = array.filter((filterEl) => filterEl !== forEachEl);
            });

            return {
                ...state,
                allIds: [...array],
                checkedItems: [],
            };
        }
        default:
            return state;
    }
};

const reducer = combineReducers({ tableData: tableDataReducer, paging: pagingReducer });

export default reducer;
