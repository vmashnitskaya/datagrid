import React, { FC } from 'react';
import { Dispatch } from 'redux';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import Filtering from './Filtering/Filtering';
import SortingControls from './Sorting/SortingControls';
import './TableHeader.scss';

import { ColumnInterface } from '../../redux/tableData/ColumnInterface';
import ColumnSelectionPopOver from './ColumnSelectionPopOver';
import { TableDataActions } from '../../redux/tableData/tableDataTypes';
import actions from '../../redux/tableData/tableDataActions';

interface TableHeaderProps {
    element: ColumnInterface;
    last: boolean;
    deleteRows: () => void;
}

/**
 * Component for displaying table header.
 *
 * @param props
 * @param props.element - current column header.
 * @returns {JSX.Element}
 */

const TableHeader: FC<TableHeaderProps> = ({ element, last, deleteRows }) => {
    const handleRowsDeleting = () => {
        deleteRows();
    };

    const displayDifferentHeaderTypes = () => {
        if (element.name === 'checkbox') {
            return (
                <DeleteIcon className="delete-icon text-secondary" onClick={handleRowsDeleting} />
            );
        }
        if (element.name === 'open') {
            return <div>Open</div>;
        }
        return <div>{element.header.replace(/ /g, '\u00a0')}</div>;
    };

    return (
        <th className={`bg-light ${element.name}`}>
            <div className="header">
                {displayDifferentHeaderTypes()}
                <div className="icons">
                    {element.filtering && <Filtering currentElementColumn={element} />}
                    {element.sorting && <SortingControls currentElementColumn={element.name} />}
                </div>
            </div>
            <div>{last && <ColumnSelectionPopOver />}</div>
        </th>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<TableDataActions>) => ({
    deleteRows: () => {
        dispatch(actions.deleteRows());
    },
});

export default connect(null, mapDispatchToProps)(TableHeader);
