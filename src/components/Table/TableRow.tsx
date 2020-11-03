import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import TableCell from './TableCell';

import { ColumnInterface } from '../../redux/tableData/ColumnInterface';
import { RenderDataObject } from '../../redux/tableData/tableDataInterface';

import { RootState } from '../../redux/rootReducer';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';

export interface TableRowProps {
    id: string;
    tableColumnHeaders: ColumnInterface[];
    rowElement: RenderDataObject;
    index: number;
}

/**
 * Component for displaying table row.
 *
 * @param props
 * @param {string} props.id - the id by which in render data particular object will be extracted.
 * @param {ColumnInterface[]} props.tableColumnHeaders - the object with column headers info.
 * @param {RenderDataObject} props.rowElement - the object extracted from render data by id.
 * @returns {JSX.Element}
 */

const TableRow: FC<TableRowProps> = ({ id, tableColumnHeaders, rowElement, index }) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <tr
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {rowElement &&
                        tableColumnHeaders &&
                        tableColumnHeaders.length > 0 &&
                        tableColumnHeaders.map((element: ColumnInterface) => {
                            return (
                                element.display && (
                                    <TableCell
                                        key={`${id}_${element.name}`}
                                        rowElement={rowElement}
                                        columnName={element.name}
                                    />
                                )
                            );
                        })}
                </tr>
            )}
        </Draggable>
    );
};

const mapStateToProps = (state: RootState, { id }: { id: string }) => ({
    rowElement: tableDataSelectors.getElementById(state, id),
});

export default connect(mapStateToProps)(TableRow);
