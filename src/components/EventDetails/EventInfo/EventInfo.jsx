import React from 'react';
import styles from './EventInfo.module.css';
import imagem from '../../../../public/convite.png';

function EventInfo() {
  return (
    <div className={styles.info}>
      <h3>Cerimônia e Recepção</h3>
            <img src={imagem} alt="imagem de casamento" width="600px" />
      <p><strong>Data:</strong> 28 de fevereiro de 2026</p>
      <p><strong>Hora:</strong> 16:00</p>
     
    </div>
  );
}

export default EventInfo;