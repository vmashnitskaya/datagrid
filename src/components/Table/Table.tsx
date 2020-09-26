import React, { FC } from 'react';

import Loader from '../Loader';
import TableRow from './TableRow';

import { ColumnInterface } from '../ColumnInterface';

export interface TableProps {
    renderData: { [key: string]: any }[];
    loading: boolean;
    error: string;
    columnHeaders: ColumnInterface[];
}

const Table: FC<TableProps> = ({ renderData, loading, error, columnHeaders }) => {
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
                                    {element.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {renderData.map((element: { [key: string]: any }, index: number) => (
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
