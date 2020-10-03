import { FilteringColumn } from '../../components/Table/FilteringColumnInterface';

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
    sorting: string;
    sortingColumn: string;
    sortedFilteredRenderDataIds: number[];
    sortFilterSlicedDataIds: number[];
    filteredColumnAndValue: FilteringColumn;
    rowsPerPage: number;
    currentPage: number;
    totalPages: number;
}
