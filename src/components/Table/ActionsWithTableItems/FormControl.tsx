import React, { ChangeEvent, FunctionComponent } from 'react';
import { Form } from 'react-bootstrap';
import { ColumnInterface } from '../../../redux/tableData/ColumnInterface';
import { InputForm } from './InputFormInterface';

interface FormControlProps {
    handleInputProvided: (event: ChangeEvent<HTMLInputElement>, inputName: string) => void;
    headersToDisplay: ColumnInterface[];
    formInput: InputForm;
    readOnly: boolean;
}

const FormControl: FunctionComponent<FormControlProps> = ({
    headersToDisplay,
    handleInputProvided,
    formInput,
    readOnly,
}) => {
    return (
        <>
            {headersToDisplay &&
                headersToDisplay.length > 0 &&
                headersToDisplay
                    .filter((el) => el.name !== 'checkbox' && el.name !== 'open')
                    .map((el) => {
                        return el.type === 'select' ? (
                            <Form.Group className="form-group" key={el.name}>
                                <Form.Label className="form-label" as="label">
                                    {el.header}:
                                </Form.Label>
                                {el.options.map((elem: string) => (
                                    <Form.Check
                                        key={elem}
                                        type="radio"
                                        label={elem}
                                        required
                                        name={el.name}
                                        value={elem}
                                        checked={elem === formInput[el.name]}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                            handleInputProvided(event, el.name)
                                        }
                                        disabled={readOnly}
                                    />
                                ))}
                            </Form.Group>
                        ) : (
                            <Form.Group className="form-group" key={el.name}>
                                <Form.Label as="label">{el.header}:</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type={el.type === 'number' ? 'number' : 'text'}
                                    required
                                    placeholder={`Enter ${el.header.toLowerCase()}`}
                                    name={el.name}
                                    value={formInput && formInput[el.name]}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                        handleInputProvided(event, el.name)
                                    }
                                    disabled={readOnly}
                                />
                            </Form.Group>
                        );
                    })}
        </>
    );
};

export default FormControl;
