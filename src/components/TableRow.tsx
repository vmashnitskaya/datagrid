import React, { FC } from 'react';
import { ColumnInterface } from './ColumnInterface';
import TableCell from './TableCell';

export interface TableRowProps {
    row: { [key: string]: any };
    columnHeaderForActiveTab: ColumnInterface[];
}

const TableRow: FC<TableRowProps> = ({ row, columnHeaderForActiveTab }) => {
    return (
        <tr>
            {columnHeaderForActiveTab.map((element: ColumnInterface, index: number) => {
                return <TableCell key={`key${index + 1}}`} row={row} columnName={element.name} />;
            })}
        </tr>
    );
};

export default TableRow;
