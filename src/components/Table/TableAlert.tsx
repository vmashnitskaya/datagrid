import React, { FunctionComponent } from 'react';
import { Alert } from 'react-bootstrap';
import './TableAlert.scss';
import clsx from 'clsx';

interface TableAlertProps {
    value: string;
    handleAlertClose: () => void;
    variant: string;
    classNames?: string;
}

const TableAlert: FunctionComponent<TableAlertProps> = ({
    value,
    handleAlertClose,
    variant,
    classNames,
}) => {
    return (
        <div className={clsx('alert-wrapper', `${classNames}`)}>
            <Alert
                className="alert table-alert"
                variant={variant}
                onClose={handleAlertClose}
                dismissible
            >
                {value}
            </Alert>
        </div>
    );
};

export default TableAlert;
