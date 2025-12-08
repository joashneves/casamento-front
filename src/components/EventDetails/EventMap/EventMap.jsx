import React from 'react';
import styles from './EventMap.module.css';

function EventMap() {
  return (
    <div className={styles.mapContainer}>
      <h3>Localidade</h3>
       <p><strong>Local:</strong> Rancho kennedy</p>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3704.937719391062!2d-41.10153362386296!3d-21.13709027981541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb94d35d89c5117%3A0x27781fa17da98201!2sRancho%20Kennedy!5e0!3m2!1spt-BR!2sbr!4v1678886482593!5m2!1spt-BR!2sbr" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}

export default EventMap;