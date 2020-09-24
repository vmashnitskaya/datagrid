import React, { FC, useEffect, useMemo } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import userDataSelectors from '../redux/userData/userDataSelectors';
import fetchData from '../redux/userData/userDataActions';
import { DataObject } from '../redux/userData/userDataInterfaces';

import Loader from './Loader';
import TableRow from './TableRow';
import { ColumnInterface } from './ColumnInterface';

export interface TableProps {
    userData: { [key: string]: any }[];
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

    const columnHeaders = useMemo<Array<ColumnInterface>>(
        () => [
            { header: 'Id', name: 'id' },
            { header: 'First name', name: 'first_name' },
            { header: 'Last name', name: 'last_name' },
            { header: 'Birth date', name: 'date' },
            { header: 'Email', name: 'email' },
            { header: 'Gender', name: 'gender' },
            { header: 'Location', name: 'location' },
        ],
        []
    );

    return (
        <>
            {loading || error.length > 0 || userData.length === 0 ? (
                <Loader />
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            {columnHeaders.map((element) => (
                                <th>{element.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((userObject) => (
                            <TableRow
                                key={userObject.id}
                                row={userObject}
                                columnHeaders={columnHeaders}
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
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    fetchUserData: () => {
        dispatch(fetchData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
