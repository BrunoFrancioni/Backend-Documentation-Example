import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Nav, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ILoginUser } from '../../../core/interfaces/IUsers';
import UsersService from '../../../core/services/UsersService';
import * as yup from 'yup';

import './styles.css';
import { LoginProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/store';
import { Redirect, useHistory } from 'react-router-dom';

const Login = (props: LoginProps) => {
    if (props.userLogged) {
        return <Redirect to="/" />;
    }

    const usersService: UsersService = new UsersService();

    const history = useHistory();

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const initialState: ILoginUser = {
        email: '',
        password: ''
    }

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user.logged) {
            history.push('/');
        }
    }, []);

    const validationSchema = yup.object().shape({
        email: yup.string().required("Required").email("Enter a valid email"),
        password: yup.string().required("Required")
    });

    const handleSubmit = async (values: ILoginUser) => {
        setLoading(true);

        try {
            const result = await usersService.loginUser(values);

            props.userLogguedIn(result.data.token, result.data.user);
        } catch (e) {
            if (e.response.status === 400) {
                Swal.fire({
                    title: 'An error has occurred',
                    text: 'Incorrect user or password',
                    icon: 'error'
                });
            } else {
                console.log("ERROR", e);

                Swal.fire({
                    title: 'An error has occurred',
                    text: 'Try again',
                    icon: 'error'
                });
            }

            setLoading(false);
        }
    }

    return (
        <div className="main-container">
            <div className="card-container">
                <Card className="card-login" style={{ width: '35rem', height: '35rem' }}>
                    <Card.Title>
                        <div className="center-container">
                            <img src="logo512.png" alt="logo" className="logo" />
                            <h2>Login</h2>
                        </div>
                    </Card.Title>

                    <Card.Body>
                        <Formik
                            initialValues={initialState}
                            validationSchema={validationSchema}
                            onSubmit={(data, { setSubmitting }) => {
                                setSubmitting(true);

                                handleSubmit(data);

                                setSubmitting(false);
                            }}
                        >
                            {
                                ({ values,
                                    errors,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    touched
                                }) => (
                                    <Form
                                        noValidate
                                        onSubmit={handleSubmit}
                                    >
                                        <Form.Group
                                            controlId="email"
                                            className="position-relative"
                                        >
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                size="lg"
                                                type="email"
                                                placeholder="Enter email"
                                                defaultValue={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.email && !errors.email}
                                                isInvalid={!!errors.email}
                                            />

                                            <Form.Control.Feedback
                                                type="invalid"
                                                tooltip
                                            >{errors.email}</Form.Control.Feedback>
                                        </Form.Group>

                                        <br />

                                        <Form.Group
                                            controlId="password"
                                            className="position-relative"
                                        >
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                size="lg"
                                                type="password"
                                                placeholder="Enter password"
                                                defaultValue={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.password && !errors.password}
                                                isInvalid={!!errors.password}
                                            />

                                            <Form.Control.Feedback
                                                type="invalid"
                                                tooltip
                                            >{errors.password}</Form.Control.Feedback>
                                        </Form.Group>

                                        <br />

                                        <div className="center-container">
                                            <Button
                                                variant="success"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Log in
                                            </Button>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>

                        {
                            loading &&
                            <div className="spinner-container">
                                <Spinner animation="border" role="status">
                                </Spinner>
                            </div>
                        }

                        <p>In case you don't have an account, create it
                            <a href="/signup">
                                here
                            </a>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        </div >
    );
}

export default Login;