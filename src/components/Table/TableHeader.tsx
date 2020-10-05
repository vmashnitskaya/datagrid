import React, { FC } from 'react';

import Filtering from './Filtering';
import SortingControls from './SortingControls';

import { ColumnInterface } from '../ColumnInterface';

interface TableHeaderProps {
    element: ColumnInterface;
}

/**
 * Component for displaying table header.
 *
 * @component
 * @param props
 * @param {StringColumn | SelectColumn | NumberColumn} props.element - current column header.
 * @returns {JSX.Element}
 * @constructor
 */

const TableHeader: FC<TableHeaderProps> = ({ element }) => {
    return (
        <th className="bg-light">
            <div className="header">
                <div>{element.header.replace(/ /g, '\u00a0')}</div>
                <div className="icons">
                    {element.filtering && <Filtering currentElementColumn={element} />}
                    {element.sorting && <SortingControls currentElementColumn={element.name} />}
                </div>
            </div>
        </th>
    );
};

export default TableHeader;
