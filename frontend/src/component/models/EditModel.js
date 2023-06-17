import React, { useState } from 'react';

const EditModal = ({ item, onSave, onCancel }) => {
    const [name, setName] = useState(item.name);
    const [status, setStatus] = useState(item.status);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSave = () => {
        onSave({ id: item.id, name, status });
    };

    return (
        <div className="edit-modal">
            <h2>Edit Item</h2>
            <div>
                <label htmlFor="edit-name">Name:</label>
                <input
                    type="text"
                    id="edit-name"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                <label htmlFor="edit-status">Status:</label>
                <select id="edit-status" value={status} onChange={handleStatusChange}>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            </div>
            <div className="modal-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditModal;
