import React, { useCallback, useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import ItemForm from './ItemForm';
import Preview from './Preview';
import ItemList from './ItemList';
import WizardHeader from './WizardHeader';
import { storeData } from '../lib/apiHelper';
import { checkApiResponse } from '../lib/helper';
import { JWT_TOKEN } from '../lib/constant';

const WizardComponent = () => {
    const [step, setStep] = useState(1);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [userData, setUserData] = useState(null);
    const [itemData, setItemData] = useState({
        name: '',
        state: '',
    });
    const [previewData, setPreviewData] = useState(null);
    const [items, setItems] = useState([]);

    const handleLastStep = useCallback(() => {

    }, [])

    const handleLoginSubmit = async (values) => {
        // Perform login logic here
        const { email, password } = values;

        const response = await storeData('auth/login', { email, password })

        // Check if the login credentials are correct
        if (checkApiResponse(response)) {
            const { token } = response
            localStorage.setItem(JWT_TOKEN, token)
            setLoggedIn(true);
            setStep(2);
            setLoginError(false);
            setUserData({ email });
        } else {
            setLoginError(true);
        }
    };

    const handleItemSubmit = async (values) => {
        const { name, status } = values
        const response = await storeData('items', { name, status })
        if (checkApiResponse(response)) {
            const { item } = response
            console.log(item)
            setStep(3)
            setItemData(item)
            return
        }
        alert(response.error)
    };

    const handlePreview = () => {
        setPreviewData(itemData);
        setStep(4);
    };

    const handleEdit = () => {
        setStep(2);
    };

    const handleListItems = () => {
        // Fetch and set items from the server
        const fetchedItems = []; // Replace with actual API call
        setItems(fetchedItems);
        setStep(4);
    };

    const handleAddMoreItems = () => {
        setStep(2);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setStep(1);
        setLoginError(false);
        setUserData(null);
        setItemData({ name: '', state: '' });
        setPreviewData(null);
        setItems([]);
    };
    const checkUserStatus = () => {
        const token = localStorage.getItem(JWT_TOKEN)
        if (token) {
            setStep(2)
            setLoggedIn(true);
        }
    }
    const handleDelete = () => { }
    useEffect(() => {
        checkUserStatus()
    }, [])
    return (
        <div className="wizard-container">
            <WizardHeader activeStep={step} />
            {step === 1 && !loggedIn && (
                <LoginForm onSubmit={handleLoginSubmit} loginError={loginError} />
            )}
            {step === 2 && loggedIn && (
                <ItemForm onSubmit={handleItemSubmit} onCancel={handleLogout} />
            )}
            {step === 3 && loggedIn && (
                <Preview
                    itemData={itemData}
                    setStep={setStep}
                />
            )}
            {step === 4 && loggedIn && (
                <ItemList
                    items={items}
                    handleListItems={handleListItems}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    onAddMoreItems={handleAddMoreItems}
                    onLogout={handleLogout}
                />
            )}
        </div>
    );
};

export default WizardComponent;
