import { RootState } from '../rootReducer';
import { FilteringColumn } from '../../components/Table/Filtering/FilteringColumnInterface';
import { NormalizedObject, RenderDataObject } from './tableDataInterface';
import { ColumnInterface } from '../../components/ColumnInterface';

const getRenderData = (state: RootState): NormalizedObject => state.tableData.renderData;
const getLoading = (state: RootState): boolean => state.tableData.loading;
const getError = (state: RootState): string => state.tableData.error;
const getAllIds = (state: RootState): string[] => state.tableData.allIds;
const getColumnHeaders = (state: RootState): ColumnInterface[] => state.tableData.columnHeaders;
const getTabActive = (state: RootState): string => state.tableData.tabActive;

const getSorting = (state: RootState): string => state.tableData.sorting;
const getSortingColumn = (state: RootState): string => state.tableData.sortingColumn;
const getSortedFilteredRenderDataIds = (state: RootState): string[] =>
    state.tableData.sortedFilteredRenderDataIds;
const getSortFilterSlicedDataIds = (state: RootState): string[] =>
    state.tableData.sortFilterSlicedDataIds;
const getFilteredColumnAndValue = (state: RootState): FilteringColumn =>
    state.tableData.filteredColumnAndValue;
const getRowsPerPage = (state: RootState): number => state.tableData.rowsPerPage;
const getCurrentPage = (state: RootState): number => state.tableData.currentPage;
const getTotalPages = (state: RootState): number => state.tableData.totalPages;
const getElementById = (state: RootState, id: string): RenderDataObject =>
    state.tableData.renderData[id];
const getCheckedItems = (state: RootState): string[] => state.tableData.checkedItems;

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
    getColumnHeaders,
    getCheckedItems,
    getTabActive,
};
