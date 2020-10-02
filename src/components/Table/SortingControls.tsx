import React, { FC, KeyboardEvent } from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import clsx from 'clsx';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './SortingControls.scss';

export interface SortingControlsProps {
    sortingColumn: string;
    currentElementColumn: string;
    handleSorting: (columnName: string, direction: string) => void;
    sorting: string;
}

const SortingControls: FC<SortingControlsProps> = ({
    sortingColumn,
    currentElementColumn,
    handleSorting,
    sorting,
}) => {
    const handleSortingPressed = (event: KeyboardEvent<SVGSVGElement>, direction: string) => {
        if (event.key === 'Enter') {
            handleSorting(currentElementColumn, direction);
        }
    };

    return (
        <>
            <div className="sorting">
                <ArrowDropUpIcon
                    className={clsx(
                        'down',
                        'text-secondary',
                        sorting === 'down' && sortingColumn === currentElementColumn && 'text-info'
                    )}
                    onClick={() => handleSorting(currentElementColumn, 'down')}
                    tabIndex={0}
                    onKeyPress={(event: KeyboardEvent<SVGSVGElement>) =>
                        handleSortingPressed(event, 'down')
                    }
                />
                <ArrowDropDownIcon
                    className={clsx(
                        'up',
                        'text-secondary',
                        sorting === 'up' && sortingColumn === currentElementColumn && 'text-info'
                    )}
                    onClick={() => handleSorting(currentElementColumn, 'up')}
                    tabIndex={0}
                    onKeyPress={(event: KeyboardEvent<SVGSVGElement>) =>
                        handleSortingPressed(event, 'up')
                    }
                />
            </div>
        </>
    );
};

export default SortingControls;
