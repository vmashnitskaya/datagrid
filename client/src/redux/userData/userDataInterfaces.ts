export interface DataObject {
    id: number;
    first_name: string;
    last_name: string;
    date: string;
    email: string;
    gender: string;
    job_title: string;
    owner: string;
    _id: string;
}

export interface NormalizedObject {
    [key: string]: DataObject;
}

export interface NormalizedData {
    dataNormalized: NormalizedObject;
    allIds: number[];
}

export interface UserDataState {
    userData: NormalizedObject;
    allIds: number[];
    loading: boolean;
    error: string;
}
