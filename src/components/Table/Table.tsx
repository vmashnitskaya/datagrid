import React, { FC, useEffect, useState, useCallback, ChangeEvent, FormEvent } from 'react';
import Loader from './Loader';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import PaginationControl from './PaginationControl';
import './Table.scss';

import { ColumnInterface } from '../ColumnInterface';
import { FilteringColumn } from './FilteringColumnInterface';
import RowsPerPageControl from './RowsPerPageControl';

export interface TableProps {
    renderData: { [key: string]: any }[];
    loading: boolean;
    error: string;
    columnHeaders: ColumnInterface[];
}

const Table: FC<TableProps> = ({ renderData, loading, error, columnHeaders }) => {
    const [sorting, setSorting] = useState<string>('');
    const [sortingColumn, setSortingColumn] = useState<string>('');
    const [sortedFilteredRenderData, setSortedFilteredRenderData] = useState<
        { [key: string]: any }[]
    >([]);
    const [notFilteredRenderData, setNotFilteredRenderData] = useState<{ [key: string]: any }[]>(
        []
    );
    const [filteredColumnAndValue, setFilteredColumnAndValue] = useState<FilteringColumn>({});
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(renderData.length / rowsPerPage);
    const [pageInputState, setPageInputState] = useState();

    useEffect(() => {
        setPageInputState(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const index = currentPage - 1;
        setNotFilteredRenderData(
            renderData.slice(index * rowsPerPage, index * rowsPerPage + rowsPerPage)
        );
    }, [currentPage, renderData, rowsPerPage]);

    useEffect(() => {
        setSortedFilteredRenderData(notFilteredRenderData);
    }, [notFilteredRenderData]);

    useEffect(() => {
        setTotalPages(Math.ceil(renderData.length / rowsPerPage));
    }, [renderData.length, rowsPerPage]);

    useEffect(() => {
        setFilteredColumnAndValue(
            columnHeaders.reduce((acc, el) => ({ ...acc, [el.name]: '' }), {} as FilteringColumn)
        );
    }, [columnHeaders]);

    const sortData = useCallback(
        (data: { [key: string]: any }[]) => {
            const arrayForSorting = [...data];
            arrayForSorting.sort((a, b) => {
                if (a[sortingColumn] < b[sortingColumn]) {
                    return sorting === 'up' ? -1 : 1;
                }
                if (a[sortingColumn] > b[sortingColumn]) {
                    return sorting === 'up' ? 1 : -1;
                }
                return 0;
            });
            return arrayForSorting;
        },
        [sortingColumn, sorting]
    );

    useEffect(() => {
        if (sorting.length > 0) {
            setSortedFilteredRenderData(sortData);
        }
    }, [sorting, sortingColumn, renderData, sortData, rowsPerPage]);

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
        console.log(query);
        setFilteredColumnAndValue((prevState) => ({ ...prevState, [columnName]: query }));
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

export default Table;
