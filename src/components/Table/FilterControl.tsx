import React, { KeyboardEvent, FC } from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';

export interface FilterControlProps {
    currentElementColumnName: string;
    filteredColumnAndValue: { [key: string]: string };
    handleFilterOpened: (columnName: string) => void;
}

/**
 * Component for displaying filter control.
 *
 * @component
 * @param props
 * @param {string} props.currentElementColumnName - the name of current column.
 * @param {{[p: string]: string}} props.filteredColumnAndValue - the object with key as column name and value - filter query for the column.
 * @param {(columnName: string) => void} props.handleFilterOpened
 * @returns {JSX.Element}
 * @constructor
 */

const FilterControl: FC<FilterControlProps> = ({
    currentElementColumnName,
    filteredColumnAndValue,
    handleFilterOpened,
}) => {
    const handleKeyboardFilterOpened = (event: KeyboardEvent<SVGSVGElement>) => {
        if (event.key === 'Enter') {
            handleFilterOpened(currentElementColumnName);
        }
    };

    return (
        <FilterListIcon
            className={clsx(
                'filtering',
                filteredColumnAndValue[currentElementColumnName] &&
                    filteredColumnAndValue[currentElementColumnName].length > 0 &&
                    'text-info'
            )}
            tabIndex={0}
            onClick={() => handleFilterOpened(currentElementColumnName)}
            onKeyPress={handleKeyboardFilterOpened}
        />
    );
};

export default FilterControl;
