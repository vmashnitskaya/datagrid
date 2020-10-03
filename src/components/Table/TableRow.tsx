import React, { FC } from 'react';
import { connect } from 'react-redux';

import TableCell from './TableCell';

import { ColumnInterface } from '../ColumnInterface';
import { RenderDataObject } from '../../redux/tableData/tableDataInterface';

import { RootState } from '../../redux/rootReducer';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';

export interface TableRowProps {
    row: number;
    columnHeaders: ColumnInterface[];
    rowElement: RenderDataObject;
}

const TableRow: FC<TableRowProps> = ({ row, columnHeaders, rowElement }) => {
    return (
        <tr>
            {columnHeaders.map((element: ColumnInterface) => {
                return (
                    <TableCell
                        key={`key${row + 1}}`}
                        rowElement={rowElement}
                        columnName={element.name}
                    />
                );
            })}
        </tr>
    );
};

const mapStateToProps = (state: RootState, { row }: { row: number }) => ({
    rowElement: tableDataSelectors.getElementById(state, row),
});

export default connect(mapStateToProps)(TableRow);
