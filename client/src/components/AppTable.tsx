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
    fetchAppsData: () => void;
    allIds: number[];
}

/**
 * Component for App Data displaying.
 *
 * @param props
 * @param {function(): void} props.fetchAppsData
 * @param {number[]} props.allIds - ids for appData.
 * @param {AppDataObject[]} props.appData - object with id as key and object for table row as value.
 * @param {boolean} props.loadingApp - loading of data.
 * @param {string} props.errorApp - error during data fetch.
 * @returns {JSX.Element}
 */

const AppTable: FC<AppTableProps> = ({ fetchAppsData, allIds, appData, loadingApp, errorApp }) => {
    const columnHeaders = useMemo<ColumnInterface[]>(() => {
        return [
            {
                header: '',
                name: 'checkbox',
                type: 'checkbox',
                sorting: false,
                filtering: false,
                display: true,
            },
            {
                header: 'Id',
                name: 'id',
                type: 'string',
                sorting: true,
                filtering: true,
                display: true,
            },
            {
                header: 'App Id',
                name: 'app_id',
                type: 'string',
                filtering: true,
                sorting: true,
                display: true,
            },
            {
                header: 'App name',
                name: 'app_name',
                type: 'string',
                filtering: true,
                sorting: true,
                display: true,
            },
            {
                header: 'App version',
                name: 'app_version',
                type: 'string',
                filtering: true,
                sorting: true,
                display: true,
            },
            {
                header: 'App domain',
                name: 'app_domain',
                type: 'string',
                filtering: true,
                sorting: true,
                display: true,
            },
            {
                header: 'App URL',
                name: 'app_url',
                type: 'string',
                filtering: false,
                sorting: false,
                display: true,
            },
        ];
    }, []);

    useEffect(() => {
        fetchAppsData();
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
    fetchAppsData: () => {
        dispatch(fetchAppData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppTable);
