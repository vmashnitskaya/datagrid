import React, { FC, useState } from 'react';

import DragHandleIcon from '@material-ui/icons/DragHandle';
import PopOverWrapper from './PopOverWrapper';
import ColumnSelectionContent from './ColumnSelectionContent';
import './ColumnSelectionPopOver.scss';

const ColumnSelectionPopOver: FC = () => {
    const [isPopOverOpened, setIsPopOverOpened] = useState(false);

    const handleClick = () => {
        setIsPopOverOpened((prevState) => !prevState);
    };

    const content = <ColumnSelectionContent />;
    const control = <DragHandleIcon className="columnsHide text-secondary" onClick={handleClick} />;

    return (
        <PopOverWrapper
            content={content}
            control={control}
            isOpened={isPopOverOpened}
            label="Columns"
        />
    );
};

export default ColumnSelectionPopOver;
