import React, { ChangeEvent, FC } from 'react';
import HelpText from './HelpText';
import './SelectFilterContent.scss';

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
            <label htmlFor="male">Male</label>
            <input
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
};

export default SelectFilterContent;
