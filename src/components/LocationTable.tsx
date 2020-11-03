import React, { FC, useEffect } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import fetchLocationData from '../redux/locationData/locationDataActions';
import locationDataSelectors from '../redux/locationData/locationDataSelectors';

import Table from './Table';

import { NormalizedObject } from '../redux/locationData/locationDataInterfaces';

interface LocationTableProps {
    locationData: NormalizedObject;
    loadingLocation: boolean;
    errorLocation: string;
    fetchLocationsData: () => void;
    allIds: string[];
}

/**
 * Component for Location Data displaying.
 *
 * @param props
 * @param {NormalizedObject} props.locationData - object with id as key and object for table row as value.
 * @param {boolean} props.loadingLocation - loading of data.
 * @param {string} props.errorLocation - error during data fetch.
 * @param {function(): void} props.fetchLocationsData
 * @param {number[]} props.allIds - ids for locationData.
 * @returns {JSX.Element}
 */

const LocationTable: FC<LocationTableProps> = ({
    locationData,
    loadingLocation,
    errorLocation,
    fetchLocationsData,
    allIds,
}) => {
    useEffect(() => {
        fetchLocationsData();
    }, [fetchLocationsData]);

    return (
        <Table
            renderData={locationData}
            loading={loadingLocation}
            error={errorLocation}
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
    fetchLocationsData: () => {
        dispatch(fetchLocationData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationTable);
