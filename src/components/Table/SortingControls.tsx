import React, { FC, KeyboardEvent } from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import clsx from 'clsx';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './SortingControls.scss';

export interface SortingControlsProps {
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
    const handleReverseSortingPressed = (event: KeyboardEvent<SVGSVGElement>) => {
        if (event.key === 'Enter') {
            handleReverseSorting(currentElementColumn);
        }
    };

    const handleSortingPressed = (event: KeyboardEvent<SVGSVGElement>) => {
        if (event.key === 'Enter') {
            handleSorting(currentElementColumn);
        }
    };

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
                    tabIndex={0}
                    onKeyPress={handleReverseSortingPressed}
                />
                <ArrowDropDownIcon
                    className={clsx(
                        'down',
                        'text-secondary',
                        sorting === 'down' && sortingColumn === currentElementColumn && 'text-info'
                    )}
                    onClick={() => handleSorting(currentElementColumn)}
                    tabIndex={0}
                    onKeyPress={handleSortingPressed}
                />
            </div>
        </>
    );
};

export default SortingControls;
