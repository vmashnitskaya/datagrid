import React, { ChangeEvent, FunctionComponent } from 'react';
import HelpText from './HelpText';

interface StringFilterControlProps {
    handleInputProvided: (event: ChangeEvent<HTMLInputElement>, columnName: string) => void;
    currentColumnName: string;
    filteredColumnAndValue: { [key: string]: string };
}

const StringFilterContent: FunctionComponent<StringFilterControlProps> = ({
    handleInputProvided,
    currentColumnName,
    filteredColumnAndValue,
}) => {
    return (
        <>
            <input
                className="form-control form-control-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(event) => handleInputProvided(event, currentColumnName)}
                value={filteredColumnAndValue[currentColumnName]}
            />
            <HelpText value="Enter filter criteria and click Enter." />
        </>
    );
};

export default StringFilterContent;
