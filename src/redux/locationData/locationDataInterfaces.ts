export interface Loc {
    longitude: string;
    latitude: string;
}

export interface LocationDataObject {
    id: number;
    city: number;
    country: string;
    state: string;
    country_code: string;
    loc: Loc;
    timezone: string;
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
