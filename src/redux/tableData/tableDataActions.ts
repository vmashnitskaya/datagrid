import types, { TableDataActions } from './tableDataTypes';

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
const setSortedFilteredRenderData = (
    sortedFilteredRenderData: { [key: string]: any }[]
): TableDataActions => {
    return {
        type: types.SET_SORTED_FILTERED_RENDER_DATA,
        payload: sortedFilteredRenderData,
    };
};
const setNotFilteredRenderData = (
    notFilteredRenderData: { [key: string]: any }[]
): TableDataActions => {
    return {
        type: types.SET_NOT_FILTERED_RENDER_DATA,
        payload: notFilteredRenderData,
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

export default {
    sortRenderData,
    setSorting,
    setSortingColumn,
    setSortedFilteredRenderData,
    setNotFilteredRenderData,
    setFilteredColumnAndValue,
    setRowsPerPage,
    setTotalPages,
    setCurrentPage,
    filterRenderData,
};
