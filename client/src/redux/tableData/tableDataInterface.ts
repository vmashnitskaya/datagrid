import { FilteringColumn } from '../../components/Table/Filtering/FilteringColumnInterface';
import { ColumnHeaders, ColumnInterface } from './ColumnInterface';

export interface RenderDataObject {
    [key: string]: any;
}

export interface NormalizedObject {
    [key: string]: RenderDataObject;
}

export interface TableDataInterface {
    renderData: NormalizedObject;
    allIds: string[];
    error: string;
    loading: boolean;
    columnHeaders: ColumnHeaders;
    tableColumnHeaders: ColumnInterface[];
    sorting: string;
    sortingColumn: string;
    sortedFilteredRenderDataIds: string[];
    sortFilterSlicedDataIds: string[];
    filteredColumnAndValue: FilteringColumn;
    checkedItems: string[];
    tabActive: string;
    infoMessage: string;
}
