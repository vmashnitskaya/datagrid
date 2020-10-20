import React, {
    ChangeEvent,
    FC,
    FormEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { connect } from 'react-redux';

import { useHistory, useLocation } from 'react-router';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import useQuery from './useQuery';
import { RootState } from '../../../redux/rootReducer';
import tableDataSelectors from '../../../redux/tableData/tableDataSelectors';
import { NormalizedObject } from '../../../redux/tableData/tableDataInterface';
import FormControl from './FormControl';
import { ColumnInterface, ColumnsHeaders } from '../../../redux/tableData/ColumnInterface';
import { InputForm } from './InputFormInterface';

interface OpenItemPageProps {
    renderData: NormalizedObject;
    allHeaders: ColumnsHeaders;
}

const OpenItemPage: FC<OpenItemPageProps> = ({ renderData, allHeaders }) => {
    const query = useQuery();
    const location = useLocation();
    const history = useHistory();
    const [objectToDisplay, setObjectToDisplay] = useState<InputForm>({});
    const [headersToDisplay, setHeadersToDisplay] = useState<ColumnInterface[]>([]);

    useEffect(() => {
        setHeadersToDisplay(allHeaders[`${location.pathname.slice(1)}s`]);
    }, [location, allHeaders]);

    useEffect(() => {
        const queryString = query.get('id');
        if (queryString && Object.keys(renderData).length > 0) {
            setObjectToDisplay(renderData[queryString]);
        }
    }, [query, renderData]);

    const handleClose = useCallback(() => {
        history.goBack();
    }, [history]);

    const handleInputProvided = () => {};

    return (
        <>
            <h3 className="text-info">Review item</h3>
            <Form validated>
                <FormControl
                    handleInputProvided={handleInputProvided}
                    headersToDisplay={headersToDisplay}
                    formInput={objectToDisplay}
                    readOnly
                />
                <Button className="bg-info" size="sm" type="button" onClick={handleClose}>
                    Cancel
                </Button>
            </Form>
        </>
    );
};
const mapStateToProps = (state: RootState) => ({
    renderData: tableDataSelectors.getRenderData(state),
    allHeaders: tableDataSelectors.getAllHeaders(state),
});

export default connect(mapStateToProps)(OpenItemPage);
