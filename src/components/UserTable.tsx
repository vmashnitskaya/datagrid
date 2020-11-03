import React, { FC, useEffect } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import userDataSelectors from '../redux/userData/userDataSelectors';
import fetchUserData from '../redux/userData/userDataActions';
import { RootState } from '../redux/rootReducer';

import Table from './Table';

import { NormalizedObject } from '../redux/userData/userDataInterfaces';

interface UserTableProps {
    userData: NormalizedObject;
    allIds: string[];
    loadingUser: boolean;
    errorUser: string;
    fetchUsersData: () => void;
}

/**
 * Component for User Data displaying.
 *
 * @param props
 * @param {NormalizedObject} props.userData - object with id as key and object for table row as value.
 * @param {number[]} props.allIds - ids for locationData.
 * @param {boolean} props.loadingUser - loading of data.
 * @param {string} props.errorUser - error during data fetch.
 * @param {function(): void} props.fetchUsersData
 * @returns {JSX.Element}
 */

const UserTable: FC<UserTableProps> = ({
    userData,
    allIds,
    loadingUser,
    errorUser,
    fetchUsersData,
}) => {
    useEffect(() => {
        fetchUsersData();
    }, [fetchUsersData]);

    return <Table renderData={userData} loading={loadingUser} error={errorUser} allIds={allIds} />;
};

const mapStateToProps = (state: RootState) => ({
    userData: userDataSelectors.getUserData(state),
    loadingUser: userDataSelectors.getLoading(state),
    errorUser: userDataSelectors.getError(state),
    allIds: userDataSelectors.getAllIds(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    fetchUsersData: () => {
        dispatch(fetchUserData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
