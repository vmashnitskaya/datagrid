import types, { TableDataActions } from './tableDataTypes';
import { NormalizedObject } from './tableDataInterface';

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
const setSortedFilteredRenderDataIds = (allIds: number[]): TableDataActions => {
    return {
        type: types.SET_SORTED_FILTERED_RENDER_DATA_IDS,
        payload: allIds,
    };
};

const setSortFilterSlicedDataIds = (sortFilterSlicedDataIds: number[]): TableDataActions => {
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

const setAllIds = (allIds: number[]): TableDataActions => {
    return {
        type: types.SET_ALL_IDS,
        payload: allIds,
    };
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
};
