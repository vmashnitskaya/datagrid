import React, { FC, KeyboardEvent } from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import clsx from 'clsx';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './SortingControls.scss';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import actions from '../../redux/tableData/tableDataActions';

export interface SortingControlsProps {
    sortingColumn: string;
    currentElementColumn: string;
    sorting: string;
    setSorting: (sorting: string) => void;
    setSortingColumn: (column: string) => void;
}

const SortingControls: FC<SortingControlsProps> = ({
    sortingColumn,
    currentElementColumn,
    sorting,
    setSorting,
    setSortingColumn,
}) => {
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

const mapStateToProps = (state: RootState) => ({
    sorting: tableDataSelectors.getSorting(state),
    sortingColumn: tableDataSelectors.getSortingColumn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    setSorting: (direction: string) => {
        dispatch(actions.setSorting(direction));
    },
    setSortingColumn: (column: string) => {
        dispatch(actions.setSortingColumn(column));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SortingControls);
