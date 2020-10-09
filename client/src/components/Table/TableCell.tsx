import React, { AnchorHTMLAttributes, ChangeEvent, FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TableDataActions } from '../../redux/tableData/tableDataTypes';
import actions from '../../redux/tableData/tableDataActions';
import './TableCell.scss';

interface TableCellProps {
    rowElement: { [key: string]: any };
    columnName: string;
    checkRowCheckbox: (id: string) => void;
}

/**
 * Component for displaying table cell.
 *
 * @param props
 * @param {Object.<string, any>} props.rowElement - the object with all data for particular row.
 * @param {string} props.columnName - current column name.
 * @returns {JSX.Element}
 */

const TableCell: FC<TableCellProps> = ({ rowElement, columnName, checkRowCheckbox }) => {
    const handleRowChecked = (event: ChangeEvent<HTMLInputElement>) => {
        const rowId = event.target.dataset.id;
        checkRowCheckbox(rowId || '');
    };

    const handleDifferentTypesDisplaying = (
        rowElementPassed: { [key: string]: any },
        columnNamePassed: string
    ): AnchorHTMLAttributes<any> | string => {
        if (columnName === 'email') {
            return (
                <a className="text-secondary" href={`mailto:${rowElementPassed[columnNamePassed]}`}>
                    {rowElementPassed[columnNamePassed]}
                </a>
            );
        }
        if (columnName === 'app_url') {
            return (
                <a
                    className="text-secondary"
                    href={`${rowElementPassed[columnNamePassed]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {rowElementPassed[columnNamePassed]}
                </a>
            );
        }
        if (columnNamePassed === 'checkbox') {
            return (
                <input
                    type="checkbox"
                    data-id={rowElementPassed.id}
                    checked={rowElementPassed.checkbox}
                    onChange={handleRowChecked}
                />
            );
        }
        return rowElementPassed[columnNamePassed];
    };

    return (
        <td>
            {typeof rowElement[columnName] === 'object' && rowElement[columnName] !== null
                ? Object.values(rowElement[columnName]).join(', ')
                : handleDifferentTypesDisplaying(rowElement, columnName)}
        </td>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<TableDataActions>) => ({
    checkRowCheckbox: (id: string) => {
        dispatch(actions.checkRowCheckbox(id));
    },
});

export default connect(null, mapDispatchToProps)(TableCell);
