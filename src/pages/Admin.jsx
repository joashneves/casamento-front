import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import GuestAdmin from '../components/Admin/GuestAdmin';
import GiftAdmin from '../components/Admin/GiftAdmin';
import styles from './Admin.module.css';

function Admin() {
    const { isLoggedIn, logout } = useAuth();

    if (!isLoggedIn) {
        return <LoginForm />;
    }

    return (
        <div className={styles.adminContainer}>
            <div className={styles.header}>
                <h1>Painel Administrativo</h1>
                <Button label="Logout" icon="pi pi-sign-out" onClick={logout} className="p-button-danger" />
            </div>
            
            <TabView>
                <TabPanel header="Gerenciar Convidados">
                    <GuestAdmin />
                </TabPanel>
                <TabPanel header="Gerenciar Presentes">
                    <GiftAdmin />
                </TabPanel>
            </TabView>
        </div>
    );
}

export default Admin;
