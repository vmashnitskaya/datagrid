import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './App.scss';

import Router from './Router';

/**
 * App component.
 *
 * @returns {JSX.Element}
 */

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <nav className="bg-light nav">
                <Link className="navbar-brand text-info logo" to="/">
                    DataGrid
                </Link>
            </nav>
            <Router />
        </BrowserRouter>
    );
};

export default App;
