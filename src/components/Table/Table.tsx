import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import Loader from './Loader';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import PaginationControl from './PaginationControl';
import './Table.scss';

import { ColumnInterface } from '../ColumnInterface';
import { FilteringColumn } from './FilteringColumnInterface';
import RowsPerPageControl from './RowsPerPageControl';
import { NormalizedObject } from '../../redux/tableData/tableDataInterface';

import actions from '../../redux/tableData/tableDataActions';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import { RootState } from '../../redux/rootReducer';
import { TableDataActions } from '../../redux/tableData/tableDataTypes';

export interface TableProps {
    tableLoading: boolean;
    tableError: string;
    tableAllIds: number[];
    renderData: { [key: string]: any };
    loading: boolean;
    error: string;
    allIds: number[];
    columnHeaders: ColumnInterface[];
    rowsPerPage: number;
    currentPage: number;
    totalPages: number;
    setFilteredColumnAndValue: (data: FilteringColumn) => void;
    setTotalPages: (totalPages: number) => void;
    sortRenderData: () => void;
    setTableRenderData: (data: NormalizedObject) => void;
    setTableAllIds: (allIds: number[]) => void;
    setTableLoading: () => void;
    setTableError: (error: string) => void;
    setSortedFilteredRenderDataIds: (allIds: number[]) => void;
    setSortFilterSlicedDataIds: (allIds: number[]) => void;
    sortedFilteredRenderDataIds: number[];
    sortFilterSlicedDataIds: number[];
}

/**
 * Component for displaying table.
 *
 * @component
 * @param props
 * @param props.tableLoading - the loading of data.
 * @param props.tableError - the error if occurred during data loading.
 * @param props.tableAllIds - the array with initial data ids used in component.
 * @param props.renderData - the object with whole data for the table, not sorted, filtered, sliced.
 * @param props.allIds - the array with ids for props.renderData.
 * @param props.loading - the loading of data supplied from one of custom tables.
 * @param props.error - the error supplied from one of custom tables.
 * @param props.columnHeaders - the array with column headers and information about columns.
 * @param props.sortFilterSlicedDataIds  - the array with sequence of ids for filtered, sorted, sliced data. Used for displaying on particular table page.
 * @param props.sortedFilteredRenderDataIds - the array with sequence of ids for filtered and sorted data.
 * @param props.rowsPerPage - the amount of rows per page.
 * @param props.currentPage - the current page.
 * @param props.totalPages - the total pages in table.
 * @param props.setFilteredColumnAndValue
 * @param props.setTotalPages
 * @param props.setTableRenderData
 * @param props.setTableAllIds
 * @param props.setTableLoading
 * @param props.setTableError
 * @param props.setSortedFilteredRenderDataIds
 * @param props.setSortFilterSlicedDataIds
 * @returns {JSX.Element}
 */

