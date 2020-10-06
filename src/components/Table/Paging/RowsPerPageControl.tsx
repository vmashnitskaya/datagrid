import React, { FunctionComponent, useMemo } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';

import { RootState } from '../../../redux/rootReducer';
import tableDataSelectors from '../../../redux/tableData/tableDataSelectors';
import actions from '../../../redux/tableData/tableDataActions';

interface RowsPerPageControlProps {
    setRowsPerPage: (rowsPerPage: number) => void;
    rowsPerPage: number;
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
}) => {
    const dropdownKeys = useMemo((): string[] => {
        return ['5', '10', '20', '50', '100'];
    }, []);

    const handleDropDownSelect = (eventKey: string | null) => {
        setRowsPerPage(Number(eventKey));
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic" size="sm">
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
    rowsPerPage: tableDataSelectors.getRowsPerPage(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    setRowsPerPage: (rowsPerPage: number) => {
        dispatch(actions.setRowsPerPage(rowsPerPage));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RowsPerPageControl);
