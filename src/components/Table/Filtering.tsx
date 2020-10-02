import React, { ChangeEvent, FormEvent, FC, useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import FilterControl from './FilterControl';
import FilterPopUp from './FilterPopUp';

interface FilteringProps {
    currentElementColumn: string;
    filteredColumnAndValue: { [key: string]: string };
    handleFilter: (event: FormEvent<HTMLFormElement>) => void;
    handleInputProvided: (event: ChangeEvent<HTMLInputElement>, columnName: string) => void;
    currentElementType: string;
}

const Filtering: FC<FilteringProps> = ({
    currentElementColumn,
    filteredColumnAndValue,
    handleFilter,
    handleInputProvided,
    currentElementType,
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
