import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import HelpText from './HelpText';

afterEach(cleanup);

describe('Test HelpText component', () => {
    test('Correct value is displayed in component', () => {
        const testText = 'Test text';
        const { getByText } = render(<HelpText value={testText} />);

        expect(getByText(testText)).toBeInTheDocument();
    });
});
