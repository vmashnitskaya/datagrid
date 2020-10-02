import React, { ChangeEvent, FormEvent, FC } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
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
    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Filter</Popover.Title>
            <Popover.Content>
                <FilterPopUp
                    filteredColumnOpened={filteredColumnOpened}
                    filteredColumnAndValue={filteredColumnAndValue}
                    currentElementColumn={currentElementColumn}
                    handleFilter={handleFilter}
                    handleInputProvided={handleInputProvided}
                    currentElementType={currentElementType}
                />
            </Popover.Content>
        </Popover>
    );
    return (
        <>
            <OverlayTrigger
                show={
                    Boolean(filteredColumnOpened) && filteredColumnOpened === currentElementColumn
                }
                trigger="click"
                placement="bottom"
                overlay={popover}
            >
                <FilterControl
                    currentElementColumn={currentElementColumn}
                    filteredColumnAndValue={filteredColumnAndValue}
                    handleFilterOpened={handleFilterOpened}
                />
            </OverlayTrigger>
        </>
    );
};

export default Filtering;
