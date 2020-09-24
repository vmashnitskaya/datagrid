import { DataObject } from './userDataInterfaces';
import { RootState } from '../rootReducer';

const getUserData = (state: RootState): DataObject[] => state.userData.userData;
const getLoading = (state: RootState): boolean => state.userData.loading;
const getError = (state: RootState): string => state.userData.error;

export default { getUserData, getLoading, getError };
