import React, { FC } from 'react';

interface TableCellProps {
    rowElement: { [key: string]: any };
    columnName: string;
}

const handleEmailDisplaying = (rowElement: { [key: string]: any }, columnName: string) => {
    if (columnName === 'email') {
        return (
            <a className="text-secondary" href={`mailto:${rowElement[columnName]}`}>
                {rowElement[columnName]}
            </a>
        );
    }
    if (columnName === 'app_url') {
        return (
            <a
                className="text-secondary"
                href={`${rowElement[columnName]}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {rowElement[columnName]}
            </a>
        );
    }
    return rowElement[columnName];
};

const TableCell: FC<TableCellProps> = ({ rowElement, columnName }) => {
    return (
        <td>
            {typeof rowElement[columnName] === 'object' && rowElement[columnName] !== null
                ? Object.values(rowElement[columnName]).join(', ')
                : handleEmailDisplaying(rowElement, columnName)}
        </td>
    );
};

export default TableCell;
