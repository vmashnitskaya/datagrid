import { ThunkAction } from 'redux-thunk';
import types, { TableDataActions } from './tableDataTypes';
import { NormalizedObject } from './tableDataInterface';
import { ColumnInterface } from '../../components/ColumnInterface';
import { RootState } from '../rootReducer';
import selectors from './tableDataSelectors';
import authSelectors from '../authentication/authenticationSelectors';
import dataHttp from '../dataHttp';

const sortRenderData = (): TableDataActions => {
    return {
        type: types.SORT_RENDER_DATA,
    };
};

const setSorting = (direction: string): TableDataActions => {
    return {
        type: types.SET_SORTING,
        payload: direction,
    };
};
const setSortingColumn = (column: string): TableDataActions => {
    return {
        type: types.SET_SORTING_COLUMN,
        payload: column,
    };
};
const setColumnHeaders = (columnHeaders: ColumnInterface[]): TableDataActions => {
    return {
        type: types.SET_COLUMN_HEADERS,
        payload: columnHeaders,
    };
};
const setSortedFilteredRenderDataIds = (allIds: string[]): TableDataActions => {
    return {
        type: types.SET_SORTED_FILTERED_RENDER_DATA_IDS,
        payload: allIds,
    };
};

const setSortFilterSlicedDataIds = (sortFilterSlicedDataIds: string[]): TableDataActions => {
    return {
        type: types.SET_SORT_FILTER_SLICED_DATA_IDS,
        payload: sortFilterSlicedDataIds,
    };
};

const setFilteredColumnAndValue = (newEntry: { [key: string]: string }): TableDataActions => {
    return {
        type: types.SET_FILTERED_COLUMN_AND_VALUE,
        payload: newEntry,
    };
};
const setRowsPerPage = (rowsPerPage: number): TableDataActions => {
    return {
        type: types.SET_ROWS_PER_PAGE,
        payload: rowsPerPage,
    };
};
const setCurrentPage = (currentPage: number): TableDataActions => {
    return {
        type: types.SET_CURRENT_PAGE,
        payload: currentPage,
    };
};
const setTotalPages = (totalPages: number): TableDataActions => {
    return {
        type: types.SET_TOTAL_PAGES,
        payload: totalPages,
    };
};

const filterRenderData = (): TableDataActions => {
    return {
        type: types.FILTER_RENDER_DATA,
    };
};

const setRenderData = (renderData: NormalizedObject): TableDataActions => {
    return {
        type: types.SET_RENDER_DATA,
        payload: renderData,
    };
};

const setLoading = (): TableDataActions => {
    return {
        type: types.SET_LOADING,
    };
};

const setError = (error: string): TableDataActions => {
    return {
        type: types.SET_ERROR,
        payload: error,
    };
};

const setAllIds = (allIds: string[]): TableDataActions => {
    return {
        type: types.SET_ALL_IDS,
        payload: allIds,
    };
};

const resetFilters = (): TableDataActions => {
    return {
        type: types.RESET_FILTERS,
    };
};

const checkRowCheckbox = (id: string): TableDataActions => {
    return {
        type: types.CHECK_ROW_CHECKBOX,
        payload: id,
    };
};

const deleteDataPending = (): TableDataActions => {
    return {
        type: types.DELETE_DATA_PENDING,
    };
};

const deleteDataSuccess = (ids: string[]): TableDataActions => {
    return {
        type: types.DELETE_DATA_SUCCESS,
        payload: ids,
    };
};

const deleteDataFailed = (error: string): TableDataActions => {
    return {
        type: types.DELETE_DATA_FAILED,
        payload: error,
    };
};

const setTabActive = (tabActive: string): TableDataActions => {
    return {
        type: types.SET_TAB_ACTIVE,
        payload: tabActive,
    };
};

const deleteRows = (): ThunkAction<Promise<void>, RootState, unknown, TableDataActions> => async (
    dispatch,
    getState
) => {
    try {
        dispatch(deleteDataPending());
        const rowsSelected = selectors.getCheckedItems(getState());
        const token = authSelectors.getToken(getState());
        const tabActive = selectors.getTabActive(getState()).toLowerCase();

        const result = await dataHttp(
            `/api/${tabActive}/delete`,
            'DELETE',
            { rowsSelected },
            {
                Authorization: `Bearer ${token}`,
            }
        );
        dispatch(deleteDataSuccess(result.ids));
    } catch (e) {
        dispatch(deleteDataFailed(e.message));
    }
};

export default {
    sortRenderData,
    setSorting,
    setSortingColumn,
    setSortedFilteredRenderDataIds,
    setFilteredColumnAndValue,
    setRowsPerPage,
    setTotalPages,
    setCurrentPage,
    filterRenderData,
    setSortFilterSlicedDataIds,
    setRenderData,
    setLoading,
    setError,
    setAllIds,
    setColumnHeaders,
    resetFilters,
    checkRowCheckbox,
    deleteRows,
    setTabActive,
};
