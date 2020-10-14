import React, {
    ChangeEvent,
    FC,
    FormEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useHistory, useLocation } from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import './CreateNewRowPage.scss';

import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import { RootState } from '../../redux/rootReducer';
import { ColumnInterface } from '../../redux/tableData/ColumnInterface';
import { TableDataActions } from '../../redux/tableData/tableDataTypes';
import actions from '../../redux/tableData/tableDataActions';
import Loader from '../Loader';
import AlertWrapper from './AlertWrapper';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

interface InputForm {
    [key: string]: string;
}

interface CreateNewRowPageProps {
    tableColumnHeaders: ColumnInterface[];
    addNewRow: (object: { [key: string]: string }) => void;
    loading: boolean;
    error: string;
    infoMessage: string;
    resetMessages: () => void;
}

const CreateNewRowPage: FC<CreateNewRowPageProps> = ({
    tableColumnHeaders,
    addNewRow,
    loading,
    error,
    infoMessage,
    resetMessages,
}) => {
    const form = useMemo(() => {
        return tableColumnHeaders.reduce((acc, el) => ({ ...acc, [el.name]: '' }), {});
    }, [tableColumnHeaders]);
    const query = useQuery();
    const history = useHistory();
    const [active, setActive] = useState<string | null>('users');
    const [formInput, setFormInput] = useState<InputForm>(form);
    const [alertShown, setAlertShown] = useState<boolean>(false);

    const handleAlertChange = (value: boolean) => {
        if (alertShown) {
            resetMessages();
        }
        setAlertShown(value);
    };

    useEffect(() => {
        if (error) {
            setAlertShown(true);
        }
    }, [error]);

    useEffect(() => {
        setFormInput(form);
    }, [setFormInput, form]);

    useEffect(() => {
        setActive(query.get('from'));
    }, [query]);

    const handleClose = useCallback(() => {
        history.push(`/${active}`);
        resetMessages();
    }, [active, history, resetMessages]);

    const handleInputProvided = (event: ChangeEvent<HTMLInputElement>, inputName: string) => {
        const userInput = event.target.value;
        setFormInput((prevState) => ({ ...prevState, [inputName]: userInput }));
    };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const { checkbox, ...dataToSend } = formInput;
        await addNewRow(dataToSend);
    };

    useEffect(() => {
        if (infoMessage) {
            handleClose();
        }
    }, [infoMessage, handleClose]);

    return (
        <>
            <h3 className="text-info">Create new row for {active} table</h3>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Form validated onSubmit={handleFormSubmit}>
                        {tableColumnHeaders
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
                                            type={el.type === 'number' ? 'number' : 'text'}
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
                            <Button
                                className="bg-info"
                                size="sm"
                                type="button"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </>
            )}
            <AlertWrapper
                value={error}
                classNames="create-page"
                variant="danger"
                alertShown={alertShown}
                handleAlertChange={handleAlertChange}
            />
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    tableColumnHeaders: tableDataSelectors.getColumnHeaders(state),
    loading: tableDataSelectors.getLoading(state),
    error: tableDataSelectors.getError(state),
    infoMessage: tableDataSelectors.getInfoMessage(state),
});

const mapDispatchToProps = (dispatch: Dispatch<TableDataActions>) => ({
    addNewRow: (data: { [key: string]: string }) => {
        dispatch(actions.addNewRow(data));
    },
    resetMessages: () => {
        dispatch(actions.resetMessages());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewRowPage);
