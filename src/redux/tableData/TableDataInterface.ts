import { FilteringColumn } from '../../components/Table/FilteringColumnInterface';

export interface TableDataInterface {
    sorting: string;
    sortingColumn: string;
    sortedFilteredRenderData: { [key: string]: any }[];
    notFilteredRenderData: { [key: string]: any }[];
    filteredColumnAndValue: FilteringColumn;
    rowsPerPage: number;
    currentPage: number;
    totalPages: number;
}
