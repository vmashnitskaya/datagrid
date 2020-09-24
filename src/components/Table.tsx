import React, { FC, useEffect } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import userDataSelectors from '../redux/userData/userDataSelectors';
import fetchData from '../redux/userData/userDataActions';
import { DataObject } from '../redux/userData/userDataInterfaces';

import Loader from './Loader';

export interface TableProps {
    userData: DataObject[];
    loading: boolean;
    error: string;
    fetchUserData: () => void;
}

const Table: FC<TableProps> = ({ userData, loading, error, fetchUserData }) => {
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    useEffect(() => {
        if (userData.length > 0) {
            console.log(userData);
        }
    }, [userData]);

    return (
        <>
            <h1>Hello</h1>
            {loading || error.length > 0 || userData.length === 0 ? (
                <Loader />
            ) : (
                <div>User data</div>
            )}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    userData: userDataSelectors.getUserData(state),
    loading: userDataSelectors.getLoading(state),
    error: userDataSelectors.getError(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    fetchUserData: () => {
        dispatch(fetchData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
