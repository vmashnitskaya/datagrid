import React, { ChangeEvent, FormEvent, FunctionComponent, useEffect, useState } from 'react';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import clsx from 'clsx';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LastPageIcon from '@material-ui/icons/LastPage';
import './PaginationControl.scss';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import tableDataSelectors from '../../redux/tableData/tableDataSelectors';
import actions from '../../redux/tableData/tableDataActions';

interface PaginationControlProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (rowsPerPage: number) => void;
}

/**
 *Component for displaying pagination control.
 *
 * @component
 * @param props
 * @param props.currentPage - the current page selected.
 * @param props.totalPages - the number of all pages for table.
 * @param props.setCurrentPage
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
        setCurrentPage(pageInputState);
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

const mapStateToProps = (state: RootState) => ({
    rowsPerPage: tableDataSelectors.getRowsPerPage(state),
    currentPage: tableDataSelectors.getCurrentPage(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch) => ({
    setCurrentPage: (currentPage: number) => {
        dispatch(actions.setCurrentPage(currentPage));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationControl);
