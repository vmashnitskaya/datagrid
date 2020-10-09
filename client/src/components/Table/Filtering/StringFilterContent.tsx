import React, { ChangeEvent } from 'react';
import HelpText from '../HelpText';

interface StringFilterControlProps {
    handleInputProvided: (event: ChangeEvent<HTMLInputElement>, columnName: string) => void;
    currentColumnName: string;
    filteredColumnAndValue: { [key: string]: string };
}

export type RefForInput = HTMLInputElement;

/**
 * Component for displaying filter pop-up with string type.
 *
 *  @param props
 *  @param  {string} props.currentColumnName - current column name.
 *  @param  {Object.<string, string>} props.filteredColumnAndValue - the object with key as column name and value - filter query for the column.
 *  @param {function(ChangeEvent<HTMLInputElement>, string): void} props.handleInputProvided
 *  ref is used to focus input field after filter pop-up is opened.
 */

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
