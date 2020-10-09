import React, { FC } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface PopOverWrapperProps {
    content: JSX.Element;
    control: JSX.Element;
    isOpened: boolean;
    label: string;
}

const PopOverWrapper: FC<PopOverWrapperProps> = ({ content, control, isOpened, label }) => {
    const popover = (
        <Popover id="popover-basic" className="bg-light">
            <Popover.Title as="h3">{label}</Popover.Title>
            <Popover.Content>{content}</Popover.Content>
        </Popover>
    );
    return (
        <>
            <OverlayTrigger show={isOpened} trigger="click" placement="bottom" overlay={popover}>
                {control}
            </OverlayTrigger>
        </>
    );
};

export default PopOverWrapper;
