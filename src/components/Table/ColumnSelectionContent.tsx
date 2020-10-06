import React, { FunctionComponent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import clsx from 'clsx';
import { ColumnInterface } from '../ColumnInterface';

import { RootState } from '../../redux/rootReducer';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import { TableDataActions } from '../../redux/tableData/tableDataTypes';
import actions from '../../redux/tableData/tableDataActions';
import HelpText from './HelpText';

interface ColumnSelectionContentProps {
    tableColumnHeaders: ColumnInterface[];
    setTableColumnHeaders: (columnHeaders: ColumnInterface[]) => void;
}

const ColumnSelectionContent: FunctionComponent<ColumnSelectionContentProps> = ({
    tableColumnHeaders,
    setTableColumnHeaders,
}) => {
    const handleCheckboxCheck = (columnName: string) => {
        const array = tableColumnHeaders.map((element) => {
            if (element.name === columnName) {
                return { ...element, display: !element.display };
            }
            return element;
        });
        setTableColumnHeaders(array);
    };
    return (
        <>
            <form>
                {tableColumnHeaders.map(
                    (element, index: number) =>
                        index > 0 && (
                            <div>
                                <input
                                    className={clsx(
                                        'column_checkbox mr-1',
                                        index === tableColumnHeaders.length - 1 && 'disabled'
                                    )}
                                    type="checkbox"
                                    checked={element.display}
                                    value={`${element.name}`}
                                    id={`${element.name}`}
                                    name={`${element.name}`}
                                    disabled={index === tableColumnHeaders.length - 1}
                                    onChange={() => handleCheckboxCheck(element.name)}
                                />
                                <label htmlFor={`${element.name}`}>{element.header}</label>
                            </div>
                        )
                )}
            </form>
            <HelpText value="Select columns to display." />
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    tableColumnHeaders: tableDataSelectors.getColumnHeaders(state),
});

const mapDispatchToProps = (dispatch: Dispatch<TableDataActions>) => ({
    setTableColumnHeaders: (columnHeaders: ColumnInterface[]) => {
        dispatch(actions.setColumnHeaders(columnHeaders));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnSelectionContent);
