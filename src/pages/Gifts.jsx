import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip'; // Import Tooltip
import { truncateText } from '../utils/textUtils'; // Import truncateText
import styles from './Gifts.module.css';

function Gifts() {
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGift, setSelectedGift] = useState(null);
    const [donorName, setDonorName] = useState('');
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const fetchGifts = async () => {
        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/api/gifts");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setGifts(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGifts();
    }, []);

    const handleClaimClick = (gift) => {
        setSelectedGift(gift);
        setIsDialogVisible(true);
        setDonorName('');
    };

    const handleClaimSubmit = async () => {
        if (!donorName) {
            alert('Por favor, insira seu nome.');
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gifts/${selectedGift.id}/claim`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ donor_name: donorName }),
            });
            if (!response.ok) throw new Error('Failed to claim gift');
            
            setIsDialogVisible(false);
            fetchGifts(); // Refresh list
        } catch (err) {
            setError(err.message);
        }
    };
    
    const dialogFooter = (
        <div className={styles.footerForm}>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setIsDialogVisible(false)} className="p-button-text" />
            <Button label="Confirmar" icon="pi pi-check" onClick={handleClaimSubmit} autoFocus />
        </div>
    );

    const giftCard = (gift) => (
        <div key={gift.id} className={`${styles.giftCard} ${gift.is_gifted ? styles.gifted : ''}`}>
            {gift.image_url && <img src={gift.image_url} alt={gift.name} className={styles.giftImage} />} {/* Display Image */}
            <div className={styles.giftIcon}><i className="pi pi-gift"></i></div>
            <h2 className="tooltip-target" data-pr-tooltip={gift.name}>
                {truncateText(gift.name, 25)} {/* Truncate Name */}
            </h2>
            <Tooltip target=".tooltip-target" />
            {gift.price && <p className={styles.price}>R$ {gift.price.toFixed(2)}</p>}
            
            {gift.is_gifted ? (
                <div className={styles.giftedOverlay}>
                    <p>Presenteado por:</p>
                    <strong>{gift.donor_name}</strong>
                </div>
            ) : (
                <>
                    {gift.link && <Button label="Ver na Loja" icon="pi pi-shopping-cart" onClick={() => window.open(gift.link, '_blank')} className="p-button-link" />}
                    {/* Removed PIX Key display */}
                    <Button label="Dar de Presente" icon="pi pi-check" onClick={() => handleClaimClick(gift)} className={`${styles.botaoDarPresente} p-mt-3`} />
                </>
            )}
        </div>
    );

    return (
        <div className={styles.giftsContainer}>
            <div className={styles.pageHeader}>
                <h1>Lista de Presentes</h1>
            </div>
            <p className={styles.subtitle}>Sua presença é o nosso maior presente, mas se desejar, pode nos presentear com um dos itens abaixo.</p>
            
            {loading && <p>Carregando...</p>}
            {error && <p className={styles.errorMessage}>Erro: {error}</p>}

            <div className={styles.giftsGrid}>
                {gifts.map(giftCard)}
            </div>

            <Dialog className={styles.dialogPop} header={`Presentear: ${selectedGift?.name}`} visible={isDialogVisible} footer={dialogFooter} onHide={() => setIsDialogVisible(false)}>
                <div className={`${styles.labelDialog} p-field`}>
                    <label htmlFor="donorName">Seu nome</label>
                    <InputText id="donorName" value={donorName} onChange={(e) => setDonorName(e.target.value)} style={{width: '100%'}}/>
                </div>
            </Dialog>
        </div>
    );
}

export default Gifts;