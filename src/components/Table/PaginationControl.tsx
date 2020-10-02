import React, { ChangeEvent, FunctionComponent } from 'react';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import clsx from 'clsx';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LastPageIcon from '@material-ui/icons/LastPage';
import './PaginationControl.scss';

interface PaginationControlProps {
    currentPage: number;
    handlePageNavigation: (pageDirection: string) => void;
    pageInputState: number;
    totalPages: number;
    handlePageEnter: (event: ChangeEvent<HTMLInputElement>) => void;
    handlePageNavigationByInput: (event: React.FormEvent<Element>) => void;
}

const PaginationControl: FunctionComponent<PaginationControlProps> = ({
    currentPage,
    handlePageNavigation,
    pageInputState,
    totalPages,
    handlePageEnter,
    handlePageNavigationByInput,
}) => {
    return (
        <div className="pagination">
            <FirstPageIcon
                className={clsx('page-first', currentPage !== 1 && 'text-info')}
                onClick={() => handlePageNavigation('first')}
            />
            <NavigateBeforeIcon
                className={clsx('page-previous', currentPage !== 1 && 'text-info')}
                onClick={() => handlePageNavigation('previous')}
            />
            <form className="pagination-input" onSubmit={handlePageNavigationByInput}>
                <input type="text" value={pageInputState} onChange={handlePageEnter} /> of{' '}
                {totalPages}
            </form>
            <NavigateNextIcon
                className={clsx('page-next', currentPage !== totalPages && 'text-info')}
                onClick={() => handlePageNavigation('next')}
            />
            <LastPageIcon
                className={clsx('page-last', currentPage !== totalPages && 'text-info')}
                onClick={() => handlePageNavigation('last')}
            />
        </div>
    );
};

export default PaginationControl;
