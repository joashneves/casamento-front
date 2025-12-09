import React from 'react';
import styles from './EventInfo.module.css';
import imagem from '../../../../public/convite.png';

function EventInfo() {
  return (
    <div className={styles.info}>
      <h3>Seja bem vindo!</h3>
      <img src={imagem} alt="imagem de casamento" className={styles.image} />
    </div>
  );
}

export default EventInfo;
