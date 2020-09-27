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
            { header: 'City', name: 'city' },
            { header: 'Country', name: 'country' },
            { header: 'State', name: 'state' },
            { header: 'Country code', name: 'country_code' },
            { header: 'Longitude and Latitude', name: 'loc' },
            { header: 'Timezone', name: 'timezone' },
        ];
    }, []);

    const columnsForSorting = useMemo<string[]>(() => {
        return ['city', 'country', 'state', 'country_code'];
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
            columnsForSorting={columnsForSorting}
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
