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
    allIds: number[];
}

const AppTable: FC<AppTableProps> = ({ fetchAppsData, allIds, appData, loadingApp, errorApp }) => {
    const columnHeaders = useMemo<ColumnInterface[]>(() => {
        return [
            { header: 'Id', name: 'id', type: 'string', sorting: true, filtering: true },
            { header: 'App Id', name: 'app_id', type: 'string', filtering: true, sorting: true },
            {
                header: 'App name',
                name: 'app_name',
                type: 'string',
                filtering: true,
                sorting: true,
            },
            {
                header: 'App version',
                name: 'app_version',
                type: 'string',
                filtering: true,
                sorting: true,
            },
            {
                header: 'App domain',
                name: 'app_domain',
                type: 'string',
                filtering: true,
                sorting: true,
            },
            {
                header: 'App URL',
                name: 'app_url',
                type: 'string',
                filtering: false,
                sorting: false,
            },
        ];
    }, []);

    useEffect(() => {
        fetchAppsData('Apps');
    }, [fetchAppsData]);

    return (
        <Table
            columnHeaders={columnHeaders}
            renderData={appData}
            loading={loadingApp}
            error={errorApp}
            allIds={allIds}
        />
    );
};

const mapStateToProps = (state: RootState) => ({
    appData: appDataSelectors.getAppData(state),
    loadingApp: appDataSelectors.getLoading(state),
    errorApp: appDataSelectors.getError(state),
    allIds: appDataSelectors.getAllIds(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    fetchAppsData: (tabActive: string) => {
        dispatch(fetchAppData(tabActive));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppTable);
