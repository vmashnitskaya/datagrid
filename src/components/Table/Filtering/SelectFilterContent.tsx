import React, { ChangeEvent } from 'react';
import HelpText from '../HelpText';
import './SelectFilterContent.scss';

interface SelectFilterContentProps {
    handleInputProvided: (event: ChangeEvent<HTMLInputElement>, columnName: string) => void;
    currentColumnName: string;
    filteredColumnAndValue: { [key: string]: string };
    currentSelectionOptions: string[];
}

type RefForInput = HTMLInputElement;

/**
 * Component for displaying filter pop-up with select type.
 *
 *  @param  props
 *  @param  {string} props.currentColumnName - current column name.
 *  @param  {Object.<string, string>} props.filteredColumnAndValue - the object with key as column name and value - filter query for the column.
 *  @param {function(ChangeEvent<HTMLInputElement>, string): void} props.handleInputProvided
 *  ref is used to focus input field after filter pop-up is opened.
 */

const SelectFilterContent = React.forwardRef<RefForInput, SelectFilterContentProps>(
    (
        { handleInputProvided, currentColumnName, filteredColumnAndValue, currentSelectionOptions },
        ref
    ) => {
        return (
            <>
                {currentSelectionOptions.map((element) => (
                    <React.Fragment key={element}>
                        <label htmlFor={`${element}`}>
                            {element.slice(0, 1).toUpperCase() + element.slice(1)}
                        </label>
                        <input
                            ref={ref}
                            type="radio"
                            value={`${element}`}
                            id={`${element}`}
                            name={`${element}`}
                            checked={filteredColumnAndValue[currentColumnName] === element}
                            onChange={(event) => handleInputProvided(event, currentColumnName)}
                        />
                    </React.Fragment>
                ))}
                <input type="submit" className="btn btn-info btn-sm" value="Filter" />
                <HelpText value="Select filter criteria and click Filter." />
            </>
        );
    }
);

export default SelectFilterContent;
