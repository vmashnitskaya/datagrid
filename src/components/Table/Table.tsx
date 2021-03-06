import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Loader from '../Loader';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import PaginationControl from './Pagination/PaginationControl';
import CSVDownload from './CSVDownload';
import './Table.scss';

import { ColumnInterface } from '../../redux/tableData/ColumnInterface';
import { FilteringColumn } from './Filtering/FilteringColumnInterface';
import RowsPerPageControl from './Pagination/RowsPerPageControl';
import { NormalizedObject } from '../../redux/tableData/tableDataInterface';

import actions from '../../redux/tableData/tableDataActions';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import pagingSelectors from '../../redux/tableData/paging/pagingSelectors';
import pagingActions from '../../redux/tableData/paging/pagingActions';
import { RootState } from '../../redux/rootReducer';
import { TableDataActions } from '../../redux/tableData/tableDataTypes';
import CreateNewRowControl from './ActionsWithTableItems/CreateNewRowControl';
import { PagingActions } from '../../redux/tableData/paging/pagingTypes';
import AlertWrapper from './AlertWrapper';

export interface TableProps {
    tableLoading: boolean;
    tableAllIds: string[];
    renderData: { [key: string]: any };
    loading: boolean;
    allIds: string[];
    rowsPerPage: number;
    currentPage: number;
    totalPages: number;
    setFilteredColumnAndValue: (data: FilteringColumn) => void;
    setTotalPages: (totalPages: number) => void;
    sortRenderData: () => void;
    setTableRenderData: (data: NormalizedObject) => void;
    setTableAllIds: (allIds: string[]) => void;
    setSortedFilteredRenderDataIds: (allIds: string[]) => void;
    setSortFilterSlicedDataIds: (allIds: string[]) => void;
    sortedFilteredRenderDataIds: string[];
    sortFilterSlicedDataIds: string[];
    setTableColumnHeaders: () => void;
    tableColumnHeaders: ColumnInterface[];
    tableRenderData: { [key: string]: any };
    tableError: string;
    error: string;
    infoMessage: string;
    resetMessages: () => void;
    tabActive: string;
}

/**
 * Component for displaying table.
 *
 * @param props
 * @param {boolean} props.tableLoading - the loading of data.
 * @param {FilteringColumn} props.filteredColumnAndValue - the object with column as key and query as value.
 * @param {ColumnInterface[]} props.tableColumnHeaders - column headers used for table.
 * @param {string} props.tableError - the error if occurred during data loading.
 * @param {string[]} props.tableAllIds - the array with initial data ids used in component.
 * @param {NormalizedObject} props.renderData - the object with whole data for the table, not sorted, filtered, sliced.
 * @param {string[]} props.allIds - the array with ids for props.renderData.
 * @param {boolean} props.loading - the loading of data supplied from one of custom tables.
 * @param {string} props.error - the error supplied from one of custom tables.
 * @param {ColumnInterface[]} props.columnHeaders - the array with column headers and information about columns.
 * @param {string[]} props.sortFilterSlicedDataIds  - the array with sequence of ids for filtered, sorted, sliced data. Used for displaying on particular table page.
 * @param {string[]} props.sortedFilteredRenderDataIds - the array with sequence of ids for filtered and sorted data.
 * @param {number} props.rowsPerPage - the amount of rows per page.
 * @param {number} props.currentPage - the current page.
 * @param {number} props.totalPages - the total pages in table.
 * @param {function(FilteringColumn): void} props.setFilteredColumnAndValue
 * @param {function(number): void} props.setTotalPages
 * @param {function(NormalizedObject): void} props.setTableRenderData
 * @param {function(string[]): void} props.setTableAllIds
 * @param {function(string[]): void} props.setSortedFilteredRenderDataIds
 * @param {function(string[]): void} props.setSortFilterSlicedDataIds
 * @param {function(ColumnInterface[]: void)} props.setTableColumnHeaders
 * @returns {JSX.Element}
 */

