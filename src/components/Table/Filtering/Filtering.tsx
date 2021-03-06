import React, { FormEvent, FC, useState } from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import FilterControl from './FilterControl';
import FilterPopUp from './FilterPopOver';

import actions from '../../../redux/tableData/tableDataActions';
import selectors from '../../../redux/tableData/tableDataSelectors';
import { RootState } from '../../../redux/rootReducer';
import { TableDataActions } from '../../../redux/tableData/tableDataTypes';
import { ColumnInterface } from '../../../redux/tableData/ColumnInterface';
import PopOverWrapper from '../PopOverWrapper';
import { NormalizedObject } from '../../../redux/tableData/tableDataInterface';

interface FilteringProps {
    currentElementColumn: ColumnInterface;
    filteredColumnAndValue: { [key: string]: string };
    filterRenderData: () => void;
    renderData: NormalizedObject;
}

/**
 * Component for displaying table filter control and pop-up.
 *
 * @param  props
 * @param {StringColumn | SelectColumn | NumberColumn} props.currentElementColumn - the object with column info.
 * @param {Object.<string, string>} props.filteredColumnAndValue - the object with key as column name and value - filter query for the column.
 * @param {function(): void} filterRenderData
 * @returns {JSX.Element}
 */

const Filtering: FC<FilteringProps> = ({
    currentElementColumn,
    filteredColumnAndValue,
    filterRenderData,
    renderData,
}) => {
    const [filteredColumnOpened, setFilteredColumnOpened] = useState<string>('');

    const closePopUp = (): void => {
        setFilteredColumnOpened('');
    };

    const handleFilterOpened = (columnName: string) => {
        if (Object.keys(renderData).length > 0) {
            if (filteredColumnOpened.length > 0) {
                closePopUp();
            } else {
                setFilteredColumnOpened(columnName);
            }
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

    const content = (
        <FilterPopUp
            filteredColumnOpened={filteredColumnOpened}
            filteredColumnAndValue={filteredColumnAndValue}
            currentElementColumn={currentElementColumn}
            onFilterExecuted={onFilterExecuted}
            closePopUp={closePopUp}
        />
    );
    const control = (
        <FilterControl
            currentElementColumnName={currentElementColumn.name}
            filteredColumnAndValue={filteredColumnAndValue}
            handleFilterOpened={handleFilterOpened}
            disabled={Object.keys(renderData).length === 0}
        />
    );
    const isOpened =
        Boolean(filteredColumnOpened) && filteredColumnOpened === currentElementColumn.name;
    return (
        <>
            <PopOverWrapper
                content={content}
                control={control}
                isOpened={isOpened}
                label="Filter"
            />
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    filteredColumnAndValue: selectors.getFilteredColumnAndValue(state),
    renderData: selectors.getRenderData(state),
});

const mapDispatchToProps = (dispatch: Dispatch<TableDataActions>) => ({
    filterRenderData: () => {
        dispatch(actions.filterRenderData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filtering);
