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
    allIds: string[];
}

export interface LocationDataState {
    locationData: NormalizedObject;
    allIds: string[];
    loading: boolean;
    error: string;
}
