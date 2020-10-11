export interface LocationDataObject {
    id: number;
    city: number;
    country: string;
    state: string;
    country_code: string;
    timezone: string;
    owner: string;
    _id: string;
}
export interface NormalizedObject {
    [key: string]: LocationDataObject;
}

export interface NormalizedData {
    dataNormalized: NormalizedObject;
    allIds: number[];
}

export interface LocationDataState {
    locationData: NormalizedObject;
    allIds: number[];
    loading: boolean;
    error: string;
}
