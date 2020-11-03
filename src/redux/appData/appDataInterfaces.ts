export type AppDataObject = {
    id: number;
    app_id: string;
    app_name: string;
    app_version: string;
    app_domain: string;
    app_url: string;
    owner: string;
    _id: string;
};

export interface NormalizedObject {
    [key: string]: AppDataObject;
}

export interface NormalizedData {
    dataNormalized: NormalizedObject;
    allIds: string[];
}

export interface AppDataState {
    appData: NormalizedObject;
    allIds: string[];
    loading: boolean;
    error: string;
}
