import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SortingControls from './SortingControls';

import store from '../../../redux/rootReducer';

afterEach(cleanup);

describe('Test SortingControl component', () => {
    test('correct color for active sorting control exists after click.', () => {
        const props = {
            currentElementColumn: 'id',
        };

        render(
            <Provider store={store}>
                <SortingControls {...props} />
            </Provider>
        );

        fireEvent(
            screen.getByTestId('id_up'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(screen.getByTestId('id_up')).toHaveClass('text-info');
        expect(screen.getByTestId('id_down')).not.toHaveClass('text-info');
    });
});
