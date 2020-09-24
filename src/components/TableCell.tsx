import React, { FC } from 'react';

interface TableCellProps {
    row: { [key: string]: any };
    columnName: string;
}

const handleEmailDisplaying = (row: { [key: string]: any }, columnName: string) => {
    if (columnName === 'email') {
        return (
            <a className="text-secondary" href={`mailto:${row[columnName]}`}>
                {row[columnName]}
            </a>
        );
    }
    return row[columnName];
};

const TableCell: FC<TableCellProps> = ({ row, columnName }) => {
    return (
        <td>
            {typeof row[columnName] === 'object' && row[columnName] !== null
                ? Object.values(row[columnName]).join(', ')
                : handleEmailDisplaying(row, columnName)}
        </td>
    );
};

export default TableCell;
