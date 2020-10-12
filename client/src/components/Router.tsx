import React, { FC, useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Redirect, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Dispatch } from 'redux';
import UserTable from './UserTable';
import AppTable from './AppTable';
import LocationTable from './LocationTable';
import AuthPage from './AuthPage';
import { RootState } from '../redux/rootReducer';
import authenticationSelectors from '../redux/authentication/authenticationSelectors';
import { AuthActions } from '../redux/authentication/authenticationTypes';
import authenticationActions from '../redux/authentication/authenticationActions';
import './Router.scss';

interface LinkDef {
    label: string;
    pathname: string;
}

interface RouterParams {
    token: string;
    logout: () => void;
}

const Router: FC<RouterParams> = ({ token, logout }) => {
    const [tabActive, setTabActive] = useState<string | undefined>('Users');

    useEffect(() => {
        localStorage.setItem('token', token);
        setTabActive('Users');
    }, [token]);

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
});
const mapDispatchToProps = (dispatch: Dispatch<AuthActions>) => ({
    logout: () => {
        dispatch(authenticationActions.logout());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
