export interface Location {
    city: string;
    country: string;
}

export interface DataObject {
    id: number;
    first_name: string;
    last_name: string;
    date: string;
    email: string;
    gender: string;
    location: Location;
}

export interface UserDataState {
    userData: DataObject[];
    loading: boolean;
    error: string;
}
