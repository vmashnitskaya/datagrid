import { FilteringColumn } from '../../components/Table/Filtering/FilteringColumnInterface';
import { ColumnInterface } from '../../components/ColumnInterface';

export interface RenderDataObject {
    [key: string]: any;
}

export interface NormalizedObject {
    [key: string]: RenderDataObject;
}

export interface TableDataInterface {
    renderData: NormalizedObject;
    allIds: number[];
    error: string;
    loading: boolean;
    columnHeaders: ColumnInterface[];
    sorting: string;
    sortingColumn: string;
    sortedFilteredRenderDataIds: number[];
    sortFilterSlicedDataIds: number[];
    filteredColumnAndValue: FilteringColumn;
    checkedItems: number[];
    rowsPerPage: number;
    currentPage: number;
    totalPages: number;
}
