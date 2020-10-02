import { FilteringColumn } from '../../components/Table/FilteringColumnInterface';

export interface RenderDataObject {
    [key: string]: any;
}

export interface TableDataInterface {
    sorting: string;
    sortingColumn: string;
    sortedFilteredRenderData: RenderDataObject[];
    notFilteredRenderData: RenderDataObject[];
    filteredColumnAndValue: FilteringColumn;
    rowsPerPage: number;
    currentPage: number;
    totalPages: number;
}
