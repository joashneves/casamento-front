import React from 'react';
import styles from './Header.module.css';
import ring from '../../../public/ring.svg';
import rings from '../../../public/rings.png';
function Header() {
  return (
    <header className={styles.header}>
      <img src={rings} alt="aneis de casamento" className={styles.imagemRings}/>
      <h1>Nicolle Melo Dias   <img src={ring} alt="anel de casamento" className={styles.imagemRing}/>Joas Sedano das Neves</h1>
      <p>Têm a honra de lhe convidar para o seu casamento</p>
    </header>
  );
}

export default Header;