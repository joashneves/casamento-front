import React from 'react';
import styles from './ClothingSuggestions.module.css';
import { Bloco } from './Bloco/Bloco';

function ClothingSuggestions() {
  return (
    <div className={styles.suggestions}>
      <div className={styles.ClothingSuggestions}>
      <h3>Escolha de Trajes</h3>
      <p><strong>Para os padrinhos,</strong> sugerimos calça cinza claro e camisa branca social de manga longa.</p>
            <div className={styles.coresContainer}>
        <Bloco color="#ebebebff"/>
        
        <Bloco color="#b5b6b6ff"/>
      </div>

      <p><strong>Para as madrinhas,</strong> vestido em algum do tons abaixo.</p>

      <div className={styles.coresContainer}>
        <Bloco color="#0c7bc3"/>
        
        <Bloco color="#5fa6da"/>
        
        <Bloco color="#93c4e5"/>
        
        <Bloco color="#37c9ee"/>
        
        <Bloco color="#91e2f7"/>
      </div>
      </div>
    </div>
  );
}

export default ClothingSuggestions;
