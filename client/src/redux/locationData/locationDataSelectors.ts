import { NormalizedObject } from './locationDataInterfaces';
import { RootState } from '../rootReducer';

const getLocationData = (state: RootState): NormalizedObject => state.locationData.locationData;
const getAllIds = (state: RootState): number[] => state.locationData.allIds;
const getLoading = (state: RootState): boolean => state.locationData.loading;
const getError = (state: RootState): string => state.locationData.error;

export default { getLocationData, getAllIds, getLoading, getError };
