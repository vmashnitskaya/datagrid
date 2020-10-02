import { RootState } from '../rootReducer';
import { FilteringColumn } from '../../components/Table/FilteringColumnInterface';

const getSorting = (state: RootState): string => state.tableData.sorting;
const getSortingColumn = (state: RootState): string => state.tableData.sortingColumn;
const getSortedFilteredRenderData = (state: RootState): { [key: string]: any }[] =>
    state.tableData.sortedFilteredRenderData;
const getNotFilteredRenderData = (state: RootState): { [key: string]: any }[] =>
    state.tableData.notFilteredRenderData;
const getFilteredColumnAndValue = (state: RootState): FilteringColumn =>
    state.tableData.filteredColumnAndValue;
const getRowsPerPage = (state: RootState): number => state.tableData.rowsPerPage;
const getCurrentPage = (state: RootState): number => state.tableData.currentPage;
const getTotalPages = (state: RootState): number => state.tableData.totalPages;

export default {
    getSorting,
    getSortingColumn,
    getSortedFilteredRenderData,
    getNotFilteredRenderData,
    getFilteredColumnAndValue,
    getTotalPages,
    getCurrentPage,
    getRowsPerPage,
};
