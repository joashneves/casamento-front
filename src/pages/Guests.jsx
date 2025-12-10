import React, { useState, useEffect } from 'react';
import styles from './Guests.module.css';
import GuestTable from '../components/GuestTable/GuestTable';

function Guests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/api/rsvps");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGuests(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);


  return (
    <div className={styles.guestsContainer}>
      <div className={styles.header}>
        <h2 className={styles.tableTitle}>Lista de Convidados</h2>
      </div>
      
      {loading && <p>Carregando convidados...</p>}
      
      {error && <p className={styles.errorMessage}>Erro: {error}</p>}

      {!loading && !error && (
        guests.length === 0 ? (
          <p>Nenhum convidado registrado ainda.</p>
        ) : (
          <GuestTable guests={guests} />
        )
      )}
    </div>
  );
}

export default Guests;