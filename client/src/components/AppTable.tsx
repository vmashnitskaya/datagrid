import React, { FC, useEffect, useMemo } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../redux/rootReducer';

import Table from './Table';

import appDataSelectors from '../redux/appData/appDataSelectors';
import fetchAppData from '../redux/appData/appDataActions';
import { AppDataObject } from '../redux/appData/appDataInterfaces';
import { ColumnInterface } from '../redux/tableData/ColumnInterface';

interface AppTableProps {
    appData: AppDataObject[];
    loadingApp: boolean;
    errorApp: string;
    fetchAppsData: () => void;
    allIds: string[];
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
    useEffect(() => {
        fetchAppsData();
    }, [fetchAppsData]);

    return <Table renderData={appData} loading={loadingApp} error={errorApp} allIds={allIds} />;
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
