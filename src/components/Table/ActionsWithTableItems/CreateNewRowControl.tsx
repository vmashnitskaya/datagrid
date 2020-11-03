import React, { FC } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import Button from 'react-bootstrap/Button';

import { RootState } from '../../../redux/rootReducer';
import tableDataSelectors from '../../../redux/tableData/tableDataSelectors';

interface CreateNewRowControlProps {
    tabActive: string;
}

const CreateNewRowControl: FC<CreateNewRowControlProps> = ({ tabActive }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(`/create?from=${tabActive.toLowerCase()}`);
    };
    return (
        <Button size="sm" variant="info" onClick={handleClick}>
            Create new
        </Button>
    );
};

const mapStateToProps = (state: RootState) => ({
    tabActive: tableDataSelectors.getTabActive(state),
});

export default connect(mapStateToProps)(CreateNewRowControl);