const Table: FC<TableProps> = ({
    tableError,
    error,
    infoMessage,
    tableAllIds,
    renderData,
    allIds,
    loading,
    tableLoading,
    rowsPerPage,
    currentPage,
    totalPages,
    tableRenderData,
    setFilteredColumnAndValue,
    setTotalPages,
    setTableRenderData,
    setTableAllIds,
    sortFilterSlicedDataIds,
    setSortedFilteredRenderDataIds,
    setSortFilterSlicedDataIds,
    sortedFilteredRenderDataIds,
    setTableColumnHeaders,
    tableColumnHeaders,
    resetMessages,
    tabActive,
}) => {
    const [alertShown, setAlertShown] = useState<boolean>(false);

    const handleAlertChange = (value: boolean) => {
        if (alertShown) {
            resetMessages();
        }
        setAlertShown(value);
    };

    useEffect(() => {
        if (error || tableError || infoMessage) {
            setAlertShown(true);
        }
    }, [error, tableError, infoMessage]);
    /**
     * Table data is set after receiving from any of 3 components: UserTable, AppTable, LocationTable.
     */
    useEffect(() => {
        setTableRenderData({ ...renderData });
    }, [renderData, setTableRenderData]);

    useEffect(() => {
        setTableAllIds([...allIds]);
    }, [allIds, setTableAllIds]);

    useEffect(() => {
        if (tabActive) {
            setTableColumnHeaders();
        }
    }, [setTableColumnHeaders, tabActive]);
    /**
     * Table data ids are initially set to sortedFilteredRenderDataIds.
     */

    useEffect(() => {
        setSortedFilteredRenderDataIds([...tableAllIds]);
    }, [setSortedFilteredRenderDataIds, tableAllIds, tableRenderData]);

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
        setTotalPages(
            sortedFilteredRenderDataIds.length > 0
                ? Math.ceil(sortedFilteredRenderDataIds.length / rowsPerPage)
                : 1
        );
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
            tableColumnHeaders.reduce(
                (acc, el) => ({ ...acc, [el.name]: '' }),
                {} as FilteringColumn
            )
        );
    }, [tableColumnHeaders, setFilteredColumnAndValue]);

    const handleOnDragEnd = (result: { [key: string]: any }) => {
        if (!result.destination) return;
        const items = [...sortedFilteredRenderDataIds];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSortedFilteredRenderDataIds(items);
    };

    return (
        <>
            {loading || tableLoading ? (
                <Loader />
            ) : (
                <>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                {tableColumnHeaders.map(
                                    (element, index: number) =>
                                        element.display && (
                                            <TableHeader
                                                key={`key${index + 1}`}
                                                element={element}
                                                last={index === tableColumnHeaders.length - 1}
                                            />
                                        )
                                )}
                            </tr>
                            <tr>
                                <td
                                    className="bg-light create-wrapper"
                                    colSpan={tableColumnHeaders.length}
                                >
                                    <CreateNewRowControl />
                                </td>
                            </tr>
                        </thead>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="tbody">
                                {(provided) => (
                                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                                        {sortFilterSlicedDataIds.length === 0 && (
                                            <tr>
                                                <td
                                                    className="bg-light no-data"
                                                    colSpan={
                                                        tableColumnHeaders.filter(
                                                            (el) => el.display
                                                        ).length
                                                    }
                                                >
                                                    No data to display.
                                                </td>
                                            </tr>
                                        )}
                                        {sortFilterSlicedDataIds.length > 0 &&
                                            sortFilterSlicedDataIds.map(
                                                (element: string, index: number) => (
                                                    <TableRow
                                                        key={element}
                                                        id={element}
                                                        index={index}
                                                        tableColumnHeaders={tableColumnHeaders}
                                                    />
                                                )
                                            )}
                                        {provided.placeholder}
                                    </tbody>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </table>

                    <div className="footer-controls">
                        <div className="footer-buttons">
                            <RowsPerPageControl />
                            <CSVDownload />
                        </div>
                        <PaginationControl currentPage={currentPage} totalPages={totalPages} />
                    </div>
                    <AlertWrapper
                        value={error || tableError ? error : infoMessage}
                        classNames="create-page"
                        variant={error || tableError ? 'danger' : 'success'}
                        alertShown={alertShown}
                        handleAlertChange={handleAlertChange}
                    />
                </>
            )}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    sortingColumn: tableDataSelectors.getSortingColumn(state),
    rowsPerPage: pagingSelectors.getRowsPerPage(state),
    currentPage: pagingSelectors.getCurrentPage(state),
    totalPages: pagingSelectors.getTotalPages(state),
    tableLoading: tableDataSelectors.getLoading(state),
    tableError: tableDataSelectors.getError(state),
    tableAllIds: tableDataSelectors.getAllIds(state),
    sortedFilteredRenderDataIds: tableDataSelectors.getSortedFilteredRenderDataIds(state),
    sortFilterSlicedDataIds: tableDataSelectors.getSortFilterSlicedDataIds(state),
    tableColumnHeaders: tableDataSelectors.getColumnHeaders(state),
    tableRenderData: tableDataSelectors.getRenderData(state),
    infoMessage: tableDataSelectors.getInfoMessage(state),
    tabActive: tableDataSelectors.getTabActive(state),
});

const mapDispatchToProps = (dispatch: Dispatch<TableDataActions | PagingActions>) => ({
    setFilteredColumnAndValue: (data: FilteringColumn) => {
        dispatch(actions.setFilteredColumnAndValue(data));
    },
    setTotalPages: (totalPages: number) => {
        dispatch(pagingActions.setTotalPages(totalPages));
    },
    setTableRenderData: (data: NormalizedObject) => {
        dispatch(actions.setRenderData(data));
    },
    setTableAllIds: (allIds: string[]) => {
        dispatch(actions.setAllIds(allIds));
    },
    setSortedFilteredRenderDataIds: (allIds: string[]) => {
        dispatch(actions.setSortedFilteredRenderDataIds(allIds));
    },
    setSortFilterSlicedDataIds: (allIds: string[]) => {
        dispatch(actions.setSortFilterSlicedDataIds(allIds));
    },
    sortRenderData: () => {
        dispatch(actions.sortRenderData());
    },
    setTableColumnHeaders: () => {
        dispatch(actions.setColumnHeaders());
    },
    resetMessages: () => {
        dispatch(actions.resetMessages());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
