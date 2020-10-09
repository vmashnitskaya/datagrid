export type AppDataObject = {
    id: number;
    app_id: string;
    app_name: string;
    app_version: string;
    app_domain: string;
    app_url: string;
};

export interface NormalizedObject {
    [key: string]: AppDataObject;
}

export interface NormalizedData {
    dataNormalized: NormalizedObject;
    allIds: number[];
}

export interface AppDataState {
    appData: NormalizedObject;
    allIds: number[];
    loading: boolean;
    error: string;
}
