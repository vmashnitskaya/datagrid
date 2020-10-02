import React, { ChangeEvent, FC, FormEvent, useRef, useEffect } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import StringFilterContent from './StringFilterContent';
import SelectFilterContent from './SelectFilterContent';
import { RootState } from '../../redux/rootReducer';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import actions from '../../redux/tableData/tableDataActions';

interface FilterPopUpProps {
    filteredColumnOpened: string;
    filteredColumnAndValue: { [key: string]: string };
    currentElementColumn: string;
    onFilterExecuted: (event: FormEvent<HTMLFormElement>) => void;
    setFilteredColumnAndValue: (newEntry: { [key: string]: string }) => void;
    currentElementType: string;
}

const FilterPopUp: FC<FilterPopUpProps> = ({
    filteredColumnOpened,
    filteredColumnAndValue,
    currentElementColumn,
    onFilterExecuted,
    setFilteredColumnAndValue,
    currentElementType,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (
            filteredColumnOpened === currentElementColumn &&
            filteredColumnOpened.length > 0 &&
            inputRef &&
            inputRef.current
        ) {
            inputRef.current.focus();
        }
    }, [currentElementColumn, currentElementType, filteredColumnOpened]);

    const handleInputProvided = (
        event: React.ChangeEvent<HTMLInputElement>,
        columnName: string
    ) => {
        const query = event.target.value;
        setFilteredColumnAndValue({ [columnName]: query });
    };

    return (
        <form autoComplete="off" onSubmit={onFilterExecuted}>
            {currentElementType === 'string' && (
                <StringFilterContent
                    handleInputProvided={handleInputProvided}
                    currentColumnName={currentElementColumn}
                    filteredColumnAndValue={filteredColumnAndValue}
                    ref={inputRef}
                />
            )}
            {currentElementType === 'select' && (
                <SelectFilterContent
                    handleInputProvided={handleInputProvided}
                    currentColumnName={currentElementColumn}
                    filteredColumnAndValue={filteredColumnAndValue}
                    ref={inputRef}
                />
            )}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPopUp);
