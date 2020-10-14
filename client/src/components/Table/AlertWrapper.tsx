import React, { FC, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import TableAlert from './TableAlert';

interface AlertWrapperProps {
    value: string;
    variant: string;
    alertShown: boolean;
    handleAlertChange: (value: boolean) => void;
    classNames?: string;
}

const portalContainer = document.getElementById('alert-root');

const AlertWrapper: FC<AlertWrapperProps> = ({
    value,
    classNames,
    variant,
    alertShown,
    handleAlertChange,
}) => {
    const hideAlert = useCallback(() => {
        if (alertShown) {
            handleAlertChange(false);
        }
    }, [alertShown, handleAlertChange]);

    useEffect(() => {
        if (alertShown) {
            setTimeout(hideAlert, 500000);
        }
    }, [alertShown, hideAlert]);

    return (
        <>
            {alertShown &&
                portalContainer &&
                createPortal(
                    <TableAlert
                        value={value}
                        handleAlertClose={hideAlert}
                        variant={variant}
                        classNames={classNames}
                    />,
                    portalContainer
                )}
        </>
    );
};

export default AlertWrapper;
