import React, { FC } from 'react';
import { connect } from 'react-redux';

import TableCell from './TableCell';

import { ColumnInterface } from '../ColumnInterface';
import { RenderDataObject } from '../../redux/tableData/tableDataInterface';

import { RootState } from '../../redux/rootReducer';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';

export interface TableRowProps {
    id: number;
    columnHeaders: ColumnInterface[];
    rowElement: RenderDataObject;
}

/**
 * Component for displaying table row.
 *
 * @param props
 * @param {number} props.id - the id by which in render data particular object will be extracted.
 * @param {ColumnInterface[]} props.columnHeaders - the object with column headers info.
 * @param {RenderDataObject} props.rowElement - the object extracted from render data by id.
 * @returns {JSX.Element}
 */

const TableRow: FC<TableRowProps> = ({ id, columnHeaders, rowElement }) => {
    return (
        <tr>
            {columnHeaders.map((element: ColumnInterface) => {
                return (
                    element.display && (
                        <TableCell
                            key={`key${id + 1}_${Math.random()}`}
                            rowElement={rowElement}
                            columnName={element.name}
                        />
                    )
                );
            })}
        </tr>
    );
};

const mapStateToProps = (state: RootState, { id }: { id: number }) => ({
    rowElement: tableDataSelectors.getElementById(state, id),
});

export default connect(mapStateToProps)(TableRow);
