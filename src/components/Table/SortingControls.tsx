import React, { FC, KeyboardEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import clsx from 'clsx';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './SortingControls.scss';

import { RootState } from '../../redux/rootReducer';
import { TableDataActions } from '../../redux/tableData/tableDataTypes';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import actions from '../../redux/tableData/tableDataActions';

export interface SortingControlsProps {
    sortingColumn: string;
    currentElementColumn: string;
    sorting: string;
    setSorting: (sorting: string) => void;
    setSortingColumn: (column: string) => void;
    sortRenderData: () => void;
}

/**
 * Component for displaying table filter control and pop-up.
 *
 * @param props
 * @param {string} props.sortingColumn - column for which sorting is executed.
 * @param {string} props.currentElementColumn - name of current column.
 * @param {string} props.sorting - direction of sorting.
 * @param {function(string): void} props.setSorting
 * @param {function(string): void} props.setSortingColumn
 * @param {function(): void} props.sortRenderData
 * @returns {JSX.Element}
 */

const SortingControls: FC<SortingControlsProps> = ({
    sortingColumn,
    currentElementColumn,
    sorting,
    setSorting,
    setSortingColumn,
    sortRenderData,
}) => {
    useEffect(() => {
        if (sorting.length > 0) {
            sortRenderData();
        }
    }, [sorting, sortingColumn, sorting.length, sortRenderData]);

    const handleSorting = (columnName: string, direction: string) => {
        setSorting(direction);
        setSortingColumn(columnName);
    };

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
                    data-testid="down"
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
                    data-testid="up"
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

const mapStateToProps = (state: RootState) => ({
    sorting: tableDataSelectors.getSorting(state),
    sortingColumn: tableDataSelectors.getSortingColumn(state),
});

const mapDispatchToProps = (dispatch: Dispatch<TableDataActions>) => ({
    setSorting: (direction: string) => {
        dispatch(actions.setSorting(direction));
    },
    setSortingColumn: (column: string) => {
        dispatch(actions.setSortingColumn(column));
    },
    sortRenderData: () => {
        dispatch(actions.sortRenderData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SortingControls);
