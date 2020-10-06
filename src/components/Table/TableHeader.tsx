import React, { FC } from 'react';

import Filtering from './Filtering';
import SortingControls from './SortingControls';
import './TableHeader.scss';

import { ColumnInterface } from '../ColumnInterface';
import ColumnSelectionPopOver from './ColumnSelectionPopOver';

interface TableHeaderProps {
    element: ColumnInterface;
    last: boolean;
}

/**
 * Component for displaying table header.
 *
 * @param props
 * @param props.element - current column header.
 * @returns {JSX.Element}
 */

const TableHeader: FC<TableHeaderProps> = ({ element, last }) => {
    return (
        <th className="bg-light">
            <div className="header">
                <div>{element.header.replace(/ /g, '\u00a0')}</div>
                <div className="icons">
                    {element.filtering && <Filtering currentElementColumn={element} />}
                    {element.sorting && <SortingControls currentElementColumn={element.name} />}
                </div>
            </div>
            <div>{last && <ColumnSelectionPopOver />}</div>
        </th>
    );
};

export default TableHeader;
