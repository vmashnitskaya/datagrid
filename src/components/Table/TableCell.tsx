import React, { AnchorHTMLAttributes, ChangeEvent, FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './TableCell.scss';

import { TableDataActions } from '../../redux/tableData/tableDataTypes';
import actions from '../../redux/tableData/tableDataActions';

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

    const handleDifferentTypesDisplaying = (): AnchorHTMLAttributes<any> | string => {
        if (columnName === 'email') {
            return (
                <a className="text-dark" href={`mailto:${rowElement[columnName]}`}>
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
        if (columnName === 'checkbox') {
            return (
                <input
                    type="checkbox"
                    className="rowSelection"
                    data-id={rowElement._id}
                    checked={rowElement.checkbox}
                    onChange={handleRowChecked}
                />
            );
        }
        if (columnName === 'open') {
            return (
                <Link
                    className="text-info"
                    to={(location) =>
                        `${location.pathname.slice(0, location.pathname.length - 1)}?id=${
                            rowElement._id
                        }`
                    }
                >
                    Open
                </Link>
            );
        }
        return rowElement[columnName] || '';
    };

    return <td>{handleDifferentTypesDisplaying()}</td>;
};

const mapDispatchToProps = (dispatch: Dispatch<TableDataActions>) => ({
    checkRowCheckbox: (id: string) => {
        dispatch(actions.checkRowCheckbox(id));
    },
});

export default connect(null, mapDispatchToProps)(TableCell);
