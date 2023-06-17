import React from 'react';

const Preview = ({ itemData, setStep }) => {
    return (
        <div className="preview">
            <h2>Step 3: Preview</h2>
            <div className="preview-item">
                <h3>Item Details</h3>
                <p>
                    <strong>Name:</strong> {itemData.name}
                </p>
                <p>
                    <strong>User Added:</strong> {itemData.userId.name}
                </p>
                <p>
                    <strong>Date Added:</strong> {itemData.createdAt}
                </p>
                <p>
                    <strong>State:</strong> {itemData.status ? 'Active' : 'Inactive'}
                </p>
            </div>
            <div className='bottom-btn'>
                <button className="btn btn-primary" onClick={() => setStep(2)}>Back</button>
                <button className="btn btn-primary" onClick={() => setStep(4)}>Next step</button>
            </div>
        </div>
    );
};

export default Preview;
