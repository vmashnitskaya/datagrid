import React, { FC } from 'react';
import { Dispatch } from 'redux';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import clsx from 'clsx';
import Filtering from './Filtering/Filtering';
import SortingControls from './Sorting/SortingControls';
import './TableHeader.scss';

import { ColumnInterface } from '../../redux/tableData/ColumnInterface';
import ColumnSelectionPopOver from './ColumnSelectionPopOver';
import { TableDataActions } from '../../redux/tableData/tableDataTypes';
import actions from '../../redux/tableData/tableDataActions';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import { RootState } from '../../redux/rootReducer';

interface TableHeaderProps {
    element: ColumnInterface;
    last: boolean;
    deleteRows: () => void;
    sortFilterSlicedDataIds: string[];
    checkedItems: string[];
}

/**
 * Component for displaying table header.
 *
 * @param props
 * @param props.element - current column header.
 * @returns {JSX.Element}
 */

const TableHeader: FC<TableHeaderProps> = ({
    element,
    last,
    deleteRows,
    sortFilterSlicedDataIds,
    checkedItems,
}) => {
    const handleRowsDeleting = () => {
        if (checkedItems && checkedItems.length > 0) {
            deleteRows();
        }
    };

    const displayDifferentHeaderTypes = () => {
        if (element.name === 'checkbox') {
            return (
                <DeleteIcon
                    className={clsx(
                        'delete-icon text-secondary',
                        sortFilterSlicedDataIds &&
                            sortFilterSlicedDataIds.length === 0 &&
                            'disabled'
                    )}
                    onClick={handleRowsDeleting}
                />
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

const mapStateToProps = (state: RootState) => ({
    sortFilterSlicedDataIds: tableDataSelectors.getSortFilterSlicedDataIds(state),
    checkedItems: tableDataSelectors.getCheckedItems(state),
});

const mapDispatchToProps = (dispatch: Dispatch<TableDataActions>) => ({
    deleteRows: () => {
        dispatch(actions.deleteRows());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);
