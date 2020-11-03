import { Action } from 'redux';

const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';

interface SetRowsPerPageAction extends Action<typeof SET_ROWS_PER_PAGE> {
    payload: number;
}
interface SetCurrentPageAction extends Action<typeof SET_CURRENT_PAGE> {
    payload: number;
}
interface SetTotalPagesAction extends Action<typeof SET_TOTAL_PAGES> {
    payload: number;
}

export type PagingActions = SetRowsPerPageAction | SetCurrentPageAction | SetTotalPagesAction;

export default { SET_ROWS_PER_PAGE, SET_CURRENT_PAGE, SET_TOTAL_PAGES } as const;
