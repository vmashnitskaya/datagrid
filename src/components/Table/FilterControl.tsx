import React, { FC } from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';

export interface FilterControlProps {
    currentElementColumn: string;
    filteredColumnAndValue: { [key: string]: string };
    handleFilterOpened: (columnName: string) => void;
}

const FilterControl: FC<FilterControlProps> = ({
    currentElementColumn,
    filteredColumnAndValue,
    handleFilterOpened,
}) => {
    return (
        <FilterListIcon
            className={clsx(
                'filtering',
                filteredColumnAndValue[currentElementColumn] &&
                    filteredColumnAndValue[currentElementColumn].length > 0 &&
                    'text-info'
            )}
            onClick={() => handleFilterOpened(currentElementColumn)}
        />
    );
};

export default FilterControl;
