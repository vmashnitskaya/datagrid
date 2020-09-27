import React, { FC } from 'react';

interface HelpTextProps {
    value: string;
}

const HelpText: FC<HelpTextProps> = ({ value }) => {
    return (
        <small id="emailHelp" className="form-text text-muted">
            {value}
        </small>
    );
};

export default HelpText;
