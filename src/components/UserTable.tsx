import React, { FC, useEffect, useMemo } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import userDataSelectors from '../redux/userData/userDataSelectors';
import fetchUserData from '../redux/userData/userDataActions';
import { RootState } from '../redux/rootReducer';

import Table from './Table';

import { ColumnInterface } from './ColumnInterface';
import { NormalizedObject } from '../redux/userData/userDataInterfaces';

interface UserTableProps {
    userData: NormalizedObject;
    allIds: number[];
    loadingUser: boolean;
    errorUser: string;
    fetchUsersData: (tabActive: string) => void;
}

/**
 * Component for User Data displaying.
 *
 * @component
 * @param props
 * @param props.userData - object with id as key and object for table row as value.
 * @param props.allIds - ids for locationData.
 * @param props.loadingUser - loading of data.
 * @param props.errorUser - error during data fetch.
 * @param props.fetchUsersData
 * @returns {JSX.Element}
 */

const UserTable: FC<UserTableProps> = ({
    userData,
    allIds,
    loadingUser,
    errorUser,
    fetchUsersData,
}) => {
    const columnHeaders = useMemo<ColumnInterface[]>(() => {
        return [
            { header: 'Id', name: 'id', type: 'string', sorting: true, filtering: true },
            {
                header: 'First name',
                name: 'first_name',
                type: 'string',
                sorting: true,
                filtering: true,
            },
            {
                header: 'Last name',
                name: 'last_name',
                type: 'string',
                sorting: true,
                filtering: true,
            },
            {
                header: 'Birth date',
                name: 'date',
                type: 'string',
                sorting: false,
                filtering: false,
            },
            { header: 'Email', name: 'email', type: 'string', sorting: false, filtering: false },
            {
                header: 'Gender',
                name: 'gender',
                type: 'select',
                options: ['Female', 'Male'],
                sorting: true,
                filtering: true,
            },
            {
                header: 'Location',
                name: 'location',
                type: 'string',
                sorting: false,
                filtering: false,
            },
        ];
    }, []);

    useEffect(() => {
        fetchUsersData('Users');
    }, [fetchUsersData]);

    return (
        <Table
            columnHeaders={columnHeaders}
            renderData={userData}
            loading={loadingUser}
            error={errorUser}
            allIds={allIds}
        />
    );
};

const mapStateToProps = (state: RootState) => ({
    userData: userDataSelectors.getUserData(state),
    loadingUser: userDataSelectors.getLoading(state),
    errorUser: userDataSelectors.getError(state),
    allIds: userDataSelectors.getAllIds(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    fetchUsersData: (tabActive: string) => {
        dispatch(fetchUserData(tabActive));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