const Table: FC<TableProps> = ({
    tableLoading,
    tableError,
    tableAllIds,
    renderData,
    allIds,
    loading,
    error,
    columnHeaders,
    rowsPerPage,
    currentPage,
    totalPages,
    setFilteredColumnAndValue,
    setTotalPages,
    setTableRenderData,
    setTableAllIds,
    setTableLoading,
    setTableError,
    sortFilterSlicedDataIds,
    setSortedFilteredRenderDataIds,
    setSortFilterSlicedDataIds,
    sortedFilteredRenderDataIds,
}) => {
    /**
     * Table data is set after receiving from any of 3 components: UserTable, AppTable, LocationTable.
     */

    useEffect(() => {
        if (Object.keys(renderData).length > 0) {
            setTableRenderData({ ...renderData });
        }
    }, [renderData, setTableRenderData]);

    useEffect(() => {
        if (allIds.length > 0) {
            setTableAllIds([...allIds]);
        }
    }, [allIds, setTableAllIds]);

    useEffect(() => {
        setTableLoading();
    }, [loading, setTableLoading]);

    useEffect(() => {
        setTableError(error);
    }, [error, setTableError]);

    /**
     * Table data ids are initially set to sortedFilteredRenderDataIds.
     */

    useEffect(() => {
        setSortedFilteredRenderDataIds([...tableAllIds]);
    }, [setSortedFilteredRenderDataIds, tableAllIds]);

    /**
     * Identify the number of rows in table and set the sliced render data for displaying.
     */

    useEffect(() => {
        const index = currentPage - 1;
        const numberOfRows = sortedFilteredRenderDataIds.slice(
            index * rowsPerPage,
            index * rowsPerPage + rowsPerPage
        );
        setSortFilterSlicedDataIds(
            numberOfRows.length > 0
                ? numberOfRows
                : sortedFilteredRenderDataIds.slice(0, rowsPerPage)
        );
    }, [currentPage, rowsPerPage, setSortFilterSlicedDataIds, sortedFilteredRenderDataIds]);

    useEffect(() => {
        setTotalPages(Math.ceil(sortedFilteredRenderDataIds.length / rowsPerPage));
    }, [
        rowsPerPage,
        setTotalPages,
        sortedFilteredRenderDataIds,
        sortedFilteredRenderDataIds.length,
    ]);

    /**
     * Set object with column names as keys and empty strings as values. It will be used to store filter queries.
     */

    useEffect(() => {
        setFilteredColumnAndValue(
            columnHeaders.reduce((acc, el) => ({ ...acc, [el.name]: '' }), {} as FilteringColumn)
        );
    }, [columnHeaders, setFilteredColumnAndValue]);

    return (
        <>
            {tableLoading || tableError.length > 0 ? (
                <Loader />
            ) : (
                <>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                {columnHeaders.map((element, index: number) => (
                                    <TableHeader key={`key${index + 1}`} element={element} />
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortFilterSlicedDataIds.length === 0 && <div>No data to display.</div>}
                            {sortFilterSlicedDataIds.map((element: number) => (
                                <TableRow
                                    key={`key${element}`}
                                    id={element}
                                    columnHeaders={columnHeaders}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className="mb-5 footer-controls">
                        <RowsPerPageControl />
                        <PaginationControl currentPage={currentPage} totalPages={totalPages} />
                    </div>
                </>
            )}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    sorting: tableDataSelectors.getSorting(state),
    sortingColumn: tableDataSelectors.getSortingColumn(state),
    rowsPerPage: tableDataSelectors.getRowsPerPage(state),
    currentPage: tableDataSelectors.getCurrentPage(state),
    totalPages: tableDataSelectors.getTotalPages(state),
    tableLoading: tableDataSelectors.getLoading(state),
    tableError: tableDataSelectors.getError(state),
    tableAllIds: tableDataSelectors.getAllIds(state),
    sortedFilteredRenderDataIds: tableDataSelectors.getSortedFilteredRenderDataIds(state),
    sortFilterSlicedDataIds: tableDataSelectors.getSortFilterSlicedDataIds(state),
});

const mapDispatchToProps = (dispatch: Dispatch<TableDataActions>) => ({
    setFilteredColumnAndValue: (data: FilteringColumn) => {
        dispatch(actions.setFilteredColumnAndValue(data));
    },
    setTotalPages: (totalPages: number) => {
        dispatch(actions.setTotalPages(totalPages));
    },
    setTableRenderData: (data: NormalizedObject) => {
        dispatch(actions.setRenderData(data));
    },
    setTableLoading: () => {
        dispatch(actions.setLoading());
    },
    setTableError: (error: string) => {
        dispatch(actions.setError(error));
    },
    setTableAllIds: (allIds: number[]) => {
        dispatch(actions.setAllIds(allIds));
    },
    setSortedFilteredRenderDataIds: (allIds: number[]) => {
        dispatch(actions.setSortedFilteredRenderDataIds(allIds));
    },
    setSortFilterSlicedDataIds: (allIds: number[]) => {
        dispatch(actions.setSortFilterSlicedDataIds(allIds));
    },
    sortRenderData: () => {
        dispatch(actions.sortRenderData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
