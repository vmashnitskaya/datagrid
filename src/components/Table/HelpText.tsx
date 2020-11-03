import React, { FC } from 'react';

export interface HelpTextProps {
    value: string;
}

/**
 * Components displays help text in filter pop-up.
 *
 * @param {string} value
 * @returns {JSX.Element}
 */

const HelpText: FC<HelpTextProps> = ({ value }) => {
    return (
        <small id="emailHelp" className="form-text text-muted">
            {value}
        </small>
    );
};

export default HelpText;
