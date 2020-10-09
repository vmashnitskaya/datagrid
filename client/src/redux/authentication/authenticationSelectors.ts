import { RootState } from '../rootReducer';

const getToken = (state: RootState): string => state.auth.token;
const getUserId = (state: RootState): string => state.auth.userId;
const getLoading = (state: RootState): boolean => state.auth.loading;
const getError = (state: RootState): string => state.auth.error;

export default { getToken, getUserId, getLoading, getError };
