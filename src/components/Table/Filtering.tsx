import React, { ChangeEvent, FormEvent, FunctionComponent, useRef } from 'react';
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
    closePopUp: () => void;
}

const Filtering: FunctionComponent<FilteringProps> = ({
    currentElementColumn,
    filteredColumnAndValue,
    handleFilterOpened,
    filteredColumnOpened,
    handleFilter,
    handleInputProvided,
    currentElementType,
    closePopUp,
}) => {
    const iconRef = useRef<SVGSVGElement>(null);

    const handlePopUpClosed = () => {
        if (iconRef && iconRef.current) {
            iconRef.current.focus();
        }
        closePopUp();
    };

    return (
        <>
            <FilterControl
                currentElementColumn={currentElementColumn}
                filteredColumnAndValue={filteredColumnAndValue}
                handleFilterOpened={handleFilterOpened}
                ref={iconRef}
            />
            <FilterPopUp
                filteredColumnOpened={filteredColumnOpened}
                filteredColumnAndValue={filteredColumnAndValue}
                currentElementColumn={currentElementColumn}
                handleFilter={handleFilter}
                handleInputProvided={handleInputProvided}
                currentElementType={currentElementType}
                closePopUp={handlePopUpClosed}
            />
        </>
    );
};

export default Filtering;
