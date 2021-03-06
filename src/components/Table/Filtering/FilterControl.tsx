import React, { KeyboardEvent, FC } from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import './FilterControl.scss';

export interface FilterControlProps {
    currentElementColumnName: string;
    filteredColumnAndValue: { [key: string]: string };
    handleFilterOpened: (columnName: string) => void;
    disabled: boolean;
}

/**
 * Component for displaying filter control.
 *
 * @param props
 * @param {string} props.currentElementColumnName - the name of current column.
 * @param {Object.<string, string>} props.filteredColumnAndValue - the object with key as column name and value - filter query for the column.
 * @param {function(string): void} props.handleFilterOpened
 * @returns {JSX.Element}
 */

const FilterControl: FC<FilterControlProps> = ({
    currentElementColumnName,
    filteredColumnAndValue,
    handleFilterOpened,
    disabled,
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
                'text-secondary',
                filteredColumnAndValue[currentElementColumnName] &&
                    filteredColumnAndValue[currentElementColumnName].length > 0 &&
                    'text-info',
                disabled && 'disabled'
            )}
            tabIndex={0}
            onClick={() => handleFilterOpened(currentElementColumnName)}
            onKeyPress={handleKeyboardFilterOpened}
            data-testid="filter-control"
        />
    );
};

export default FilterControl;
