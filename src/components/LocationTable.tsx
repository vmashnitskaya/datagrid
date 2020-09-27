import React, { FC, useEffect, useMemo } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import fetchLocationData from '../redux/locationData/locationDataActions';
import locationDataSelectors from '../redux/locationData/locationDataSelectors';

import Table from './Table';

import { ColumnInterface } from './ColumnInterface';
import { LocationDataObject } from '../redux/locationData/locationDataInterfaces';

interface LocationTableProps {
    locationData: LocationDataObject[];
    loadingLocation: boolean;
    errorLocation: string;
    fetchLocationsData: (tabActive: string) => void;
}

const LocationTable: FC<LocationTableProps> = ({
    locationData,
    loadingLocation,
    errorLocation,
    fetchLocationsData,
}) => {
    const columnHeaders = useMemo<ColumnInterface[]>(() => {
        return [
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
        />
    );
};

const mapStateToProps = (state: RootState) => ({
    locationData: locationDataSelectors.getLocationData(state),
    loadingLocation: locationDataSelectors.getLoading(state),
    errorLocation: locationDataSelectors.getError(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    fetchLocationsData: (tabActive: string) => {
        dispatch(fetchLocationData(tabActive));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationTable);
