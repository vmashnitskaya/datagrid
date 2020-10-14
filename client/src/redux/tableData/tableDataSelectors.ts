import { RootState } from '../rootReducer';
import { FilteringColumn } from '../../components/Table/Filtering/FilteringColumnInterface';
import { NormalizedObject, RenderDataObject } from './tableDataInterface';
import { ColumnInterface } from '../../components/ColumnInterface';

const getRenderData = (state: RootState): NormalizedObject => state.tableData.tableData.renderData;
const getLoading = (state: RootState): boolean => state.tableData.tableData.loading;
const getError = (state: RootState): string => state.tableData.tableData.error;
const getInfoMessage = (state: RootState): string => state.tableData.tableData.infoMessage;
const getAllIds = (state: RootState): string[] => state.tableData.tableData.allIds;
const getColumnHeaders = (state: RootState): ColumnInterface[] =>
    state.tableData.tableData.columnHeaders;
const getTabActive = (state: RootState): string => state.tableData.tableData.tabActive;

const getSorting = (state: RootState): string => state.tableData.tableData.sorting;
const getSortingColumn = (state: RootState): string => state.tableData.tableData.sortingColumn;
const getSortedFilteredRenderDataIds = (state: RootState): string[] =>
    state.tableData.tableData.sortedFilteredRenderDataIds;
const getSortFilterSlicedDataIds = (state: RootState): string[] =>
    state.tableData.tableData.sortFilterSlicedDataIds;
const getFilteredColumnAndValue = (state: RootState): FilteringColumn =>
    state.tableData.tableData.filteredColumnAndValue;
const getElementById = (state: RootState, id: string): RenderDataObject =>
    state.tableData.tableData.renderData[id];
const getCheckedItems = (state: RootState): string[] => state.tableData.tableData.checkedItems;

export default {
    getSorting,
    getSortingColumn,
    getSortFilterSlicedDataIds,
    getFilteredColumnAndValue,
    getSortedFilteredRenderDataIds,
    getRenderData,
    getAllIds,
    getLoading,
    getError,
    getElementById,
    getColumnHeaders,
    getCheckedItems,
    getTabActive,
    getInfoMessage,
};
