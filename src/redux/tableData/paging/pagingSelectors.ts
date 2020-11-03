import { RootState } from '../../rootReducer';

const getRowsPerPage = (state: RootState): number => state.tableData.paging.rowsPerPage;
const getCurrentPage = (state: RootState): number => state.tableData.paging.currentPage;
const getTotalPages = (state: RootState): number => state.tableData.paging.totalPages;

export default { getRowsPerPage, getCurrentPage, getTotalPages };
