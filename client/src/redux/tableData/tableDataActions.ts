import { ThunkAction } from 'redux-thunk';
import types, { TableDataActions } from './tableDataTypes';
import { NormalizedObject } from './tableDataInterface';
import { ColumnInterface } from '../../components/ColumnInterface';
import { RootState } from '../rootReducer';
import selectors from './tableDataSelectors';
import authSelectors from '../authentication/authenticationSelectors';
import dataHttp from '../dataHttp';
import normalizeData from '../normalizeData';

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

const modifyDataPending = (): TableDataActions => {
    return {
        type: types.MODIFY_DATA_PENDING,
    };
};

const deleteDataSuccess = (data: { [key: string]: any }): TableDataActions => {
    return {
        type: types.DELETE_DATA_SUCCESS,
        payload: data,
    };
};

const addDataSuccess = (data: { [key: string]: any }): TableDataActions => {
    return {
        type: types.ADD_DATA_SUCCESS,
        payload: data,
    };
};

const modifyDataFailed = (error: string): TableDataActions => {
    return {
        type: types.MODIFY_DATA_FAILED,
        payload: error,
    };
};

const setTabActive = (tabActive: string): TableDataActions => {
    return {
        type: types.SET_TAB_ACTIVE,
        payload: tabActive,
    };
};

const resetMessages = (): TableDataActions => {
    return {
        type: types.RESET_MESSAGES,
    };
};

const deleteRows = (): ThunkAction<Promise<void>, RootState, unknown, TableDataActions> => async (
    dispatch,
    getState
) => {
    try {
        dispatch(modifyDataPending());
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
        const message = `${result.deleted} ${
            result.deleted === 1 ? 'row was' : 'rows were'
        } deleted`;
        dispatch(deleteDataSuccess({ ids: result.ids, message }));
    } catch (e) {
        dispatch(modifyDataFailed(e.message));
    }
};

const addNewRow = (object: {
    [key: string]: string;
}): ThunkAction<Promise<void>, RootState, unknown, TableDataActions> => async (
    dispatch,
    getState
) => {
    try {
        dispatch(modifyDataPending());
        const token = authSelectors.getToken(getState());
        const tabActive = selectors.getTabActive(getState()).toLowerCase();

        const result = await dataHttp(`/api/${tabActive}/create`, 'POST', object, {
            Authorization: `Bearer ${token}`,
        });
        dispatch(addDataSuccess(result));
    } catch (e) {
        dispatch(modifyDataFailed(e.message));
    }
};

export default {
    sortRenderData,
    setSorting,
    setSortingColumn,
    setSortedFilteredRenderDataIds,
    setFilteredColumnAndValue,
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
    addNewRow,
    resetMessages,
};
