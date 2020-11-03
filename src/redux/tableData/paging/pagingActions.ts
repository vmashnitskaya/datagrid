import types, { PagingActions } from './pagingTypes';

const setRowsPerPage = (rowsPerPage: number): PagingActions => {
    return {
        type: types.SET_ROWS_PER_PAGE,
        payload: rowsPerPage,
    };
};
const setCurrentPage = (currentPage: number): PagingActions => {
    return {
        type: types.SET_CURRENT_PAGE,
        payload: currentPage,
    };
};
const setTotalPages = (totalPages: number): PagingActions => {
    return {
        type: types.SET_TOTAL_PAGES,
        payload: totalPages,
    };
};

export default { setTotalPages, setCurrentPage, setRowsPerPage };
