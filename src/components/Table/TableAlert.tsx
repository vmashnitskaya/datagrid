import React, { FunctionComponent } from 'react';
import { Alert } from 'react-bootstrap';
import './TableAlert.scss';

interface TableAlertProps {
    value: string;
    handleAlertClose: () => void;
}

const TableAlert: FunctionComponent<TableAlertProps> = ({ value, handleAlertClose }) => {
    return (
        <div className="alert-wrapper">
            <Alert
                className="alert table-alert"
                variant="danger"
                onClose={handleAlertClose}
                dismissible
            >
                {value}
            </Alert>
        </div>
    );
};

export default TableAlert;
