import { Action } from 'redux';
import { FilteringColumn } from '../../components/Table/Filtering/FilteringColumnInterface';
import { NormalizedObject } from './tableDataInterface';
import { ColumnInterface } from '../../components/ColumnInterface';

const SET_RENDER_DATA = 'SET_RENDER_DATA';
const SET_ALL_IDS = 'SET_ALL_IDS';
const SET_ERROR = 'SET_ERROR';
const SET_LOADING = 'SET_LOADING';
const SET_COLUMN_HEADERS = 'SET_COLUMN_HEADERS';

const DELETE_DATA_PENDING = 'DELETE_DATA_PENDING';
const DELETE_DATA_SUCCESS = 'DELETE_DATA_SUCCESS';
const DELETE_DATA_FAILED = 'DELETE_DATA_FAILED';

const SET_TAB_ACTIVE = 'SET_TAB_ACTIVE';
const SET_SORTING = 'SET_SORTING';
const SET_SORTING_COLUMN = 'SET_SORTING_COLUMN';
const SET_FILTERED_COLUMN_AND_VALUE = 'SET_FILTERED_COLUMN_AND_VALUE';

const SORT_RENDER_DATA = 'SORT_RENDER_DATA';
const FILTER_RENDER_DATA = 'FILTER_RENDER_DATA';
const SET_SORTED_FILTERED_RENDER_DATA_IDS = 'SET_SORTED_FILTERED_RENDER_DATA_IDS';
const SET_SORT_FILTER_SLICED_DATA_IDS = 'SET_SORT_FILTER_SLICED_DATA_IDS';
const RESET_FILTERS = 'RESET_FILTERS';
const CHECK_ROW_CHECKBOX = 'CHECK_ROW_CHECKBOX';

interface SetRenderDataAction extends Action<typeof SET_RENDER_DATA> {
    payload: NormalizedObject;
}
interface SetAllIdsAction extends Action<typeof SET_ALL_IDS> {
    payload: string[];
}
interface SetErrorAction extends Action<typeof SET_ERROR> {
    payload: string;
}
interface SetColumnHeadersAction extends Action<typeof SET_COLUMN_HEADERS> {
    payload: ColumnInterface[];
}
type SetLoadingAction = Action<typeof SET_LOADING>;

type SortRenderDataAction = Action<typeof SORT_RENDER_DATA>;

type FilterRenderDataAction = Action<typeof FILTER_RENDER_DATA>;

type ResetFiltersAction = Action<typeof RESET_FILTERS>;

interface CheckRowCheckboxAction extends Action<typeof CHECK_ROW_CHECKBOX> {
    payload: string;
}

interface SetSortingAction extends Action<typeof SET_SORTING> {
    payload: string;
}
interface SetSortingColumnAction extends Action<typeof SET_SORTING_COLUMN> {
    payload: string;
}
interface SetSortFilterSlicedDataIdsAction extends Action<typeof SET_SORT_FILTER_SLICED_DATA_IDS> {
    payload: string[];
}
interface SetFilteredColumnAndValueAction extends Action<typeof SET_FILTERED_COLUMN_AND_VALUE> {
    payload: FilteringColumn;
}

interface SetSortedFilteredRenderDataIdsAction
    extends Action<typeof SET_SORTED_FILTERED_RENDER_DATA_IDS> {
    payload: string[];
}

type DeleteDataPendingAction = Action<typeof DELETE_DATA_PENDING>;

interface DeleteDataSuccessAction extends Action<typeof DELETE_DATA_SUCCESS> {
    payload: string[];
}

interface DeleteDataFailedAction extends Action<typeof DELETE_DATA_FAILED> {
    payload: string;
}

interface SetTabActiveAction extends Action<typeof SET_TAB_ACTIVE> {
    payload: string;
}

export type TableDataActions =
    | SortRenderDataAction
    | SetSortingAction
    | SetSortingColumnAction
    | SetFilteredColumnAndValueAction
    | SetSortedFilteredRenderDataIdsAction
    | FilterRenderDataAction
    | SetSortFilterSlicedDataIdsAction
    | SetRenderDataAction
    | SetErrorAction
    | SetLoadingAction
    | SetAllIdsAction
    | SetColumnHeadersAction
    | ResetFiltersAction
    | CheckRowCheckboxAction
    | SetTabActiveAction
    | DeleteDataFailedAction
    | DeleteDataSuccessAction
    | DeleteDataPendingAction;

export default {
    SORT_RENDER_DATA,
    SET_SORTING,
    SET_SORTING_COLUMN,
    SET_SORTED_FILTERED_RENDER_DATA_IDS,
    SET_FILTERED_COLUMN_AND_VALUE,
    FILTER_RENDER_DATA,
    SET_SORT_FILTER_SLICED_DATA_IDS,
    SET_RENDER_DATA,
    SET_LOADING,
    SET_ERROR,
    SET_ALL_IDS,
    SET_COLUMN_HEADERS,
    RESET_FILTERS,
    CHECK_ROW_CHECKBOX,
    DELETE_DATA_FAILED,
    DELETE_DATA_SUCCESS,
    DELETE_DATA_PENDING,
    SET_TAB_ACTIVE,
} as const;
