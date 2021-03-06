import React, { FC, FormEvent, useRef, useEffect } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';

import StringFilterContent from './StringFilterContent';
import SelectFilterContent from './SelectFilterContent';
import './FilterPopOver.scss';

import { RootState } from '../../../redux/rootReducer';
import tableDataSelectors from '../../../redux/tableData/tableDataSelectors';
import actions from '../../../redux/tableData/tableDataActions';
import { ColumnInterface } from '../../../redux/tableData/ColumnInterface';

interface FilterPopUpProps {
    filteredColumnOpened: string;
    filteredColumnAndValue: { [key: string]: string };
    currentElementColumn: ColumnInterface;
    onFilterExecuted: (event: FormEvent<HTMLFormElement>) => void;
    setFilteredColumnAndValue: (newEntry: { [key: string]: string }) => void;
    resetFilters: () => void;
    filterRenderData: () => void;
    closePopUp: () => void;
}

/**
 * Component for displaying filter pop-up.
 *
 * @param props
 * @param {string} props.filteredColumnOpened - name of column filter opened.
 * @param {Object.<string, string>} props.filteredColumnAndValue  - the object with key as column name and value - filter query for the column.
 * @param {ColumnInterface} props.currentElementColumn - the current column name.
 * @param {function(React.FormEvent<HTMLFormElement>): void} props.onFilterExecuted
 * @param {function(Object.<string, string>): void} props.setFilteredColumnAndValue
 * @param {function(): void} props.resetFilters
 * @param {function(): void} props.closePopUp
 * @returns {JSX.Element}
 */

const FilterPopOver: FC<FilterPopUpProps> = ({
    filteredColumnOpened,
    filteredColumnAndValue,
    currentElementColumn,
    onFilterExecuted,
    setFilteredColumnAndValue,
    resetFilters,
    filterRenderData,
    closePopUp,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Component for displaying filter pop-up.
     *
     * Focus on input field if filter pop up opened.
     */

    useEffect(() => {
        if (
            filteredColumnOpened === currentElementColumn.name &&
            filteredColumnOpened.length > 0 &&
            inputRef &&
            inputRef.current
        ) {
            inputRef.current.focus();
        }
    }, [currentElementColumn.name, currentElementColumn.type, filteredColumnOpened]);

    const handleInputProvided = (
        event: React.ChangeEvent<HTMLInputElement>,
        columnName: string
    ) => {
        const query = event.target.value;
        setFilteredColumnAndValue({ [columnName]: query });
    };

    const handleResetFilters = () => {
        resetFilters();
        filterRenderData();
        closePopUp();
    };

    return (
        <form autoComplete="off" onSubmit={onFilterExecuted}>
            {currentElementColumn.type === 'string' && (
                <StringFilterContent
                    handleInputProvided={handleInputProvided}
                    currentColumnName={currentElementColumn.name}
                    filteredColumnAndValue={filteredColumnAndValue}
                    ref={inputRef}
                />
            )}
            {currentElementColumn.type === 'select' && (
                <SelectFilterContent
                    currentSelectionOptions={currentElementColumn.options}
                    handleInputProvided={handleInputProvided}
                    currentColumnName={currentElementColumn.name}
                    filteredColumnAndValue={filteredColumnAndValue}
                    ref={inputRef}
                />
            )}
            <div className="wrapper-button">
                <button type="button" onClick={handleResetFilters}>
                    <small className="reset form-text">Reset Filters</small>
                </button>
            </div>
        </form>
    );
};

const mapStateToProps = (state: RootState) => ({
    filteredColumnAndValue: tableDataSelectors.getFilteredColumnAndValue(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    setFilteredColumnAndValue: (newEntry: { [key: string]: string }) => {
        dispatch(actions.setFilteredColumnAndValue(newEntry));
    },
    resetFilters: () => {
        dispatch(actions.resetFilters());
    },
    filterRenderData: () => {
        dispatch(actions.filterRenderData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPopOver);
