import React, { FC, useEffect, useState, useCallback } from 'react';
import Loader from '../Loader';
import TableRow from './TableRow';
import './Table.scss';

import { ColumnInterface } from '../ColumnInterface';
import SortingControls from './SortingControls';
import FilterControl from './FilterControl';
import FilterPopUp from './FilterPopUp';
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

    useEffect(() => {
        setFilteredColumnAndValue(
            columnHeaders.reduce((acc, el) => ({ ...acc, [el.name]: '' }), {} as FilteringColumn)
        );
    }, [columnHeaders]);

    useEffect(() => {
        setSortedFilteredRenderData([...renderData]);
    }, [sorting, renderData]);

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

        console.log(filteringColumns);

        let data: { [key: string]: any }[] = [...renderData];
        filteringColumns.forEach((column) => {
            data = filterStringsAndNumbers(column, filteredColumnAndValue[column], data);
        });

        console.log(data);

        setSortedFilteredRenderData(data);
    };

    const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
        console.log(filteredColumnAndValue);
        filterRenderData();
        closePopUp();
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
                                                <Filtering
                                                    currentElementColumn={element.name}
                                                    filteredColumnAndValue={filteredColumnAndValue}
                                                    handleFilterOpened={handleFilterOpened}
                                                    filteredColumnOpened={filteredColumnOpened}
                                                    handleFilter={handleFilter}
                                                    handleInputProvided={handleInputProvided}
                                                    currentElementType={element.type}
                                                    closePopUp={closePopUp}
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
            )}
        </>
    );
};

export default Table;
