import React, { FormEvent, FC, useState } from 'react';
import { connect } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { Dispatch } from 'redux';
import FilterControl from './FilterControl';
import FilterPopUp from './FilterPopUp';

import actions from '../../redux/tableData/tableDataActions';
import selectors from '../../redux/tableData/tableDataSelectors';
import { RootState } from '../../redux/rootReducer';
import { TableDataActions } from '../../redux/tableData/tableDataTypes';
import { ColumnInterface } from '../ColumnInterface';

interface FilteringProps {
    currentElementColumn: ColumnInterface;
    filteredColumnAndValue: { [key: string]: string };
    filterRenderData: () => void;
}

/**
 * Component for displaying table filter control and pop-up.
 *
 * @component
 * @param  props
 * @param {StringColumn | SelectColumn | NumberColumn} props.currentElementColumn - the object with column info.
 * @param {{[p: string]: string}} props.filteredColumnAndValue - the object with key as column name and value - filter query for the column.
 * @param {() => void} filterRenderData
 * @returns {JSX.Element}
 * @constructor
 */

const Filtering: FC<FilteringProps> = ({
    currentElementColumn,
    filteredColumnAndValue,
    filterRenderData,
}) => {
    const [filteredColumnOpened, setFilteredColumnOpened] = useState<string>('');

    const closePopUp = (): void => {
        setFilteredColumnOpened('');
    };

    const handleFilterOpened = (columnName: string) => {
        if (filteredColumnOpened.length > 0) {
            closePopUp();
        } else {
            setFilteredColumnOpened(columnName);
        }
    };

    const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
        filterRenderData();
        event.preventDefault();
    };

    const onFilterExecuted = (event: FormEvent<HTMLFormElement>) => {
        closePopUp();
        handleFilter(event);
    };

    const popover = (
        <Popover id="popover-basic" className="bg-light">
            <Popover.Title as="h3">Filter</Popover.Title>
            <Popover.Content>
                <FilterPopUp
                    filteredColumnOpened={filteredColumnOpened}
                    filteredColumnAndValue={filteredColumnAndValue}
                    currentElementColumn={currentElementColumn}
                    onFilterExecuted={onFilterExecuted}
                    currentElementType={currentElementColumn.type}
                />
            </Popover.Content>
        </Popover>
    );
    return (
        <>
            <OverlayTrigger
                show={
                    Boolean(filteredColumnOpened) &&
                    filteredColumnOpened === currentElementColumn.name
                }
                trigger="click"
                placement="bottom"
                overlay={popover}
            >
                <FilterControl
                    currentElementColumnName={currentElementColumn.name}
                    filteredColumnAndValue={filteredColumnAndValue}
                    handleFilterOpened={handleFilterOpened}
                />
            </OverlayTrigger>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    filteredColumnAndValue: selectors.getFilteredColumnAndValue(state),
});

const mapDispatchToProps = (dispatch: Dispatch<TableDataActions>) => ({
    filterRenderData: () => {
        dispatch(actions.filterRenderData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filtering);
