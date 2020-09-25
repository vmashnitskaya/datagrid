import { LocationDataObject } from './locationDataInterfaces';
import { RootState } from '../rootReducer';

const getLocationData = (state: RootState): LocationDataObject[] => state.locationData.locationData;
const getLoading = (state: RootState): boolean => state.locationData.loading;
const getError = (state: RootState): string => state.locationData.error;

export default { getLocationData, getLoading, getError };
