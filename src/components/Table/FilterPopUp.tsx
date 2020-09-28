import React, { ChangeEvent, FC, FormEvent } from 'react';
import clsx from 'clsx';
import StringFilterContent from './StringFilterContent';
import SelectFilterContent from './SelectFilterContent';
import './FilterPopUp.scss';

interface FilterPopUpProps {
    filteredColumnOpened: string;
    filteredColumnAndValue: { [key: string]: string };
    currentColumnName: string;
    handleFilter: (event: FormEvent<HTMLFormElement>) => void;
    handleInputProvided: (event: ChangeEvent<HTMLInputElement>, columnName: string) => void;
    currentElementType: string;
    closePopUp: () => void;
}

const FilterPopUp: FC<FilterPopUpProps> = ({
    filteredColumnOpened,
    filteredColumnAndValue,
    currentColumnName,
    handleFilter,
    handleInputProvided,
    currentElementType,
    closePopUp,
}) => {
    return (
        <div
            role="button"
            onBlur={closePopUp}
            tabIndex={-1}
            className={clsx(
                'filterPopUp',
                'bg-light',
                filteredColumnOpened !== currentColumnName && 'hidden'
            )}
        >
            <form autoComplete="off" onSubmit={handleFilter}>
                {currentElementType === 'string' && (
                    <StringFilterContent
                        handleInputProvided={handleInputProvided}
                        currentColumnName={currentColumnName}
                        filteredColumnAndValue={filteredColumnAndValue}
                    />
                )}
                {currentElementType === 'select' && (
                    <SelectFilterContent
                        handleInputProvided={handleInputProvided}
                        currentColumnName={currentColumnName}
                        filteredColumnAndValue={filteredColumnAndValue}
                    />
                )}
            </form>
        </div>
    );
};

export default FilterPopUp;
