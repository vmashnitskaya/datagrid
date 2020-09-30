import React, { ChangeEvent } from 'react';
import HelpText from './HelpText';
import './SelectFilterContent.scss';

interface SelectFilterContentProps {
    handleInputProvided: (event: ChangeEvent<HTMLInputElement>, columnName: string) => void;
    currentColumnName: string;
    filteredColumnAndValue: { [key: string]: string };
}

type RefForInput = HTMLInputElement;

const SelectFilterContent = React.forwardRef<RefForInput, SelectFilterContentProps>(
    ({ handleInputProvided, currentColumnName, filteredColumnAndValue }, ref) => {
        return (
            <>
                <label htmlFor="male">Male</label>
                <input
                    ref={ref}
                    type="radio"
                    value="male"
                    id="male"
                    name="male"
                    checked={filteredColumnAndValue[currentColumnName] === 'male'}
                    onChange={(event) => handleInputProvided(event, currentColumnName)}
                />
                <label htmlFor="female">Female</label>
                <input
                    type="radio"
                    value="female"
                    id="female"
                    name="female"
                    checked={filteredColumnAndValue[currentColumnName] === 'female'}
                    onChange={(event) => handleInputProvided(event, currentColumnName)}
                />
                <input type="submit" className="btn btn-info btn-sm" />
                <HelpText value="Select filter criteria and click Filter." />
            </>
        );
    }
);

export default SelectFilterContent;
