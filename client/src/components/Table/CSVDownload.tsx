import React, { FC, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import { RootState } from '../../redux/rootReducer';
import { NormalizedObject } from '../../redux/tableData/tableDataInterface';
import { ColumnInterface } from '../ColumnInterface';
import TableAlert from './TableAlert';

interface DownloadProps {
    checkedItems: number[];
    renderData: NormalizedObject;
    columnHeaders: ColumnInterface[];
}

const portalContainer = document.getElementById('alert-root');

const CSVDownload: FC<DownloadProps> = ({ renderData, checkedItems, columnHeaders }) => {
    const [alertShown, setAlertShown] = useState<boolean>(false);

    const hideAlert = useCallback(() => {
        if (alertShown) {
            setAlertShown(false);
        }
    }, [alertShown]);

    useEffect(() => {
        if (alertShown) {
            setTimeout(hideAlert, 500000);
        }
    }, [alertShown, hideAlert]);

    const returnStringValues = (obj: { [key: string]: any }) => {
        return Object.keys(obj)
            .map((el) => {
                if (el !== '_id') {
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

            const columnsToDownload = `${columnHeaders.map((el) => el.header).join(',')}\n`;

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
            {alertShown &&
                portalContainer &&
                createPortal(
                    <TableAlert
                        value="Please select rows to download."
                        handleAlertClose={hideAlert}
                    />,
                    portalContainer
                )}
        </>
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
