import { NormalizedObject } from './userDataInterfaces';
import { RootState } from '../rootReducer';

const getUserData = (state: RootState): NormalizedObject => state.userData.userData;
const getAllIds = (state: RootState): string[] => state.userData.allIds;
const getLoading = (state: RootState): boolean => state.userData.loading;
const getError = (state: RootState): string => state.userData.error;

export default { getUserData, getLoading, getError, getAllIds };
