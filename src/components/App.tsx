import React, { useMemo, useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './App.scss';
import clsx from 'clsx';
import Table from './Table';

interface LinkDef {
    label: string;
    pathname: string;
}

const App: React.FC = () => {
    const [tabActive, setTabActive] = useState<string | undefined>('Users');

    const links: LinkDef[] = useMemo(
        () => [
            {
                label: 'Users',
                pathname: '/users',
            },
            {
                label: 'Apps',
                pathname: '/apps',
            },
            {
                label: 'Locations',
                pathname: '/locations',
            },
        ],
        []
    );

    const handleTabActiveChange = (event: React.MouseEvent<HTMLElement>): void => {
        const newActiveLabel = event.currentTarget.dataset.label;

        setTabActive(newActiveLabel);
    };

    return (
        <div className="container">
            <BrowserRouter>
                <nav>
                    <div className="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                        {links.map((link) => {
                            return (
                                <Link
                                    className={clsx(
                                        'nav-link',
                                        'mt-5',
                                        'text-dark',
                                        tabActive === link.label && 'active'
                                    )}
                                    key={link.label}
                                    role="tab"
                                    aria-controls="nav-home"
                                    to={link.pathname}
                                    data-label={link.label}
                                    onClick={handleTabActiveChange}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <Table tabActive={tabActive} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
