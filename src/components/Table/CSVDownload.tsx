import React, { FC } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import { RootState } from '../../redux/rootReducer';
import { NormalizedObject } from '../../redux/tableData/tableDataInterface';
import { ColumnInterface } from '../ColumnInterface';

interface DownloadProps {
    checkedItems: number[];
    renderData: NormalizedObject;
    columnHeaders: ColumnInterface[];
}

const CSVDownload: FC<DownloadProps> = ({ renderData, checkedItems, columnHeaders }) => {
    const returnStringFromObjectValues = (obj: { [key: string]: any }) => {
        return Object.values(obj)
            .map((el) => {
                if (typeof el === 'object' && el !== null) {
                    return Object.values(el).join('/');
                }
                return el;
            })
            .join(',');
    };

    const downloadTxtFile = () => {
        if (checkedItems.length > 0) {
            const element = document.createElement('a');

            const columnsToDownload = `${columnHeaders.map((el) => el.header).join(',')}\n`;

            const arrayToDownload = checkedItems.map((checkedItem) => renderData[checkedItem]);
            const stringToDownload = arrayToDownload
                .map((el) => {
                    return ` ,${returnStringFromObjectValues(el)}`;
                })
                .join('\n');

            const file = new Blob([columnsToDownload + stringToDownload], {
                type: 'application/csv;charset=utf-8',
            });
            element.href = URL.createObjectURL(file);
            element.download = 'tableData.csv';
            document.body.appendChild(element);
            element.click();
        }
    };

    return (
        <Button variant="info" size="sm" className="download" onClick={downloadTxtFile}>
            Download
        </Button>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        renderData: tableDataSelectors.getRenderData(state),
        checkedItems: tableDataSelectors.getCheckedItems(state),
        columnHeaders: tableDataSelectors.getColumnHeaders(state),
    };
};

export default connect(mapStateToProps)(CSVDownload);
