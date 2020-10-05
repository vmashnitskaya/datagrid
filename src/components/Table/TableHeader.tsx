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
 * @param  props
 * @param  props.element - current column header.
 */

const TableHeader: FC<TableHeaderProps> = ({ element }) => {
    return (
        <th className="bg-light">
            <div className="header">
                <div>{element.header.replace(/ /g, '\u00a0')}</div>
                <div className="icons">
                    {element.filtering && (
                        <Filtering
                            currentElementColumn={element.name}
                            currentElementType={element.type}
                        />
                    )}
                    {element.sorting && <SortingControls currentElementColumn={element.name} />}
                </div>
            </div>
        </th>
    );
};

export default TableHeader;
