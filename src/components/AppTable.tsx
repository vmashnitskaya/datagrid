import React, { FC, useEffect, useMemo } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../redux/rootReducer';

import Table from './Table';

import appDataSelectors from '../redux/appData/appDataSelectors';
import fetchAppData from '../redux/appData/appDataActions';
import { AppDataObject } from '../redux/appData/appDataInterfaces';
import { ColumnInterface } from './ColumnInterface';

interface AppTableProps {
    appData: AppDataObject[];
    loadingApp: boolean;
    errorApp: string;
    fetchAppsData: (tabActive: string) => void;
}

const AppTable: FC<AppTableProps> = ({ fetchAppsData, appData, loadingApp, errorApp }) => {
    const columnHeaders = useMemo<ColumnInterface[]>(() => {
        return [
            { header: 'App Id', name: 'app_id' },
            { header: 'App name', name: 'app_name' },
            { header: 'App version', name: 'app_version' },
            { header: 'App domain', name: 'app_domain' },
            { header: 'App URL', name: 'app_url' },
        ];
    }, []);

    useEffect(() => {
        fetchAppsData('Apps');
    }, []);

    return (
        <Table
            columnHeaders={columnHeaders}
            renderData={appData}
            loading={loadingApp}
            error={errorApp}
        />
    );
};

const mapStateToProps = (state: RootState) => ({
    appData: appDataSelectors.getAppData(state),
    loadingApp: appDataSelectors.getLoading(state),
    errorApp: appDataSelectors.getError(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    fetchAppsData: (tabActive: string) => {
        dispatch(fetchAppData(tabActive));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppTable);
