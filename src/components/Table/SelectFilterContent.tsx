import React, { ChangeEvent, FC } from 'react';
import HelpText from './HelpText';

interface SelectFilterContentProps {
    handleInputProvided: (event: ChangeEvent<HTMLInputElement>, columnName: string) => void;
    currentColumnName: string;
    filteredColumnAndValue: { [key: string]: string };
}

const SelectFilterContent: FC<SelectFilterContentProps> = ({
    handleInputProvided,
    currentColumnName,
    filteredColumnAndValue,
}) => {
    return (
        <>
            <div className="radios">
                <label htmlFor="male">Male</label>
                <input
                    type="radio"
                    value="male"
                    id="male"
                    name="male"
                    checked={filteredColumnAndValue[currentColumnName] === 'male'}
                    onChange={(event) => handleInputProvided(event, currentColumnName)}
                />
            </div>
            <div className="radios">
                <label htmlFor="female">Female</label>
                <input
                    type="radio"
                    value="female"
                    id="female"
                    name="female"
                    checked={filteredColumnAndValue[currentColumnName] === 'female'}
                    onChange={(event) => handleInputProvided(event, currentColumnName)}
                />
            </div>
            <button type="submit" className="btn btn-info btn-sm">
                Filter
            </button>
            <HelpText value="Select filter criteria and click Filter." />
        </>
    );
};

export default SelectFilterContent;
