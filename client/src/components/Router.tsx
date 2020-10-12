import React, { FC, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';
import clsx from 'clsx';

import { Button } from 'react-bootstrap';
import UserTable from './UserTable';
import AppTable from './AppTable';
import LocationTable from './LocationTable';
import AuthPage from './AuthPage';
import './Router.scss';

import { RootState } from '../redux/rootReducer';
import { AuthActions } from '../redux/authentication/authenticationTypes';
import authenticationActions from '../redux/authentication/authenticationActions';
import authenticationSelectors from '../redux/authentication/authenticationSelectors';
import tableDataSelectors from '../redux/tableData/tableDataSelectors';
import tableDataActions from '../redux/tableData/tableDataActions';
import { TableDataActions } from '../redux/tableData/tableDataTypes';

interface LinkDef {
    label: string;
    pathname: string;
}

interface RouterParams {
    token: string;
    logout: () => void;
    setTabActive: (tabActive: string) => void;
    tabActive: string;
}

const Router: FC<RouterParams> = ({ token, logout, setTabActive, tabActive }) => {
    useEffect(() => {
        localStorage.setItem('token', token);
        setTabActive('Users');
    }, [token, setTabActive]);

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
        if (newActiveLabel) {
            setTabActive(newActiveLabel);
        }
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
    };

    return (
        <>
            <nav className="bg-info nav">
                <Link className="navbar-brand text-light logo" to="/">
                    DataGrid
                </Link>
                {token && (
                    <Button
                        variant="light"
                        onClick={handleLogout}
                        size="sm"
                        className="logout text-light"
                    >
                        Logout
                    </Button>
                )}
            </nav>
            {token ? (
                <div className="container app-wrapper">
                    <div className="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                        {links.map((link) => {
                            return (
                                <Link
                                    className={clsx(
                                        'nav-link',
                                        'tab',
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
                    <div className="tab-content" id="nav-tabContent">
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
                </div>
            ) : (
                <Switch>
                    <Route exact path="/">
                        <AuthPage />
                    </Route>
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            )}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    token: authenticationSelectors.getToken(state),
    tabActive: tableDataSelectors.getTabActive(state),
});
const mapDispatchToProps = (dispatch: Dispatch<AuthActions | TableDataActions>) => ({
    logout: () => {
        dispatch(authenticationActions.logout());
    },
    setTabActive: (tabActive: string) => {
        dispatch(tableDataActions.setTabActive(tabActive));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
