import React, { useEffect, useState } from 'react';
import { deleteData, fetchData, storeData, updateData } from '../lib/apiHelper';
import { checkApiResponse } from '../lib/helper';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';

const ItemList = ({ items, onAddMoreItems, onLogout, handleListItems }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEdit = async (item) => {
        const response = await fetchData('items/' + item._id)
        if (checkApiResponse(response)) {
            const { item } = response
            console.log(item)
            setSelectedItem(item);
            setShowEditModal(true);
            return
        }
        alert(response.error)
    };

    const handleDelete = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    };

    const handleEditSubmit = async (values) => {
        const { name, status } = values

        const response = await updateData(`items`, selectedItem._id, { name, status })
        if (checkApiResponse(response)) {
            handleListItems()
            setShowEditModal(false)
            setSelectedItem(null)
            return
        }
        alert(response?.error)
    };

    const handleDeleteSubmit = async () => {
        const response = await deleteData('items', selectedItem._id)
        if (checkApiResponse(response)) {
            handleListItems()
            setShowDeleteModal(false);
            setSelectedItem(null)
            return
        }
    };
    useEffect(() => {
        handleListItems()
    }, [])

    return (
        <div className="item-list">
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>User Added</th>
                        <th>Date Added</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.userId.name}</td>
                            <td>{moment(item.createdAt).format("YYYY-MM-DD HH:mm")}</td>
                            <td>{item.status ? 'Active' : "Inactive"}</td>
                            <td>
                                <button className="btn btn-edit" onClick={() => handleEdit(item)}>
                                    Edit
                                </button>
                                <button className="btn btn-delete" onClick={() => handleDelete(item)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-group">
                <button onClick={onAddMoreItems} className="btn btn-primary">
                    Add More Items
                </button>
                <button onClick={onLogout} className="btn btn-secondary">
                    Log Out
                </button>
            </div>

            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Item</h3>
                        <Formik
                            initialValues={{ name: selectedItem?.name, status: selectedItem?.status ? 1 : 0 }}
                            onSubmit={handleEditSubmit}
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
                                <button type="submit" className="btn btn-primary">Update Item</button>
                                <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-secondary">Cancel</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Delete Item</h3>
                        <p>Are you sure you want to delete this item?</p>
                        <div className='model-btn'>

                            <button onClick={handleDeleteSubmit} className="btn btn-danger">
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemList;
