import React, { ChangeEvent, FC, FormEvent, useRef, useEffect } from 'react';
import clsx from 'clsx';
import StringFilterContent from './StringFilterContent';
import SelectFilterContent from './SelectFilterContent';
import './FilterPopUp.scss';

interface FilterPopUpProps {
    filteredColumnOpened: string;
    filteredColumnAndValue: { [key: string]: string };
    currentElementColumn: string;
    handleFilter: (event: FormEvent<HTMLFormElement>) => void;
    handleInputProvided: (event: ChangeEvent<HTMLInputElement>, columnName: string) => void;
    currentElementType: string;
}

const FilterPopUp: FC<FilterPopUpProps> = ({
    filteredColumnOpened,
    filteredColumnAndValue,
    currentElementColumn,
    handleFilter,
    handleInputProvided,
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

    return (
        <div
            role="button"
            tabIndex={0}
            className={clsx(
                'filterPopUp',
                'bg-light',
                filteredColumnOpened !== currentElementColumn && 'hidden'
            )}
        >
            <form autoComplete="off" onSubmit={handleFilter}>
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
        </div>
    );
};

export default FilterPopUp;
