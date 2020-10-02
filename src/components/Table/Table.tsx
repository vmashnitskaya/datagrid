import React, { FC, useEffect, useState, useCallback, ChangeEvent, FormEvent } from 'react';
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
    setRowsPerPage: (rowsPerPage: number) => void;
    setCurrentPage: (currentPage: number) => void;
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
    setRowsPerPage,
    setCurrentPage,
    setTotalPages,
    sortRenderData,
}) => {
    const [pageInputState, setPageInputState] = useState<number>(1);

    useEffect(() => {
        setPageInputState(currentPage);
    }, [currentPage]);

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

    const filterStringsAndNumbers = (
        column: string,
        query: string,
        array: { [key: string]: any }[]
    ): { [key: string]: any }[] => {
        return array.filter((element) => {
            if (typeof element[column] === 'string') {
                return element[column].toLowerCase().startsWith(query.toLowerCase());
            }
            if (typeof element[column] === 'number') {
                return element[column] === Number(query);
            }
            return false;
        });
    };

    const filterRenderData = () => {
        const filteringColumns = Object.keys(filteredColumnAndValue).filter((element) => {
            return filteredColumnAndValue[element].length > 0;
        });

        let data: { [key: string]: any }[] = [...notFilteredRenderData];
        filteringColumns.forEach((column) => {
            data = filterStringsAndNumbers(column, filteredColumnAndValue[column], data);
        });

        setSortedFilteredRenderData(data);
    };

    const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
        filterRenderData();
        event.preventDefault();
    };

    const handleInputProvided = (
        event: React.ChangeEvent<HTMLInputElement>,
        columnName: string
    ) => {
        const query = event.target.value;
        setFilteredColumnAndValue({ ...filteredColumnAndValue, [columnName]: query });
    };

    const handlePageNavigation = (pageDirection: string) => {
        let nextPage = 0;

        switch (pageDirection) {
            case 'next':
                nextPage = currentPage + 1 > totalPages ? currentPage : currentPage + 1;
                break;
            case 'previous':
                nextPage = currentPage - 1 > 0 ? currentPage - 1 : currentPage;
                break;
            case 'first':
                nextPage = currentPage !== 1 ? 1 : currentPage;
                break;
            case 'last':
                nextPage = totalPages !== 1 ? totalPages : currentPage;
                break;
            default:
                nextPage = currentPage;
        }

        setCurrentPage(nextPage);
    };

    const handlePageEnter = (event: ChangeEvent<HTMLInputElement>) => {
        const page = Number(event.target.value);
        if (page <= totalPages) {
            setPageInputState(page);
        }
    };

    const handlePageNavigationByInput = (event: FormEvent) => {
        event.preventDefault();
        setCurrentPage(pageInputState);
    };

    const changeRowsPerPage = (rowsPerPageNext: number) => {
        setRowsPerPage(rowsPerPageNext);
    };

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
                                        handleFilter={handleFilter}
                                        handleInputProvided={handleInputProvided}
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
                        <RowsPerPageControl changeRowsPerPage={changeRowsPerPage} />
                        <PaginationControl
                            currentPage={currentPage}
                            handlePageNavigation={handlePageNavigation}
                            pageInputState={pageInputState}
                            totalPages={totalPages}
                            handlePageEnter={handlePageEnter}
                            handlePageNavigationByInput={handlePageNavigationByInput}
                        />
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
    setRowsPerPage: (rowsPerPage: number) => {
        dispatch(actions.setRowsPerPage(rowsPerPage));
    },
    setCurrentPage: (currentPage: number) => {
        dispatch(actions.setCurrentPage(currentPage));
    },
    setTotalPages: (totalPages: number) => {
        dispatch(actions.setTotalPages(totalPages));
    },
    sortRenderData: () => {
        dispatch(actions.sortRenderData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
