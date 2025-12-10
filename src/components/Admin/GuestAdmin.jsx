import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuth } from '../../context/AuthContext';
import styles from './Admin.module.css';

function GuestAdmin() {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { auth } = useAuth();

    const fetchGuests = async () => {
        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/api/rsvps");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setGuests(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuests();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que quer deletar este convidado?")) return;
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/rsvps/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Basic ${auth}` },
            });
            fetchGuests();
        } catch (err) {
            console.error(err);
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button 
                icon="pi pi-trash" 
                className="p-button-rounded p-button-danger" 
                onClick={() => handleDelete(rowData.id)} 
            />
        );
    };

    const attendingBodyTemplate = (rowData) => {
        return rowData.attending ? 'Confirmada' : 'Não Irá';
    };

    const timestampBodyTemplate = (rowData) => {
        return new Date(rowData.timestamp).toLocaleString();
    };

    return (
        <div className={styles.adminSection}>
            <h2>Gerenciar Convidados</h2>
            <DataTable value={guests} loading={loading} stripedRows paginator rows={10} emptyMessage="Nenhum convidado encontrado.">
                <Column field="name" header="Nome" sortable filter filterPlaceholder="Buscar por nome"></Column>
                <Column field="attending" header="Presença" body={attendingBodyTemplate} sortable></Column>
                <Column field="message" header="Mensagem"></Column>
                <Column field="timestamp" header="Registrado Em" body={timestampBodyTemplate} sortable></Column>
                <Column header="Ações" body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
    );
}

export default GuestAdmin;
