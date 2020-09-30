import React, { ChangeEvent, FormEvent, FC } from 'react';
import FilterControl from './FilterControl';
import FilterPopUp from './FilterPopUp';

interface FilteringProps {
    currentElementColumn: string;
    filteredColumnAndValue: { [key: string]: string };
    handleFilterOpened: (columnName: string) => void;
    filteredColumnOpened: string;
    handleFilter: (event: FormEvent<HTMLFormElement>) => void;
    handleInputProvided: (event: ChangeEvent<HTMLInputElement>, columnName: string) => void;
    currentElementType: string;
}

const Filtering: FC<FilteringProps> = ({
    currentElementColumn,
    filteredColumnAndValue,
    handleFilterOpened,
    filteredColumnOpened,
    handleFilter,
    handleInputProvided,
    currentElementType,
}) => {
    return (
        <>
            <FilterControl
                currentElementColumn={currentElementColumn}
                filteredColumnAndValue={filteredColumnAndValue}
                handleFilterOpened={handleFilterOpened}
            />
            <FilterPopUp
                filteredColumnOpened={filteredColumnOpened}
                filteredColumnAndValue={filteredColumnAndValue}
                currentElementColumn={currentElementColumn}
                handleFilter={handleFilter}
                handleInputProvided={handleInputProvided}
                currentElementType={currentElementType}
            />
        </>
    );
};

export default Filtering;
