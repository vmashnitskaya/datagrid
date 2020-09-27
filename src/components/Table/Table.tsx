import React, { FC, useEffect, useState, useCallback, useMemo } from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import Loader from '../Loader';
import TableRow from './TableRow';
import './Table.scss';

import { ColumnInterface } from '../ColumnInterface';

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

    useEffect(() => {
        setFilteredColumnAndValue(
            columnHeaders.reduce((acc, el) => ({ ...acc, [el.name]: '' }), {} as FilteringColumn)
        );
    }, [columnHeaders]);

    useEffect(() => {
        setSortedFilteredRenderData([...renderData]);
    }, [sorting, renderData]);

    const sortData = useCallback(() => {
        const arrayForSorting = [...sortedFilteredRenderData];
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
    }, [sortingColumn, sorting, sortedFilteredRenderData]);

    useEffect(() => {
        if (sorting.length > 0) {
            setSortedFilteredRenderData(sortData());
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

    const handleFilterOpened = (columnName: string) => {
        if (filteredColumnOpened.length > 0) {
            setFilteredColumnOpened('');
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
                return element[column].toLowerCase().includes(query.toLowerCase());
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
            data = filterStringsAndNumbers(column, filteredColumnAndValue[column], renderData);
        });

        setSortedFilteredRenderData(data);
    };

    const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        filterRenderData();
    };

    const handleSearchByString = (
        event: React.ChangeEvent<HTMLInputElement>,
        columnName: string
    ) => {
        const query = event.target.value;
        setFilteredColumnAndValue((prevState) => ({ ...prevState, [columnName]: query }));
    };

    return (
        <>
            {loading || error.length > 0 || renderData.length === 0 ? (
                <Loader />
            ) : (
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            {columnHeaders.map((element, index: number) => (
                                <th key={`key${index + 1}`} className="bg-light">
                                    <div className="header">
                                        <div>{element.header}</div>
                                        <div className="icons">
                                            {element.filtering && (
                                                <>
                                                    <FilterListIcon
                                                        className={clsx(
                                                            'filtering',
                                                            filteredColumnAndValue[element.name]
                                                                .length > 0 && 'text-info'
                                                        )}
                                                        onClick={() =>
                                                            handleFilterOpened(element.name)
                                                        }
                                                    />
                                                    <div
                                                        className={clsx(
                                                            'filterPopUp',
                                                            'bg-light',
                                                            filteredColumnOpened !== element.name &&
                                                                'hidden'
                                                        )}
                                                    >
                                                        <form
                                                            autoComplete="off"
                                                            onSubmit={handleFilter}
                                                        >
                                                            {element.type === 'string' && (
                                                                <>
                                                                    <input
                                                                        className="form-control form-control-sm"
                                                                        id="exampleInputEmail1"
                                                                        aria-describedby="emailHelp"
                                                                        onChange={(event) =>
                                                                            handleSearchByString(
                                                                                event,
                                                                                element.name
                                                                            )
                                                                        }
                                                                        value={
                                                                            filteredColumnAndValue[
                                                                                element.name
                                                                            ]
                                                                        }
                                                                    />
                                                                    <small
                                                                        id="emailHelp"
                                                                        className="form-text text-muted"
                                                                    >
                                                                        Enter filter criteria and
                                                                        click Enter.
                                                                    </small>
                                                                </>
                                                            )}
                                                        </form>
                                                    </div>
                                                </>
                                            )}
                                            {element.sorting && (
                                                <div className="sorting">
                                                    <ArrowDropUpIcon
                                                        className={clsx(
                                                            'up',
                                                            'text-secondary',
                                                            sorting === 'up' &&
                                                                sortingColumn === element.name &&
                                                                'text-info'
                                                        )}
                                                        onClick={() =>
                                                            handleReverseSorting(element.name)
                                                        }
                                                    />
                                                    <ArrowDropDownIcon
                                                        className={clsx(
                                                            'down',
                                                            'text-secondary',
                                                            sorting === 'down' &&
                                                                sortingColumn === element.name &&
                                                                'text-info'
                                                        )}
                                                        onClick={() => handleSorting(element.name)}
                                                    />
                                                </div>
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
            )}
        </>
    );
};

export default Table;
