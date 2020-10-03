import { RootState } from '../rootReducer';
import { FilteringColumn } from '../../components/Table/FilteringColumnInterface';
import { NormalizedObject, RenderDataObject } from './tableDataInterface';

const getRenderData = (state: RootState): NormalizedObject => state.tableData.renderData;
const getLoading = (state: RootState): boolean => state.tableData.loading;
const getError = (state: RootState): string => state.tableData.error;
const getAllIds = (state: RootState): number[] => state.tableData.allIds;

const getSorting = (state: RootState): string => state.tableData.sorting;
const getSortingColumn = (state: RootState): string => state.tableData.sortingColumn;
const getSortedFilteredRenderDataIds = (state: RootState): number[] =>
    state.tableData.sortedFilteredRenderDataIds;
const getSortFilterSlicedDataIds = (state: RootState): number[] =>
    state.tableData.sortFilterSlicedDataIds;
const getFilteredColumnAndValue = (state: RootState): FilteringColumn =>
    state.tableData.filteredColumnAndValue;
const getRowsPerPage = (state: RootState): number => state.tableData.rowsPerPage;
const getCurrentPage = (state: RootState): number => state.tableData.currentPage;
const getTotalPages = (state: RootState): number => state.tableData.totalPages;
const getElementById = (state: RootState, id: number): RenderDataObject =>
    state.tableData.renderData[id];

export default {
    getSorting,
    getSortingColumn,
    getSortFilterSlicedDataIds,
    getFilteredColumnAndValue,
    getTotalPages,
    getCurrentPage,
    getRowsPerPage,
    getSortedFilteredRenderDataIds,
    getRenderData,
    getAllIds,
    getLoading,
    getError,
    getElementById,
};
