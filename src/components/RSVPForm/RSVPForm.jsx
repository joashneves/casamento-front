import React, { useState } from 'react';
import styles from './RSVPForm.module.css';

function RSVPForm() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');

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
          <div className={styles['radio-group']}>
            <input
              type="radio"
              id="attendingYes"
              name="attending"
              value="yes"
              checked={attending === 'yes'}
              onChange={(e) => setAttending(e.target.value)}
              required
            />
            <label htmlFor="attendingYes">Sim, com certeza!</label>

            <input
              type="radio"
              id="attendingNo"
              name="attending"
              value="no"
              checked={attending === 'no'}
              onChange={(e) => setAttending(e.target.value)}
              required
            />
            <label htmlFor="attendingNo">Não poderei ir.</label>
          </div>
        </div>

        {attending === 'yes' && (
          <div className={styles['form-group']}>
            <label htmlFor="guests">Quantos convidados (incluindo você)?</label>
            <input
              type="number"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value, 10))}
              min="1"
              required
            />
          </div>
        )}

        <div className={styles['form-group']}>
          <label htmlFor="message">Deixe uma mensagem para os noivos:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
          ></textarea>
        </div>

        <button type="submit">Enviar RSVP</button>
      </form>
    </section>
  );
}

export default RSVPForm;