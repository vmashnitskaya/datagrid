import React, { ChangeEvent, FC, FormEvent, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import './CreateNewRowPage.scss';

import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import { RootState } from '../../redux/rootReducer';
import { ColumnInterface } from '../ColumnInterface';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

interface InputForm {
    [key: string]: string;
}

interface CreateNewRowPageProps {
    columnHeaders: ColumnInterface[];
}

const CreateNewRowPage: FC<CreateNewRowPageProps> = ({ columnHeaders }) => {
    const form = useMemo(() => {
        return columnHeaders.reduce((acc, el) => ({ ...acc, [el.name]: '' }), {});
    }, [columnHeaders]);

    const query = useQuery();
    const history = useHistory();
    const [active, setActive] = useState<string | null>('users');
    const [formInput, setFormInput] = useState<InputForm>(form);

    useEffect(() => {
        setFormInput(form);
    }, [setFormInput, form]);

    useEffect(() => {
        setActive(query.get('from'));
    }, [query]);

    const handleCancel = () => {
        history.push(`/${active}`);
    };

    const handleInputProvided = (event: ChangeEvent<HTMLInputElement>, inputName: string) => {
        const userInput = event.target.value;
        console.log(inputName);
        setFormInput((prevState) => ({ ...prevState, [inputName]: userInput }));
    };

    useEffect(() => {
        console.log(formInput);
    }, [formInput]);

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        const { checkbox, ...others } = formInput;
    };

    return (
        <>
            <h3 className="text-info">Create new row for {active} table</h3>
            <Form validated onSubmit={handleFormSubmit}>
                {columnHeaders
                    .filter((el) => el.type !== 'checkbox')
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
                                    />
                                ))}
                            </Form.Group>
                        ) : (
                            <Form.Group className="form-group" key={el.name}>
                                <Form.Label as="label">{el.header}:</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    required
                                    placeholder={`Enter ${el.header.toLowerCase()}`}
                                    name={el.name}
                                    value={formInput ? formInput[el.name] : ''}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                        handleInputProvided(event, el.name)
                                    }
                                />
                            </Form.Group>
                        );
                    })}
                <div className="buttons">
                    <Button className="bg-info" size="sm" type="submit">
                        Create
                    </Button>
                    <Button className="bg-info" size="sm" type="button" onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    columnHeaders: tableDataSelectors.getColumnHeaders(state),
});

export default connect(mapStateToProps)(CreateNewRowPage);
