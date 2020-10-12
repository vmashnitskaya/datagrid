import React, { FC } from 'react';
import { useLocation } from 'react-router';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const CreateNewRowPage: FC = () => {
    const query = useQuery();
    return <div>{query.get('from')}</div>;
};

export default CreateNewRowPage;
