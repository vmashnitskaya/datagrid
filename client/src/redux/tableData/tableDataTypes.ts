import { Action } from 'redux';
import { AddAPhoto } from '@material-ui/icons';
import { FilteringColumn } from '../../components/Table/Filtering/FilteringColumnInterface';
import { NormalizedObject } from './tableDataInterface';
import { ColumnInterface } from './ColumnInterface';

const SET_RENDER_DATA = 'SET_RENDER_DATA';
const SET_ALL_IDS = 'SET_ALL_IDS';
const SET_ERROR = 'SET_ERROR';
const SET_LOADING = 'SET_LOADING';
const SET_TABLE_COLUMN_HEADERS = 'SET_TABLE_COLUMN_HEADERS';

const MODIFY_DATA_PENDING = 'DELETE_DATA_PENDING';
const DELETE_DATA_SUCCESS = 'DELETE_DATA_SUCCESS';
const ADD_DATA_SUCCESS = 'ADD_DATA_SUCCESS';
const MODIFY_DATA_FAILED = 'DELETE_DATA_FAILED';

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

const RESET_MESSAGES = 'RESET_MESSAGES';

const HIDE_COLUMN = 'HIDE_COLUMN';

interface SetRenderDataAction extends Action<typeof SET_RENDER_DATA> {
    payload: NormalizedObject;
}
interface SetAllIdsAction extends Action<typeof SET_ALL_IDS> {
    payload: string[];
}
interface SetErrorAction extends Action<typeof SET_ERROR> {
    payload: string;
}

interface HideColumnAction extends Action<typeof HIDE_COLUMN> {
    payload: string;
}

type SetTableColumnHeadersAction = Action<typeof SET_TABLE_COLUMN_HEADERS>;

type SetLoadingAction = Action<typeof SET_LOADING>;

type SortRenderDataAction = Action<typeof SORT_RENDER_DATA>;

type FilterRenderDataAction = Action<typeof FILTER_RENDER_DATA>;

type ResetFiltersAction = Action<typeof RESET_FILTERS>;

type ResetMessages = Action<typeof RESET_MESSAGES>;

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

type ModifyDataPendingAction = Action<typeof MODIFY_DATA_PENDING>;

interface DeleteDataSuccessAction extends Action<typeof DELETE_DATA_SUCCESS> {
    payload: { [key: string]: any };
}

interface AddDataSuccessAction extends Action<typeof ADD_DATA_SUCCESS> {
    payload: { [key: string]: any };
}

interface ModifyDataFailedAction extends Action<typeof MODIFY_DATA_FAILED> {
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
    | SetTableColumnHeadersAction
    | ResetFiltersAction
    | CheckRowCheckboxAction
    | SetTabActiveAction
    | ModifyDataFailedAction
    | DeleteDataSuccessAction
    | ModifyDataPendingAction
    | AddDataSuccessAction
    | ResetMessages
    | HideColumnAction;

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
    SET_TABLE_COLUMN_HEADERS,
    RESET_FILTERS,
    CHECK_ROW_CHECKBOX,
    MODIFY_DATA_FAILED,
    DELETE_DATA_SUCCESS,
    ADD_DATA_SUCCESS,
    MODIFY_DATA_PENDING,
    SET_TAB_ACTIVE,
    RESET_MESSAGES,
    HIDE_COLUMN,
} as const;
