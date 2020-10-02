import React, { ChangeEvent, FunctionComponent, FormEvent } from 'react';
import Filtering from './Filtering';
import SortingControls from './SortingControls';
import { ColumnInterface } from '../ColumnInterface';
import { FilteringColumn } from './FilteringColumnInterface';

interface TableHeaderProps {
    element: ColumnInterface;
    filteredColumnAndValue: FilteringColumn;
    handleSorting: (columnName: string, direction: string) => void;
    sorting: string;
    sortingColumn: string;
}

const TableHeader: FunctionComponent<TableHeaderProps> = ({
    element,
    filteredColumnAndValue,
    handleSorting,
    sorting,
    sortingColumn,
}) => {
    return (
        <th className="bg-light">
            <div className="header">
                <div>{element.header.replace(/ /g, '\u00a0')}</div>
                <div className="icons">
                    {element.filtering && (
                        <Filtering
                            currentElementColumn={element.name}
                            filteredColumnAndValue={filteredColumnAndValue}
                            currentElementType={element.type}
                        />
                    )}
                    {element.sorting && (
                        <SortingControls
                            sortingColumn={sortingColumn}
                            currentElementColumn={element.name}
                            handleSorting={handleSorting}
                            sorting={sorting}
                        />
                    )}
                </div>
            </div>
        </th>
    );
};

export default TableHeader;