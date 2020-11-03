import React, { FunctionComponent, useMemo } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Dispatch } from 'redux';

import Dropdown from 'react-bootstrap/Dropdown';

import { RootState } from '../../../redux/rootReducer';
import tableDataSelectors from '../../../redux/tableData/tableDataSelectors';
import pagingSelectors from '../../../redux/tableData/paging/pagingSelectors';
import pagingActions from '../../../redux/tableData/paging/pagingActions';
import { NormalizedObject } from '../../../redux/tableData/tableDataInterface';
import { PagingActions } from '../../../redux/tableData/paging/pagingTypes';

interface RowsPerPageControlProps {
    setRowsPerPage: (rowsPerPage: number) => void;
    rowsPerPage: number;
    renderData: NormalizedObject;
}

/**
 * Component for rows per page selection.
 *
 * @param props
 * @param {function(number): void} props.setRowsPerPage
 * @param {number} props.rowsPerPage - the rows per page selected.
 * @returns {JSX.Element}
 */

const RowsPerPageControl: FunctionComponent<RowsPerPageControlProps> = ({
    setRowsPerPage,
    rowsPerPage,
    renderData,
}) => {
    const dropdownKeys = useMemo((): string[] => {
        return ['5', '10', '20', '50', '100'];
    }, []);

    const handleDropDownSelect = (eventKey: string | null) => {
        setRowsPerPage(Number(eventKey));
    };

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="info"
                id="dropdown-basic"
                size="sm"
                disabled={Object.keys(renderData).length === 0}
            >
                {rowsPerPage}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {dropdownKeys.map((element) => (
                    <Dropdown.Item
                        key={element}
                        eventKey={element}
                        active={element === String(rowsPerPage)}
                        onSelect={handleDropDownSelect}
                    >
                        {element}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

const mapStateToProps = (state: RootState) => ({
    rowsPerPage: pagingSelectors.getRowsPerPage(state),
    renderData: tableDataSelectors.getRenderData(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (
    dispatch: Dispatch<PagingActions>
) => ({
    setRowsPerPage: (rowsPerPage: number) => {
        dispatch(pagingActions.setRowsPerPage(rowsPerPage));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RowsPerPageControl);
