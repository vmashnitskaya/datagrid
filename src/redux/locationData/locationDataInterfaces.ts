export interface Loc {
    longitude: string;
    latitude: string;
}

export interface LocationDataObject {
    city: number;
    country: string;
    state: string;
    country_code: string;
    loc: Loc;
    timezone: string;
}

export interface LocationDataState {
    locationData: LocationDataObject[];
    loading: boolean;
    error: string;
}
