import React, { FC, useEffect, useState, useCallback, ChangeEvent, FormEvent } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import clsx from 'clsx';
import Loader from '../Loader';
import TableRow from './TableRow';
import './Table.scss';

import { ColumnInterface } from '../ColumnInterface';
import SortingControls from './SortingControls';
import Filtering from './Filtering';

export interface TableProps {
    renderData: { [key: string]: any }[];
    loading: boolean;
    error: string;
    columnHeaders: ColumnInterface[];
}
interface FilteringColumn {
    [key: string]: string;
}

const Table: FC<TableProps> = ({ renderData, loading, error, columnHeaders }) => {
    const [sorting, setSorting] = useState<string>('');
    const [sortingColumn, setSortingColumn] = useState<string>('');
    const [sortedFilteredRenderData, setSortedFilteredRenderData] = useState<
        { [key: string]: any }[]
    >([]);
    const [filteredColumnOpened, setFilteredColumnOpened] = useState<string>('');
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
        setSortedFilteredRenderData(
            renderData.slice(index * rowsPerPage, index * rowsPerPage + rowsPerPage)
        );
    }, [currentPage, renderData, rowsPerPage]);

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
    }, [sorting, sortingColumn, renderData, sortData]);

    const handleSorting = (columnName: string) => {
        setSorting('down');
        setSortingColumn(columnName);
    };

    const handleReverseSorting = (columnName: string) => {
        setSorting('up');
        setSortingColumn(columnName);
    };

    const closePopUp = (): void => {
        setFilteredColumnOpened('');
    };

    const handleFilterOpened = (columnName: string) => {
        if (filteredColumnOpened.length > 0) {
            closePopUp();
        } else {
            setFilteredColumnOpened(columnName);
        }
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

        let data: { [key: string]: any }[] = [...renderData];
        filteringColumns.forEach((column) => {
            data = filterStringsAndNumbers(column, filteredColumnAndValue[column], data);
        });

        setSortedFilteredRenderData(data);
    };

    const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
        filterRenderData();
        closePopUp();
        event.preventDefault();
    };

    const handleInputProvided = (
        event: React.ChangeEvent<HTMLInputElement>,
        columnName: string
    ) => {
        const query = event.target.value;
        setFilteredColumnAndValue((prevState) => ({ ...prevState, [columnName]: query }));
    };

    const handleNextPageNavigation = () => {
        setCurrentPage((prevState: number) => {
            return prevState + 1 > totalPages ? prevState : prevState + 1;
        });
    };

    const handlePreviousPageNavigation = () => {
        setCurrentPage((prevState: number) => {
            return prevState - 1 > 0 ? prevState - 1 : prevState;
        });
    };

    const handleFirstPageNavigation = () => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    };

    const handleLastPageNavigation = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(totalPages);
        }
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
                                    <th key={`key${index + 1}`} className="bg-light">
                                        <div className="header">
                                            <div>{element.header.replace(/ /g, '\u00a0')}</div>
                                            <div className="icons">
                                                {element.filtering && (
                                                    <Filtering
                                                        currentElementColumn={element.name}
                                                        filteredColumnAndValue={
                                                            filteredColumnAndValue
                                                        }
                                                        handleFilterOpened={handleFilterOpened}
                                                        filteredColumnOpened={filteredColumnOpened}
                                                        handleFilter={handleFilter}
                                                        handleInputProvided={handleInputProvided}
                                                        currentElementType={element.type}
                                                    />
                                                )}
                                                {element.sorting && (
                                                    <SortingControls
                                                        sortingColumn={sortingColumn}
                                                        currentElementColumn={element.name}
                                                        handleReverseSorting={handleReverseSorting}
                                                        handleSorting={handleSorting}
                                                        sorting={sorting}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </th>
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
                    <div className="mb-5">
                        <div className="pagination">
                            <FirstPageIcon
                                className={clsx('page-first', currentPage !== 1 && 'text-info')}
                                onClick={handleFirstPageNavigation}
                            />
                            <NavigateBeforeIcon
                                className={clsx('page-previous', currentPage !== 1 && 'text-info')}
                                onClick={handlePreviousPageNavigation}
                            />
                            <form
                                className="pagination-input"
                                onSubmit={handlePageNavigationByInput}
                            >
                                <input
                                    type="text"
                                    value={pageInputState}
                                    onChange={handlePageEnter}
                                />{' '}
                                of {totalPages}
                            </form>
                            <NavigateNextIcon
                                className={clsx(
                                    'page-next',
                                    currentPage !== totalPages && 'text-info'
                                )}
                                onClick={handleNextPageNavigation}
                            />
                            <LastPageIcon
                                className={clsx(
                                    'page-last',
                                    currentPage !== totalPages && 'text-info'
                                )}
                                onClick={handleLastPageNavigation}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Table;
