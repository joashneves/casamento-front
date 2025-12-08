import React from 'react';
import styles from './EventHora.module.css';

function EventHora() {
  return (
    <div className={styles.info}>
      <h3>Horario e dia</h3>
      <p><strong>Hora : </strong> 16:00</p>
      <p><strong>Data : </strong> 28 de Fevereiro de 2026</p>
    </div>
  );
}

export default EventHora;