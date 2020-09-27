import { AppDataObject } from './appDataInterfaces';
import { RootState } from '../rootReducer';

const getAppData = (state: RootState): AppDataObject[] => state.appData.appData;
const getLoading = (state: RootState): boolean => state.appData.loading;
const getError = (state: RootState): string => state.appData.error;

export default { getAppData, getLoading, getError };
