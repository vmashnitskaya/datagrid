import types, { TableDataActions } from './tableDataTypes';
import { FilteringColumn } from '../../components/Table/FilteringColumnInterface';

function sortRenderData(): TableDataActions {
    return {
        type: types.SORT_RENDER_DATA,
    };
}

function setSorting(direction: string): TableDataActions {
    return {
        type: types.SET_SORTING,
        payload: direction,
    };
}
function setSortingColumn(column: string): TableDataActions {
    return {
        type: types.SET_SORTING_COLUMN,
        payload: column,
    };
}
function setSortedFilteredRenderData(
    sortedFilteredRenderData: { [key: string]: any }[]
): TableDataActions {
    return {
        type: types.SET_SORTED_FILTERED_RENDER_DATA,
        payload: sortedFilteredRenderData,
    };
}
function setNotFilteredRenderData(
    notFilteredRenderData: { [key: string]: any }[]
): TableDataActions {
    return {
        type: types.SET_NOT_FILTERED_RENDER_DATA,
        payload: notFilteredRenderData,
    };
}
function setFilteredColumnAndValue(filteredColumnAndValue: FilteringColumn): TableDataActions {
    return {
        type: types.SET_FILTERED_COLUMN_AND_VALUE,
        payload: filteredColumnAndValue,
    };
}
function setRowsPerPage(rowsPerPage: number): TableDataActions {
    return {
        type: types.SET_ROWS_PER_PAGE,
        payload: rowsPerPage,
    };
}
function setCurrentPage(currentPage: number): TableDataActions {
    return {
        type: types.SET_CURRENT_PAGE,
        payload: currentPage,
    };
}
function setTotalPages(totalPages: number): TableDataActions {
    return {
        type: types.SET_TOTAL_PAGES,
        payload: totalPages,
    };
}
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
};
