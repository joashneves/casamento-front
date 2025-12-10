import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(username, password);
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    
    <div className={styles.loginPage}>
      <div className={styles.cardHeader}>
        <h3>Área Restrita</h3>
    </div>
        <Card title="Admin Login" subTitle="Entre com suas credenciais" className={styles.loginCard}>
            <form onSubmit={handleLogin} className="p-fluid">
                <div className="p-field">
                    <span className="p-float-label">
                        <InputText 
                        id="username" 
                        value={username} 
                        className={styles.loginLabel}
                        onChange={(e) => setUsername(e.target.value)} 
                        />
                        <label htmlFor="username">Username</label>
                    </span>
                </div>
                <div className="p-field">
                    <span className="p-float-label">
                        <Password 
                        className={styles.loginLabel}
                        inputId="password_login"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        feedback={false} 
                        toggleMask 
                        />
                        <label htmlFor="password_login">Password</label>
                    </span>
                </div>

                {error && <Message severity="error" text={error} className="p-mt-2"/>}

                <Button 
                    type="submit" 
                    label="Login" 
                    icon="pi pi-sign-in" 
                    className="p-mt-4" 
                    loading={loading} 
                />
            </form>
        </Card>
    </div>
  );
};