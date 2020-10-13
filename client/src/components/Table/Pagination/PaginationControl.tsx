import React, { ChangeEvent, FormEvent, FunctionComponent, useEffect, useState } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Dispatch } from 'redux';
import clsx from 'clsx';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LastPageIcon from '@material-ui/icons/LastPage';
import './PaginationControl.scss';

import { RootState } from '../../../redux/rootReducer';
import pagingSelectors from '../../../redux/tableData/paging/pagingSelectors';
import pagingActions from '../../../redux/tableData/paging/pagingActions';
import { PagingActions } from '../../../redux/tableData/paging/pagingTypes';

interface PaginationControlProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (rowsPerPage: number) => void;
}

/**
 *Component for displaying pagination control.
 *
 * @param props
 * @param {number} props.currentPage - the current page selected.
 * @param {number} props.totalPages - the number of all pages for table.
 * @param {function(number): void} props.setCurrentPage
 * @returns {JSX.Element}
 */

const PaginationControl: FunctionComponent<PaginationControlProps> = ({
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    const [pageInputState, setPageInputState] = useState<number>(1);

    useEffect(() => {
        setPageInputState(currentPage);
    }, [currentPage]);

    const handlePageEnter = (event: ChangeEvent<HTMLInputElement>) => {
        const page = Number(event.target.value);
        if (page <= totalPages) {
            setPageInputState(page);
        }
    };

    const handlePageNavigationByInput = (event: FormEvent) => {
        event.preventDefault();
        if (pageInputState > 0 && pageInputState <= totalPages) {
            setCurrentPage(pageInputState);
        }
    };

    const handlePageNavigation = (pageDirection: string) => {
        let nextPage = 0;

        switch (pageDirection) {
            case 'next':
                nextPage = currentPage + 1 > totalPages ? currentPage : currentPage + 1;
                break;
            case 'previous':
                nextPage = currentPage - 1 > 0 ? currentPage - 1 : currentPage;
                break;
            case 'first':
                nextPage = currentPage !== 1 ? 1 : currentPage;
                break;
            case 'last':
                nextPage = totalPages !== 1 ? totalPages : currentPage;
                break;
            default:
                nextPage = currentPage;
        }

        setCurrentPage(nextPage);
    };
    return (
        <div className="pagination">
            <FirstPageIcon
                className={clsx(
                    'page-first',
                    'text-secondary',
                    'disabled',
                    currentPage !== 1 && 'text-info'
                )}
                onClick={() => handlePageNavigation('first')}
            />
            <NavigateBeforeIcon
                className={clsx(
                    'page-previous',
                    'text-secondary',
                    'disabled',
                    currentPage !== 1 && 'text-info'
                )}
                onClick={() => handlePageNavigation('previous')}
            />
            <form className="pagination-input" onSubmit={handlePageNavigationByInput}>
                <input type="text" value={pageInputState} onChange={handlePageEnter} /> of{' '}
                {totalPages}
            </form>
            <NavigateNextIcon
                className={clsx(
                    'page-next',
                    'text-secondary',
                    'disabled',
                    currentPage !== totalPages && 'text-info'
                )}
                onClick={() => handlePageNavigation('next')}
            />
            <LastPageIcon
                className={clsx(
                    'page-last',
                    'text-secondary',
                    'disabled',
                    currentPage !== totalPages && 'text-info'
                )}
                onClick={() => handlePageNavigation('last')}
            />
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    rowsPerPage: pagingSelectors.getRowsPerPage(state),
    currentPage: pagingSelectors.getCurrentPage(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (
    dispatch: Dispatch<PagingActions>
) => ({
    setCurrentPage: (currentPage: number) => {
        dispatch(pagingActions.setCurrentPage(currentPage));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationControl);
