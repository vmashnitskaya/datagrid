import React, { ChangeEvent, FunctionComponent } from 'react';
import HelpText from './HelpText';

interface StringFilterControlProps {
    handleInputProvided: (event: ChangeEvent<HTMLInputElement>, columnName: string) => void;
    currentColumnName: string;
    filteredColumnAndValue: { [key: string]: string };
}

export type RefForInput = HTMLInputElement;

const StringFilterContent = React.forwardRef<RefForInput, StringFilterControlProps>(
    ({ handleInputProvided, currentColumnName, filteredColumnAndValue }, ref) => {
        return (
            <>
                <input
                    className="form-control form-control-sm"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(event) => handleInputProvided(event, currentColumnName)}
                    value={filteredColumnAndValue[currentColumnName]}
                    ref={ref}
                />
                <HelpText value="Fill in filter criteria and click Enter." />
            </>
        );
    }
);

export default StringFilterContent;
