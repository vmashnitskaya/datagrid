import React, { KeyboardEvent } from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';

export interface FilterControlProps {
    currentElementColumn: string;
    filteredColumnAndValue: { [key: string]: string };
    handleFilterOpened: (columnName: string) => void;
}

export type RefIcon = SVGSVGElement;

const FilterControl = React.forwardRef<SVGSVGElement, FilterControlProps>(
    ({ currentElementColumn, filteredColumnAndValue, handleFilterOpened }, ref) => {
        const handleKeyboardFilterOpened = (event: KeyboardEvent<SVGSVGElement>) => {
            if (event.key === 'Enter') {
                handleFilterOpened(currentElementColumn);
            }
        };

        return (
            <FilterListIcon
                className={clsx(
                    'filtering',
                    filteredColumnAndValue[currentElementColumn] &&
                        filteredColumnAndValue[currentElementColumn].length > 0 &&
                        'text-info'
                )}
                tabIndex={0}
                onClick={() => handleFilterOpened(currentElementColumn)}
                onKeyPress={handleKeyboardFilterOpened}
                ref={ref}
            />
        );
    }
);

export default FilterControl;
