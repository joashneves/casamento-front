import React from 'react';
import styles from './EventHora.module.css';
import calendario from '../../../../public/calendario.png';

function EventHora() {
  return (
    <div className={styles.info}>
      <h3><i className="pi pi-clock" style={{ fontSize: '1rem' }}></i>  Horário e dia</h3>
      <p><strong> Hora: </strong> 15:00</p>
      <p><i className="pi pi-calendar-clock" style={{ fontSize: '1rem' }}></i><strong> Data: </strong> 28 de Fevereiro de 2026</p>
      <img src={calendario} alt='calendario' className={styles.calendario}/>
    </div>
  );
}

export default EventHora;