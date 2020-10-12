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
    allIds: string[];
}

export interface UserDataState {
    userData: NormalizedObject;
    allIds: string[];
    loading: boolean;
    error: string;
}
