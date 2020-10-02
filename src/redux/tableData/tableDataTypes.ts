import { Action } from 'redux';
import { FilteringColumn } from '../../components/Table/FilteringColumnInterface';

const SET_SORTING = 'SET_SORTING';
const SET_SORTING_COLUMN = 'SET_SORTING_COLUMN';
const SET_SORTED_FILTERED_RENDER_DATA = 'SET_SORTED_FILTERED_RENDER_DATA';
const SET_NOT_FILTERED_RENDER_DATA = 'SET_NOT_FILTERED_RENDER_DATA';
const SET_FILTERED_COLUMN_AND_VALUE = 'SET_FILTERED_COLUMN_AND_VALUE';
const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const SORT_RENDER_DATA = 'SORT_RENDER_DATA';
const FILTER_RENDER_DATA = 'FILTER_RENDER_DATA';

type SortRenderDataAction = Action<typeof SORT_RENDER_DATA>;

type FilterRenderDataAction = Action<typeof FILTER_RENDER_DATA>;

interface SetSortingAction extends Action<typeof SET_SORTING> {
    payload: string;
}
interface SetSortingColumnAction extends Action<typeof SET_SORTING_COLUMN> {
    payload: string;
}
interface SetSortedFilteredRenderDataAction extends Action<typeof SET_SORTED_FILTERED_RENDER_DATA> {
    payload: { [key: string]: any }[];
}
interface SetNotFilteredRenderDataAction extends Action<typeof SET_NOT_FILTERED_RENDER_DATA> {
    payload: { [key: string]: any }[];
}

interface SetFilteredColumnAndValueAction extends Action<typeof SET_FILTERED_COLUMN_AND_VALUE> {
    payload: FilteringColumn;
}
interface SetRowsPerPageAction extends Action<typeof SET_ROWS_PER_PAGE> {
    payload: number;
}
interface SetCurrentPageAction extends Action<typeof SET_CURRENT_PAGE> {
    payload: number;
}
interface SetTotalPagesAction extends Action<typeof SET_TOTAL_PAGES> {
    payload: number;
}

export type TableDataActions =
    | SortRenderDataAction
    | SetSortingAction
    | SetSortingColumnAction
    | SetFilteredColumnAndValueAction
    | SetSortedFilteredRenderDataAction
    | SetNotFilteredRenderDataAction
    | SetRowsPerPageAction
    | SetCurrentPageAction
    | SetTotalPagesAction
    | FilterRenderDataAction;

export default {
    SORT_RENDER_DATA,
    SET_SORTING,
    SET_SORTING_COLUMN,
    SET_SORTED_FILTERED_RENDER_DATA,
    SET_NOT_FILTERED_RENDER_DATA,
    SET_FILTERED_COLUMN_AND_VALUE,
    SET_ROWS_PER_PAGE,
    SET_CURRENT_PAGE,
    SET_TOTAL_PAGES,
    FILTER_RENDER_DATA,
} as const;
