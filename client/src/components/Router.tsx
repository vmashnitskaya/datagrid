import React, { FC, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Redirect, Route, Switch } from 'react-router';
import UserTable from './UserTable';
import AppTable from './AppTable';
import LocationTable from './LocationTable';

interface LinkDef {
    label: string;
    pathname: string;
}

const Router: FC = () => {
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
        <>
            <div className="container mt-3">
                <div className="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                    {links.map((link) => {
                        return (
                            <Link
                                className={clsx(
                                    'nav-link',
                                    'mt-2',
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
            </div>
            <div className="tab-content container" id="nav-tabContent">
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/users" />
                    </Route>
                    <Route exact path="/users">
                        <UserTable />
                    </Route>
                    <Route path="/apps">
                        <AppTable />
                    </Route>
                    <Route path="/locations">
                        <LocationTable />
                    </Route>
                </Switch>
            </div>
        </>
    );
};

export default Router;