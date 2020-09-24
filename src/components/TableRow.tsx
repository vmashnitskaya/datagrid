import React, { FC } from 'react';
import { ColumnInterface } from './ColumnInterface';
import TableCell from './TableCell';

export interface TableRowProps {
    row: { [key: string]: any };
    columnHeaders: ColumnInterface[];
}

const TableRow: FC<TableRowProps> = ({ row, columnHeaders }) => {
    return (
        <tr>
            {columnHeaders.map((element: ColumnInterface) => {
                return <TableCell key={Date.now()} row={row} columnName={element.name} />;
            })}
        </tr>
    );
};

export default TableRow;
