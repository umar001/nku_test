import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

const LoginForm = ({ onSubmit, loginError }) => {
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false); // Reset the form submission state
    };

    return (
        <div className="login-form-container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <Field type="email" id="email" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <Field type="password" id="password" name="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>

                        {loginError && (
                            <div className="error-message">Wrong username or password. Please try again.</div>
                        )}

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Log In
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
