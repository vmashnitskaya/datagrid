import React, { ChangeEvent, FormEvent, FC, useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import FilterControl from './FilterControl';
import FilterPopUp from './FilterPopUp';
import { RootState } from '../../redux/rootReducer';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import actions from '../../redux/tableData/tableDataActions';

interface FilteringProps {
    currentElementColumn: string;
    filteredColumnAndValue: { [key: string]: string };
    currentElementType: string;
    filterRenderData: () => void;
}

const Filtering: FC<FilteringProps> = ({
    currentElementColumn,
    filteredColumnAndValue,
    currentElementType,
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

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    filterRenderData: () => {
        dispatch(actions.filterRenderData());
    },
});

export default connect(null, mapDispatchToProps)(Filtering);
