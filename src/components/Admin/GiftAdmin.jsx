import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuth } from '../../context/AuthContext';
import { truncateText } from '../../utils/textUtils'; // Import truncateText
import styles from './Admin.module.css';
import { Tooltip } from 'primereact/tooltip';

function GiftAdmin() {
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
    const [newGift, setNewGift] = useState({ name: '', price: null, link: '', image_url: '' }); // Updated
    
    const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
    const [editingGift, setEditingGift] = useState(null);

    const { auth } = useAuth();

    const fetchGifts = async () => {
        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/api/gifts");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setGifts(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGifts();
    }, []);

    // --- Add Gift Logic ---
    const handleAddGiftSubmit = async () => {
        if (!newGift.name) {
            alert('O nome do presente é obrigatório.');
            return;
        }
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/gifts`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${auth}`
                },
                body: JSON.stringify(newGift),
            });
            setIsAddDialogVisible(false);
            setNewGift({ name: '', price: null, link: '', image_url: '' }); // Updated
            fetchGifts();
        } catch (err) {
            console.error(err);
        }
    };
    
    const handleNewGiftChange = (e) => {
        const { name, value } = e.target;
        setNewGift(prev => ({ ...prev, [name]: value }));
    };
    
    const handleNewPriceChange = (e) => {
        setNewGift(prev => ({ ...prev, price: e.value }));
    };

    // --- Edit Gift Logic ---
    const handleEditClick = (gift) => {
        setEditingGift({ ...gift }); // Clone to avoid direct state mutation
        setIsEditDialogVisible(true);
    };

    const handleEditGiftSubmit = async () => {
        if (!editingGift || !editingGift.name) {
            alert('O nome do presente é obrigatório.');
            return;
        }
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/gifts/${editingGift.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${auth}`
                },
                body: JSON.stringify(editingGift),
            });
            setIsEditDialogVisible(false);
            setEditingGift(null);
            fetchGifts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditGiftChange = (e) => {
        const { name, value } = e.target;
        setEditingGift(prev => ({ ...prev, [name]: value }));
    };

    const handleEditPriceChange = (e) => {
        setEditingGift(prev => ({ ...prev, price: e.value }));
    };

    // --- Delete Gift Logic ---
    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que quer deletar este presente?")) return;
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/gifts/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Basic ${auth}` },
            });
            fetchGifts();
        } catch (err) {
            console.error(err);
        }
    };

    // --- Dialog Footers ---
    const addDialogFooter = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setIsAddDialogVisible(false)} className="p-button-text" />
            <Button label="Adicionar" icon="pi pi-plus" onClick={handleAddGiftSubmit} autoFocus />
        </div>
    );

    const editDialogFooter = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setIsEditDialogVisible(false)} className="p-button-text" />
            <Button label="Salvar" icon="pi pi-check" onClick={handleEditGiftSubmit} autoFocus />
        </div>
    );
    
    // --- Table Action Template ---
    const actionBodyTemplate = (rowData) => {
        return (
            <div style={{display: 'flex', gap: '0.5rem'}}>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => handleEditClick(rowData)} tooltip="Editar" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDelete(rowData.id)} tooltip="Deletar" />
            </div>
        );
    };
    
    // Name body template with truncation and tooltip
    const nameBodyTemplate = (rowData) => {
        const truncatedName = truncateText(rowData.name, 25); // Truncate to 25 chars
        return (
            <>
                <span className="tooltip-target" data-pr-tooltip={rowData.name}>
                    {truncatedName}
                </span>
                <Tooltip target=".tooltip-target" />
            </>
        );
    };

    return (
        <div className={styles.adminSection}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>Gerenciar Presentes</h2>
                <Button label="Adicionar Presente" icon="pi pi-plus" onClick={() => setIsAddDialogVisible(true)} />
            </div>
            
            <DataTable value={gifts} loading={loading} stripedRows paginator rows={10} emptyMessage="Nenhum presente encontrado.">
                <Column field="name" header="Nome" body={nameBodyTemplate} sortable filter filterPlaceholder="Buscar por nome"></Column> {/* Updated */}
                <Column field="price" header="Preço" body={(rowData) => rowData.price ? `R$ ${rowData.price.toFixed(2)}` : ''} sortable></Column>
                <Column field="link" header="Link"></Column>
                <Column field="image_url" header="URL da Imagem"></Column> {/* New column */}
                <Column field="is_gifted" header="Presenteado" body={(rowData) => rowData.is_gifted ? `Sim (${rowData.donor_name})` : 'Não'} sortable></Column>
                <Column header="Ações" body={actionBodyTemplate}></Column>
            </DataTable>

            {/* Add Dialog */}
            <Dialog header="Adicionar Novo Presente" visible={isAddDialogVisible} style={{ width: '40vw' }} footer={addDialogFooter} onHide={() => setIsAddDialogVisible(false)}>
                <div className="p-fluid">
                    <div className="p-field p-mb-3">
                        <label htmlFor="name">Nome do Presente</label>
                        <InputText id="name" name="name" value={newGift.name} onChange={handleNewGiftChange} />
                    </div>
                    <div className="p-field p-mb-3">
                        <label htmlFor="price">Preço (R$)</label>
                        <InputNumber id="price" value={newGift.price} onValueChange={handleNewPriceChange} mode="decimal" minFractionDigits={2} maxFractionDigits={2} />
                    </div>
                    <div className="p-field p-mb-3">
                        <label htmlFor="link">Link da Loja</label>
                        <InputText id="link" name="link" value={newGift.link} onChange={handleNewGiftChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="image_url">URL da Imagem</label> {/* New input */}
                        <InputText id="image_url" name="image_url" value={newGift.image_url} onChange={handleNewGiftChange} />
                    </div>
                </div>
            </Dialog>

            {/* Edit Dialog */}
            {editingGift && (
                <Dialog header="Editar Presente" visible={isEditDialogVisible} style={{ width: '40vw' }} footer={editDialogFooter} onHide={() => setIsEditDialogVisible(false)}>
                    <div className="p-fluid">
                        <div className="p-field p-mb-3">
                            <label htmlFor="edit-name">Nome do Presente</label>
                            <InputText id="edit-name" name="name" value={editingGift.name} onChange={handleEditGiftChange} />
                        </div>
                        <div className="p-field p-mb-3">
                            <label htmlFor="edit-price">Preço (R$)</label>
                            <InputNumber id="edit-price" value={editingGift.price} onValueChange={handleEditPriceChange} mode="decimal" minFractionDigits={2} maxFractionDigits={2} />
                        </div>
                        <div className="p-field p-mb-3">
                            <label htmlFor="edit-link">Link da Loja</label>
                            <InputText id="edit-link" name="link" value={editingGift.link} onChange={handleEditGiftChange} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="edit-image_url">URL da Imagem</label> {/* New input */}
                            <InputText id="edit-image_url" name="image_url" value={editingGift.image_url} onChange={handleEditGiftChange} />
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    );
}

export default GiftAdmin;
