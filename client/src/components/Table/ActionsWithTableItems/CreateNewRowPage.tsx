import React, {
    ChangeEvent,
    FC,
    FormEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useHistory } from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import useQuery from './useQuery';
import './CreateNewRowPage.scss';

import tableDataSelectors from '../../../redux/tableData/tableDataSelectors';
import { RootState } from '../../../redux/rootReducer';
import { ColumnInterface, ColumnsHeaders } from '../../../redux/tableData/ColumnInterface';
import { TableDataActions } from '../../../redux/tableData/tableDataTypes';
import actions from '../../../redux/tableData/tableDataActions';
import Loader from '../../Loader';
import AlertWrapper from '../AlertWrapper';
import FormControl from './FormControl';
import { InputForm } from './InputFormInterface';

interface CreateNewRowPageProps {
    allColumnHeaders: ColumnsHeaders;
    addNewRow: (object: { [key: string]: string }) => void;
    loading: boolean;
    error: string;
    infoMessage: string;
    resetMessages: () => void;
}

const CreateNewRowPage: FC<CreateNewRowPageProps> = ({
    allColumnHeaders,
    addNewRow,
    loading,
    error,
    infoMessage,
    resetMessages,
}) => {
    const query = useQuery();
    const history = useHistory();
    const [active, setActive] = useState<string | null>('users');
    const [formInput, setFormInput] = useState<InputForm>({});
    const [alertShown, setAlertShown] = useState<boolean>(false);
    const [headersToDisplay, setHeadersToDisplay] = useState<ColumnInterface[]>([]);

    useEffect(() => {
        if (active) {
            const array = allColumnHeaders[active.toLowerCase()];
            setHeadersToDisplay([...array]);
        }
    }, [active, allColumnHeaders]);

    const form = useMemo(() => {
        if (headersToDisplay.length > 0) {
            return headersToDisplay.reduce((acc, el) => ({ ...acc, [el.header]: '' }), {});
        }
        return {};
    }, [headersToDisplay]);

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
        const queryString = query.get('from');
        if (queryString) {
            setActive(queryString.toLowerCase());
        }
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
                        <FormControl
                            handleInputProvided={handleInputProvided}
                            headersToDisplay={headersToDisplay}
                            formInput={formInput}
                            readOnly={false}
                        />
                        <div className="buttons">
                            <Button className="bg-info" size="sm" type="submit">
                                Save
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
    allColumnHeaders: tableDataSelectors.getAllHeaders(state),
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
