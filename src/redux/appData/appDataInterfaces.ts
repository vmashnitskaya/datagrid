import { Location } from '../userData/userDataInterfaces';

export interface AppDataObject {
    app_id: string;
    app_name: string;
    app_version: string;
    app_domain: string;
    app_url: string;
}

export interface AppDataState {
    appData: AppDataObject[];
    loading: boolean;
    error: string;
}
