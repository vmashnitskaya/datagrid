import React, { AnchorHTMLAttributes, FC } from 'react';

interface TableCellProps {
    rowElement: { [key: string]: any };
    columnName: string;
}

/**
 * returns element in link tag if column name equals email or app_url.
 */

const handleLinkDisplaying = (
    rowElement: { [key: string]: any },
    columnName: string
): AnchorHTMLAttributes<any> | string => {
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

/**
 * Component for displaying table cell.
 *
 * @param props
 * @param {Object.<string, any>} props.rowElement - the object with all data for particular row.
 * @param {string} props.columnName - current column name.
 * @returns {JSX.Element}
 */

const TableCell: FC<TableCellProps> = ({ rowElement, columnName }) => {
    return (
        <td>
            {typeof rowElement[columnName] === 'object' && rowElement[columnName] !== null
                ? Object.values(rowElement[columnName]).join(', ')
                : handleLinkDisplaying(rowElement, columnName)}
        </td>
    );
};

export default TableCell;
