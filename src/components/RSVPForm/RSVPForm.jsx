import React, { useState } from 'react';
import styles from './RSVPForm.module.css';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
        

function RSVPForm() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [ingredient, setIngredient] = useState('');

  const [loading, setLoading] = useState(false);


   const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For a real application, you would send this data to a backend server.
    // For this template, we'll just log it.
    console.log({
      name,
      attending,
      guests,
      message,
    });
    alert('Obrigado por seu RSVP! (Este é um formulário de exemplo)');
    // Reset form
    setName('');
    setAttending('');
    setGuests(1);
    setMessage('');
  };

  return (
    <section className={styles['rsvp-form']}>
      <h2>Confirme sua Presença</h2>
      <p>Por favor, responda até 31 de janeiro de 2026</p>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="name">Seu Nome Completo:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles['form-group']}>
          <label>Você irá comparecer?</label>
            <div className={styles.checkbox}>
 
              <div className="flex align-items-center">
                <label htmlFor="sim" className="ml-2"> <RadioButton inputId="sim" name="sim" value="sim"  onChange={(e) => setIngredient(e.value)} checked={ingredient === 'sim'} /> Sim, irei!</label>
               
              </div>
              <div className="flex align-items-center">
                <label htmlFor="nao" className="ml-2"> <RadioButton inputId="nao" name="nao" value="nao"  onChange={(e) => setIngredient(e.value)} checked={ingredient === 'nao'} /> Não poderei comparecer</label>
              </div>

          </div>
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="message">Deixe uma mensagem para os noivos:</label>
          <i>Opcional</i>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            maxlength="365"
          ></textarea>
        </div>

        <Button label="Submit" icon="pi pi-check" loading={loading} onClick={load} />

      </form>
    </section>
  );
}

export default RSVPForm;