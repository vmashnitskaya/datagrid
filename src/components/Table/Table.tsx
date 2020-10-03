import React, { FC, useEffect } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';

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

export interface TableProps {
    tableLoading: boolean;
    tableError: string;
    tableAllIds: number[];
    renderData: { [key: string]: any };
    loading: boolean;
    error: string;
    allIds: number[];
    columnHeaders: ColumnInterface[];
    filteredColumnAndValue: FilteringColumn;
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

const Table: FC<TableProps> = ({
    tableLoading,
    tableError,
    tableAllIds,
    renderData,
    allIds,
    loading,
    error,
    columnHeaders,
    filteredColumnAndValue,
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

    useEffect(() => {
        setSortedFilteredRenderDataIds([...tableAllIds]);
    }, [setSortedFilteredRenderDataIds, tableAllIds]);

    useEffect(() => {
        const index = currentPage - 1;
        setSortFilterSlicedDataIds(
            sortedFilteredRenderDataIds.slice(
                index * rowsPerPage,
                index * rowsPerPage + rowsPerPage
            ).length > 0
                ? sortedFilteredRenderDataIds.slice(
                      index * rowsPerPage,
                      index * rowsPerPage + rowsPerPage
                  )
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
                                    <TableHeader
                                        key={`key${index + 1}`}
                                        element={element}
                                        filteredColumnAndValue={filteredColumnAndValue}
                                    />
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortFilterSlicedDataIds.length === 0 && <div>No data to display.</div>}
                            {sortFilterSlicedDataIds.map((element: number) => (
                                <TableRow
                                    key={`key${element}`}
                                    row={element}
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
    filteredColumnAndValue: tableDataSelectors.getFilteredColumnAndValue(state),
    rowsPerPage: tableDataSelectors.getRowsPerPage(state),
    currentPage: tableDataSelectors.getCurrentPage(state),
    totalPages: tableDataSelectors.getTotalPages(state),
    tableLoading: tableDataSelectors.getLoading(state),
    tableError: tableDataSelectors.getError(state),
    tableAllIds: tableDataSelectors.getAllIds(state),
    sortedFilteredRenderDataIds: tableDataSelectors.getSortedFilteredRenderDataIds(state),
    sortFilterSlicedDataIds: tableDataSelectors.getSortFilterSlicedDataIds(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
