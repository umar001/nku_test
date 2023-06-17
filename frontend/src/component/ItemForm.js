import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ItemForm = ({ onSubmit, onCancel }) => {
    return (
        <div className="item-form">
            <h2>Step 2: Create an item</h2>
            <Formik
                initialValues={{ name: '', status: 0 }}
                onSubmit={onSubmit}
            >
                <Form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <Field type="text" id="name" name="name" required />
                        <ErrorMessage name="name" component="div" className="error-message" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <Field as="select" id="status" name="status" required>
                            <option value="">Select status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </Field>
                        <ErrorMessage name="status" component="div" className="error-message" />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Item</button>
                    <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
                </Form>
            </Formik>
        </div>
    );
};

export default ItemForm;
