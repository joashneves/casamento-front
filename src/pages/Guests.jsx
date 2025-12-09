import React, { useState, useEffect } from 'react';

import styles from './Guests.module.css'; // Import the CSS module
import GuestTable from '../components/GuestTable/GuestTable';

function Guests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/api/rsvps");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGuests(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  if (loading) {
    return <div className={styles.guestsContainer}>Carregando convidados...</div>;
  }

  if (error) {
    return <div className={`${styles.guestsContainer} ${styles.errorMessage}`}>Erro ao carregar convidados: {error.message}</div>;
  }

  return (
    <div className={styles.guestsContainer}>
      <h2 className={styles.tableTitle}>Lista de Convidados</h2>
      {guests.length === 0 ? (
        <p>Nenhum convidado registrado ainda.</p>
      ) : (
        <GuestTable guests={guests} />
      )}
    </div>
  );
}

export default Guests;