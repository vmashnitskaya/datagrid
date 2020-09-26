import React, { FC, useEffect, useMemo, useState } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../redux/rootReducer';

import locationDataSelectors from '../redux/locationData/locationDataSelectors';
import appDataSelectors from '../redux/appData/appDataSelectors';
import userDataSelectors from '../redux/userData/userDataSelectors';
import fetchAppData from '../redux/appData/appDataActions';
import fetchLocationData from '../redux/locationData/locationDataActions';
import fetchUserData from '../redux/userData/userDataActions';

import Loader from './Loader';
import TableRow from './TableRow';

import { ColumnsInterface, ColumnInterface } from './ColumnInterface';
import { DataObject } from '../redux/userData/userDataInterfaces';
import { AppDataObject } from '../redux/appData/appDataInterfaces';
import { LocationDataObject } from '../redux/locationData/locationDataInterfaces';

export interface TableProps {
    userData: DataObject[];
    loading: boolean;
    error: string;
    fetchUsersData: (tabActive: string) => void;
    tabActive: string;
    appData: AppDataObject[];
    loadingApp: boolean;
    errorApp: string;
    locationData: LocationDataObject[];
    loadingLocation: boolean;
    errorLocation: string;
    fetchLocationsData: (tabActive: string) => void;
    fetchAppsData: (tabActive: string) => void;
}

const Table: FC<TableProps> = ({
    userData,
    loading,
    error,
    fetchUsersData,
    tabActive,
    appData,
    loadingApp,
    errorApp,
    locationData,
    loadingLocation,
    errorLocation,
    fetchLocationsData,
    fetchAppsData,
}) => {
    const columnHeaders = useMemo<ColumnsInterface>(() => {
        return {
            Users: [
                { header: 'Id', name: 'id' },
                { header: 'First name', name: 'first_name' },
                { header: 'Last name', name: 'last_name' },
                { header: 'Birth date', name: 'date' },
                { header: 'Email', name: 'email' },
                { header: 'Gender', name: 'gender' },
                { header: 'Location', name: 'location' },
            ],
            Apps: [
                { header: 'App Id', name: 'app_id' },
                { header: 'App name', name: 'app_name' },
                { header: 'App version', name: 'app_version' },
                { header: 'App domain', name: 'app_domain' },
                { header: 'App URL', name: 'app_url' },
            ],
            Locations: [
                { header: 'City', name: 'city' },
                { header: 'Country', name: 'country' },
                { header: 'State', name: 'state' },
                { header: 'Country code', name: 'country_code' },
                { header: 'Longitude and Latitude', name: 'loc' },
                { header: 'Timezone', name: 'timezone' },
            ],
        };
    }, []);

    const [columnHeaderForActiveTab, setColumnHeaderForActiveTab] = useState<ColumnInterface[]>(
        columnHeaders[(tabActive as keyof typeof columnHeaders) || []]
    );

    const [renderData, setRenderData] = useState<{ [key: string]: any }[]>([]);

    useEffect(() => {
        setColumnHeaderForActiveTab(columnHeaders[tabActive as keyof typeof columnHeaders]);
        if (tabActive === 'Locations') {
            fetchLocationsData(tabActive);
        } else if (tabActive === 'Apps') {
            fetchAppsData(tabActive);
        } else {
            fetchUsersData(tabActive);
        }
    }, [fetchUsersData, fetchLocationsData, fetchAppsData, tabActive, columnHeaders]);

    useEffect(() => {
        if (appData.length > 0) {
            setRenderData(appData);
        }
    }, [appData]);

    useEffect(() => {
        if (locationData.length > 0) {
            setRenderData(locationData);
        }
    }, [locationData]);

    useEffect(() => {
        if (userData) {
            setRenderData(userData);
        }
    }, [userData]);

    return (
        <>
            {loading ||
            loadingApp ||
            loadingLocation ||
            error.length > 0 ||
            errorApp.length > 0 ||
            errorLocation.length > 0 ? (
                <Loader />
            ) : (
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            {columnHeaderForActiveTab.map((element, index: number) => (
                                <th key={`key${index + 1}`} className="bg-light">
                                    {element.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {renderData.map((element: { [key: string]: any }, index: number) => (
                            <TableRow
                                key={`key${index + 1}`}
                                row={element}
                                columnHeaderForActiveTab={columnHeaderForActiveTab}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    userData: userDataSelectors.getUserData(state),
    loading: userDataSelectors.getLoading(state),
    error: userDataSelectors.getError(state),
    locationData: locationDataSelectors.getLocationData(state),
    loadingLocation: locationDataSelectors.getLoading(state),
    errorLocation: locationDataSelectors.getError(state),
    appData: appDataSelectors.getAppData(state),
    loadingApp: appDataSelectors.getLoading(state),
    errorApp: appDataSelectors.getError(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    fetchUsersData: (tabActive: string) => {
        dispatch(fetchUserData(tabActive));
    },
    fetchLocationsData: (tabActive: string) => {
        dispatch(fetchLocationData(tabActive));
    },
    fetchAppsData: (tabActive: string) => {
        dispatch(fetchAppData(tabActive));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
