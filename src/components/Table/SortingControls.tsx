import React, { FC } from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import clsx from 'clsx';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface SortingControlsProps {
    sortingColumn: string;
    currentElementColumn: string;
    handleReverseSorting: (columnName: string) => void;
    handleSorting: (columnName: string) => void;
    sorting: string;
}

const SortingControls: FC<SortingControlsProps> = ({
    sortingColumn,
    currentElementColumn,
    handleReverseSorting,
    handleSorting,
    sorting,
}) => {
    return (
        <>
            <div className="sorting">
                <ArrowDropUpIcon
                    className={clsx(
                        'up',
                        'text-secondary',
                        sorting === 'up' && sortingColumn === currentElementColumn && 'text-info'
                    )}
                    onClick={() => handleReverseSorting(currentElementColumn)}
                />
                <ArrowDropDownIcon
                    className={clsx(
                        'down',
                        'text-secondary',
                        sorting === 'down' && sortingColumn === currentElementColumn && 'text-info'
                    )}
                    onClick={() => handleSorting(currentElementColumn)}
                />
            </div>
        </>
    );
};

export default SortingControls;
