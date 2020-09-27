import React, { FC, useEffect, useState, useCallback } from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
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
    columnsForSorting: string[];
}

const Table: FC<TableProps> = ({
    renderData,
    loading,
    error,
    columnHeaders,
    columnsForSorting,
}) => {
    const [sorting, setSorting] = useState<string>('');
    const [sortingColumn, setSortingColumn] = useState<string>('');
    const [sortedRenderData, setSortedRenderData] = useState<{ [key: string]: any }[]>([]);

    useEffect(() => {
        setSortedRenderData([...renderData]);
    }, [sorting, renderData]);

    const sortData = useCallback(() => {
        const arrayForSorting = [...renderData];
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
    }, [renderData, sortingColumn, sorting]);

    useEffect(() => {
        if (sorting.length > 0) {
            setSortedRenderData(sortData());
        }
    }, [sorting, sortingColumn, renderData, sortData]);

    useEffect(() => {
        console.log(sortedRenderData);
    }, [sortedRenderData]);

    const handleSorting = (columnName: string) => {
        setSorting('down');
        setSortingColumn(columnName);
    };
    const handleReverseSorting = (columnName: string) => {
        setSorting('up');
        setSortingColumn(columnName);
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
                                        {columnsForSorting.includes(element.name) && (
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
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRenderData.map((element: { [key: string]: any }, index: number) => (
                            <TableRow
                                key={`key${index + 1}`}
                                row={element}
                                columnHeaders={columnHeaders}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Table;
