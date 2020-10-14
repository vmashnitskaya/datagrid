import React, { FC, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';
import clsx from 'clsx';

import { Button } from 'react-bootstrap';
import UserTable from './UserTable';
import AppTable from './AppTable';
import LocationTable from './LocationTable';
import AuthPage from './AuthPage';
import CreateNewRowPage from './Table/CreateNewRowPage';
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
    name: string;
    pathname: string;
}

interface RouterParams {
    token: string;
    logout: () => void;
    setTabActive: (tabActive: string) => void;
    tabActive: string;
}

const Router: FC<RouterParams> = ({ token, logout, setTabActive, tabActive }) => {
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('token', token);
        setTabActive('users');
    }, [token, setTabActive]);

    useEffect(() => {
        if (
            location.pathname === '/users' ||
            location.pathname === '/locations' ||
            location.pathname === '/apps'
        ) {
            setTabActive(location.pathname.slice(1));
        }
    }, [location.pathname, setTabActive]);

    const links: LinkDef[] = useMemo(
        () => [
            {
                label: 'Users',
                name: 'users',
                pathname: '/users',
            },
            {
                label: 'Apps',
                name: 'apps',
                pathname: '/apps',
            },
            {
                label: 'Locations',
                name: 'locations',
                pathname: '/locations',
            },
        ],
        []
    );

    const handleTabActiveChange = (name: string): void => {
        if (name) {
            setTabActive(name);
        }
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
    };

    return (
        <>
            <nav className="bg-info nav">
                <Link className="navbar-brand text-light logo" to="/users">
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
                        {location.pathname !== '/create' &&
                            links.map((link) => {
                                return (
                                    <Link
                                        className={clsx(
                                            'nav-link',
                                            'tab',
                                            'mt-2',
                                            'text-dark',
                                            tabActive === link.name && 'active'
                                        )}
                                        key={link.label}
                                        role="tab"
                                        aria-controls="nav-home"
                                        to={link.pathname}
                                        data-label={link.label}
                                        onClick={() => handleTabActiveChange(link.name)}
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
                            <Route path="/create">
                                <CreateNewRowPage />
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
