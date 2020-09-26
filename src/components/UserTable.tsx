import React, { FC, useEffect, useMemo } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import userDataSelectors from '../redux/userData/userDataSelectors';
import fetchUserData from '../redux/userData/userDataActions';
import { RootState } from '../redux/rootReducer';

import Table from './Table';

import { ColumnInterface } from './ColumnInterface';
import { DataObject } from '../redux/userData/userDataInterfaces';

interface UserTableProps {
    userData: DataObject[];
    loadingUser: boolean;
    errorUser: string;
    fetchUsersData: (tabActive: string) => void;
}

const UserTable: FC<UserTableProps> = ({ userData, loadingUser, errorUser, fetchUsersData }) => {
    const columnHeaders = useMemo<ColumnInterface[]>(() => {
        return [
            { header: 'Id', name: 'id' },
            { header: 'First name', name: 'first_name' },
            { header: 'Last name', name: 'last_name' },
            { header: 'Birth date', name: 'date' },
            { header: 'Email', name: 'email' },
            { header: 'Gender', name: 'gender' },
            { header: 'Location', name: 'location' },
        ];
    }, []);

    const columnsForSorting = useMemo<string[]>(() => {
        return ['id', 'first_name', ';ast_name', 'gender'];
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
            columnsForSorting={columnsForSorting}
        />
    );
};

const mapStateToProps = (state: RootState) => ({
    userData: userDataSelectors.getUserData(state),
    loadingUser: userDataSelectors.getLoading(state),
    errorUser: userDataSelectors.getError(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    fetchUsersData: (tabActive: string) => {
        dispatch(fetchUserData(tabActive));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
