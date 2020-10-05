import React, { FC, useEffect, useMemo } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import fetchLocationData from '../redux/locationData/locationDataActions';
import locationDataSelectors from '../redux/locationData/locationDataSelectors';

import Table from './Table';

import { ColumnInterface } from './ColumnInterface';
import { NormalizedObject } from '../redux/locationData/locationDataInterfaces';

interface LocationTableProps {
    locationData: NormalizedObject;
    loadingLocation: boolean;
    errorLocation: string;
    fetchLocationsData: (tabActive: string) => void;
    allIds: number[];
}

/**
 * Component for Location Data displaying.
 *
 * @component
 * @param props
 * @param {NormalizedObject} props.locationData - object with id as key and object for table row as value.
 * @param {boolean} props.loadingLocation - loading of data.
 * @param {string} props.errorLocation - error during data fetch.
 * @param {(tabActive: string) => void} props.fetchLocationsData
 * @param {number[]} props.allIds - ids for locationData.
 * @returns {JSX.Element}
 * @constructor
 */

const LocationTable: FC<LocationTableProps> = ({
    locationData,
    loadingLocation,
    errorLocation,
    fetchLocationsData,
    allIds,
}) => {
    const columnHeaders = useMemo<ColumnInterface[]>(() => {
        return [
            { header: 'Id', name: 'id', type: 'string', sorting: true, filtering: true },
            { header: 'City', name: 'city', type: 'string', sorting: true, filtering: true },
            { header: 'Country', name: 'country', type: 'string', sorting: true, filtering: true },
            { header: 'State', name: 'state', type: 'string', sorting: true, filtering: true },
            {
                header: 'Country code',
                name: 'country_code',
                type: 'string',
                sorting: true,
                filtering: true,
            },
            {
                header: 'Longitude and Latitude',
                name: 'loc',
                type: 'string',
                sorting: false,
                filtering: false,
            },
            {
                header: 'Timezone',
                name: 'timezone',
                type: 'string',
                sorting: false,
                filtering: false,
            },
        ];
    }, []);

    useEffect(() => {
        fetchLocationsData('Locations');
    }, [fetchLocationsData]);

    return (
        <Table
            renderData={locationData}
            loading={loadingLocation}
            error={errorLocation}
            columnHeaders={columnHeaders}
            allIds={allIds}
        />
    );
};

const mapStateToProps = (state: RootState) => ({
    locationData: locationDataSelectors.getLocationData(state),
    loadingLocation: locationDataSelectors.getLoading(state),
    errorLocation: locationDataSelectors.getError(state),
    allIds: locationDataSelectors.getAllIds(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    fetchLocationsData: (tabActive: string) => {
        dispatch(fetchLocationData(tabActive));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationTable);
