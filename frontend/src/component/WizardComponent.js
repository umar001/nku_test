import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LoginForm from './LoginForm';
import ItemForm from './ItemForm';
import Preview from './Preview';
import ItemList from './ItemList';
import WizardHeader from './WizardHeader';
import { fetchData, storeData } from '../lib/apiHelper';
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

    const handleLoginSubmit = async (values) => {
        const { email, password } = values;

        const response = await storeData('auth/login', { email, password });

        if (checkApiResponse(response)) {
            const { token } = response;
            localStorage.setItem(JWT_TOKEN, token);
            setLoggedIn(true);
            setStep(2);
            setLoginError(false);
            setUserData({ email });
        } else {
            setLoginError(true);
        }
    };

    const handleItemSubmit = async (values) => {
        const { name, status } = values;
        const response = await storeData('items', { name, status });

        if (checkApiResponse(response)) {
            const { item } = response;
            console.log(item);
            setStep(3);
            setItemData(item);
        } else {
            alert(response.error);
        }
    };

    const handlePreview = () => {
        setPreviewData(itemData);
        setStep(4);
    };

    const handleEdit = () => {
        setStep(2);
    };

    const handleListItems = useCallback(async () => {
        const response = await fetchData('items')
        console.log('a')

        if (checkApiResponse(response)) {
            const { items } = response
            setItems(items);
            setStep(4);
            return
        }
        alert(response.error)
    }, []);

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
        const token = localStorage.getItem(JWT_TOKEN);
        if (token) {
            setStep(2);
            setLoggedIn(true);
        }
    };

    const onLogout = () => {
        localStorage.clear()
        checkUserStatus()
    }

    useEffect(() => {
        checkUserStatus();
    }, []);

    const loginForm = useMemo(() => (
        <LoginForm onSubmit={handleLoginSubmit} loginError={loginError} />
    ), [loginError]);

    const itemForm = useMemo(() => (
        <ItemForm onSubmit={handleItemSubmit} onCancel={handleLogout} />
    ), []);

    const previewComponent = useMemo(() => (
        <Preview
            itemData={itemData}
            onEdit={handleEdit}
            setStep={setStep}
        />
    ), [itemData]);

    const itemList = useMemo(() => (
        <ItemList
            items={items}
            onAddMoreItems={handleAddMoreItems}
            onLogout={handleLogout}
            handleListItems={handleListItems}
        />
    ), [items]);



    return (
        <div className="wizard-container">
            <WizardHeader activeStep={step} />
            {step === 1 && !loggedIn && loginForm}
            {step === 2 && loggedIn && itemForm}
            {step === 3 && loggedIn && previewComponent}
            {step === 4 && loggedIn && itemList}
        </div>
    );
};

export default WizardComponent;
