import React from 'react';
import styles from './EventInfoPadrinhos.module.css';
import imagem from '../../../../public/convite.png';

function EventInfoPadrinhos() {
  return (
    <div className={styles.info}>
      <h3>Queridos Padrinhos,</h3>
      <p>É com uma alegria imensa que convidamos vocês para serem nossos padrinhos de casamento. A sua presença neste dia tão especial é o maior presente que poderíamos receber.</p>
      <img src={imagem} alt="imagem de casamento" className={styles.image} />
    </div>
  );
}

export default EventInfoPadrinhos;
