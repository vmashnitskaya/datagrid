import React, { ChangeEvent, FC, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Card, Button, Form } from 'react-bootstrap';
import './AuthPage.scss';

import { User } from '../redux/authentication/authentificationInterfaces';
import { AuthActions } from '../redux/authentication/authenticationTypes';
import authenticationActions from '../redux/authentication/authenticationActions';

interface AuthPageParams {
    loginUser: (userObject: User) => void;
    registerUser: (userObject: User) => void;
}

const AuthPage: FC<AuthPageParams> = ({ loginUser, registerUser }) => {
    const [form, setForm] = useState<User>({ email: '', password: '' });

    const formHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleLogin = () => {
        loginUser(form);
    };

    const handleRegister = () => {
        registerUser(form);
    };

    return (
        <div className="container login-wrapper">
            <Card style={{ width: '18rem' }} className="card">
                <Card.Body>
                    <Card.Title className="login-title text-info">Login or register</Card.Title>
                    <Card.Text>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={form.email}
                                onChange={formHandler}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={form.password}
                                onChange={formHandler}
                            />
                        </Form.Group>
                    </Card.Text>
                    <div className="login-buttons">
                        <Button variant="info" onClick={handleLogin}>
                            Login
                        </Button>
                        <Button variant="info" onClick={handleRegister}>
                            Register
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<AuthActions>) => ({
    loginUser: (userObject: User) => {
        dispatch(authenticationActions.loginUser(userObject));
    },
    registerUser: (userObject: User) => {
        dispatch(authenticationActions.registerUser(userObject));
    },
});

export default connect(null, mapDispatchToProps)(AuthPage);
