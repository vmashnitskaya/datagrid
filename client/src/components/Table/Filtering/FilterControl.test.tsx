import React from 'react';
import { render, cleanup, fireEvent, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FilterControl from './FilterControl';

afterEach(cleanup);

describe('Test FilterControl component', () => {
    const handleFilterOpenedCallback = jest.fn();
    test('Correct class for color presented if search query is presented for current column.', () => {
        const props = {
            currentElementColumnName: 'id',
            filteredColumnAndValue: {
                id: '1',
                first_name: '',
                last_name: '',
                date: '',
                email: '',
                gender: '',
                location: '',
            },
            handleFilterOpened: handleFilterOpenedCallback,
            disabled: false,
        };
        const { container } = render(<FilterControl {...props} />);

        expect(container.firstChild).toHaveClass('text-info');
    });
    test('Class for color is not presented if search query is empty for current column.', () => {
        const props = {
            currentElementColumnName: 'id',
            filteredColumnAndValue: {
                id: '',
                first_name: '',
                last_name: '',
                date: '',
                email: '',
                gender: '',
                location: '',
            },
            disabled: false,
            handleFilterOpened: handleFilterOpenedCallback,
        };
        const { container } = render(<FilterControl {...props} />);

        expect(container.firstChild).not.toHaveClass('text-info');
    });
    test('On Click event for Filter control', () => {
        const props = {
            currentElementColumnName: 'id',
            filteredColumnAndValue: {
                id: '',
                first_name: '',
                last_name: '',
                date: '',
                email: '',
                gender: '',
                location: '',
            },
            disabled: false,
            handleFilterOpened: handleFilterOpenedCallback,
        };
        const { container } = render(<FilterControl {...props} />);

        fireEvent(
            getByTestId(container, 'filter-control'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );
        expect(handleFilterOpenedCallback).toHaveBeenCalled();
        expect(handleFilterOpenedCallback).toHaveBeenCalledWith(props.currentElementColumnName);
    });
    test('On KeyPress event for Filter control', () => {
        const props = {
            currentElementColumnName: 'id',
            filteredColumnAndValue: {
                id: '',
                first_name: '',
                last_name: '',
                date: '',
                email: '',
                gender: '',
                location: '',
            },
            disabled: false,
            handleFilterOpened: handleFilterOpenedCallback,
        };
        const { container } = render(<FilterControl {...props} />);

        fireEvent(
            getByTestId(container, 'filter-control'),
            new KeyboardEvent('keyPress', {
                bubbles: true,
                cancelable: true,
                code: 'Enter',
                composed: true,
            })
        );
        expect(handleFilterOpenedCallback).toHaveBeenCalled();
        expect(handleFilterOpenedCallback).toHaveBeenCalledWith(props.currentElementColumnName);
    });
});
