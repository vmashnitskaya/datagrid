import React, { FC, useState } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import { RootState } from '../../redux/rootReducer';
import { NormalizedObject } from '../../redux/tableData/tableDataInterface';
import { ColumnInterface } from '../../redux/tableData/ColumnInterface';
import AlertWrapper from './AlertWrapper';

interface DownloadProps {
    checkedItems: string[];
    renderData: NormalizedObject;
    tableColumnHeaders: ColumnInterface[];
}

const CSVDownload: FC<DownloadProps> = ({ renderData, checkedItems, tableColumnHeaders }) => {
    const [alertShown, setAlertShown] = useState<boolean>(false);

    const handleAlertChange = (value: boolean) => {
        setAlertShown(value);
    };

    const returnStringValues = (obj: { [key: string]: any }) => {
        return Object.keys(obj)
            .map((el) => {
                if (el !== '_id' && el !== '__v' && el !== 'owner') {
                    return obj[el];
                }
                return '';
            })
            .filter((el) => el !== '')
            .join(',');
    };

    const downloadFile = () => {
        if (checkedItems.length > 0) {
            const element = document.createElement('a');

            const columnsToDownload = `${tableColumnHeaders
                .map((el) => {
                    if (el.header !== 'Open') {
                        return el.header;
                    }
                    return '';
                })
                .join(',')}\n`;

            const arrayToDownload = checkedItems.map((checkedItem) => renderData[checkedItem]);
            const stringToDownload = arrayToDownload
                .map((el) => {
                    return ` ,${returnStringValues(el)}`;
                })
                .join('\n');

            const file = new Blob([columnsToDownload + stringToDownload], {
                type: 'application/csv;charset=utf-8',
            });
            element.href = URL.createObjectURL(file);
            element.download = 'tableData.csv';
            document.body.appendChild(element);
            element.click();
        } else {
            setAlertShown(true);
        }
    };

    return (
        <>
            <Button
                variant="info"
                size="sm"
                className="download"
                onClick={downloadFile}
                disabled={Object.keys(renderData).length === 0}
            >
                Download CSV
            </Button>
            <AlertWrapper
                value="Please select rows to download."
                variant="danger"
                alertShown={alertShown}
                handleAlertChange={handleAlertChange}
            />
        </>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        renderData: tableDataSelectors.getRenderData(state),
        checkedItems: tableDataSelectors.getCheckedItems(state),
        tableColumnHeaders: tableDataSelectors.getColumnHeaders(state),
    };
};

export default connect(mapStateToProps)(CSVDownload);
