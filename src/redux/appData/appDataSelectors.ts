import { NormalizedObject } from './appDataInterfaces';
import { RootState } from '../rootReducer';

const getAppData = (state: RootState): NormalizedObject => state.appData.appData;
const getAllIds = (state: RootState): number[] => state.appData.allIds;
const getLoading = (state: RootState): boolean => state.appData.loading;
const getError = (state: RootState): string => state.appData.error;

export default { getAppData, getLoading, getError, getAllIds };
