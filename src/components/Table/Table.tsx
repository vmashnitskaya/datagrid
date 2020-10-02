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
import { RootState } from '../../redux/rootReducer';

import actions from '../../redux/tableData/tableDataActions';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';

export interface TableProps {
    renderData: { [key: string]: any }[];
    loading: boolean;
    error: string;
    columnHeaders: ColumnInterface[];
    sorting: string;
    sortingColumn: string;
    sortedFilteredRenderData: { [key: string]: any }[];
    notFilteredRenderData: { [key: string]: any }[];
    filteredColumnAndValue: FilteringColumn;
    rowsPerPage: number;
    currentPage: number;
    totalPages: number;
    setSorting: (sorting: string) => void;
    setSortingColumn: (column: string) => void;
    setSortedFilteredRenderData: (data: { [key: string]: string }[]) => void;
    setNotFilteredRenderData: (data: { [key: string]: string }[]) => void;
    setFilteredColumnAndValue: (data: FilteringColumn) => void;
    setTotalPages: (totalPages: number) => void;
    sortRenderData: () => void;
}

const Table: FC<TableProps> = ({
    renderData,
    loading,
    error,
    columnHeaders,
    sorting,
    sortingColumn,
    sortedFilteredRenderData,
    notFilteredRenderData,
    filteredColumnAndValue,
    rowsPerPage,
    currentPage,
    totalPages,
    setSorting,
    setSortingColumn,
    setSortedFilteredRenderData,
    setNotFilteredRenderData,
    setFilteredColumnAndValue,
    setTotalPages,
    sortRenderData,
}) => {
    useEffect(() => {
        const index = currentPage - 1;
        setNotFilteredRenderData(
            renderData.slice(index * rowsPerPage, index * rowsPerPage + rowsPerPage)
        );
    }, [currentPage, renderData, rowsPerPage, setNotFilteredRenderData]);

    useEffect(() => {
        setSortedFilteredRenderData(notFilteredRenderData);
    }, [notFilteredRenderData, setSortedFilteredRenderData]);

    useEffect(() => {
        setTotalPages(Math.ceil(renderData.length / rowsPerPage));
    }, [renderData.length, rowsPerPage, setTotalPages]);

    useEffect(() => {
        setFilteredColumnAndValue(
            columnHeaders.reduce((acc, el) => ({ ...acc, [el.name]: '' }), {} as FilteringColumn)
        );
    }, [columnHeaders, setFilteredColumnAndValue]);

    useEffect(() => {
        if (sorting.length > 0) {
            sortRenderData();
        }
    }, [sortRenderData, sorting.length]);

    const handleSorting = (columnName: string, direction: string) => {
        setSorting(direction);
        setSortingColumn(columnName);
    };

    /*    const filterRenderData = () => {
        const filteringColumns = Object.keys(filteredColumnAndValue).filter((element) => {
            return filteredColumnAndValue[element].length > 0;
        });

        let data: { [key: string]: any }[] = [...notFilteredRenderData];
        filteringColumns.forEach((column) => {
            data = filterStringsAndNumbers(column, filteredColumnAndValue[column], data);
        });

        setSortedFilteredRenderData(data);
    }; */

    return (
        <>
            {loading || error.length > 0 || renderData.length === 0 ? (
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
                                        handleSorting={handleSorting}
                                        sorting={sorting}
                                        sortingColumn={sortingColumn}
                                    />
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedFilteredRenderData.map(
                                (element: { [key: string]: any }, index: number) => (
                                    <TableRow
                                        key={`key${index + 1}`}
                                        row={element}
                                        columnHeaders={columnHeaders}
                                    />
                                )
                            )}
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
    sortedFilteredRenderData: tableDataSelectors.getSortedFilteredRenderData(state),
    notFilteredRenderData: tableDataSelectors.getNotFilteredRenderData(state),
    filteredColumnAndValue: tableDataSelectors.getFilteredColumnAndValue(state),
    rowsPerPage: tableDataSelectors.getRowsPerPage(state),
    currentPage: tableDataSelectors.getCurrentPage(state),
    totalPages: tableDataSelectors.getTotalPages(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    setSorting: (direction: string) => {
        dispatch(actions.setSorting(direction));
    },
    setSortingColumn: (column: string) => {
        dispatch(actions.setSortingColumn(column));
    },
    setSortedFilteredRenderData: (data: { [key: string]: any }[]) => {
        dispatch(actions.setSortedFilteredRenderData(data));
    },
    setNotFilteredRenderData: (data: { [key: string]: any }[]) => {
        dispatch(actions.setNotFilteredRenderData(data));
    },
    setFilteredColumnAndValue: (data: FilteringColumn) => {
        dispatch(actions.setFilteredColumnAndValue(data));
    },
    setTotalPages: (totalPages: number) => {
        dispatch(actions.setTotalPages(totalPages));
    },
    sortRenderData: () => {
        dispatch(actions.sortRenderData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
