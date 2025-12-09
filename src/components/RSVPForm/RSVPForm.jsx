import React, { useState } from 'react';
import styles from './RSVPForm.module.css';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import Confetti from "react-confetti";
import { useWindowSize } from 'react-use'

function RSVPForm() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [posso, setPosso] = useState('');

  const [loading, setLoading] = useState(false);

  const { width, height } = useWindowSize()

    const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // iniciar estado de loading enquanto processa o envio
    setLoading(true);
    // For a real application, you would send this data to a backend server.
    // For this template, we'll just log it.
    console.log({
      name,
      attending,
      guests,
      message,
    });
    alert('Obrigado por seu RSVP! (Este é um formulário de exemplo)');
    // Mostrar confetes se a pessoa respondeu que sim
    if (posso === 'sim') {
      setShowConfetti(true);
      // esconder depois de 5 segundos
      setTimeout(() => setShowConfetti(false), 5000);
    }

    // Reset form
    setName('');
    setAttending('');
    setGuests(1);
    setMessage('');

    // simular delay de envio e parar loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
                <label htmlFor="sim" className="ml-2"> <RadioButton inputId="sim" name="sim" value="sim"  onChange={(e) => setPosso(e.value)} checked={posso === 'sim'} /> Sim, irei!</label>
              </div>
              <div className="flex align-items-center">
                <label htmlFor="nao" className="ml-2"> <RadioButton inputId="nao" name="nao" value="nao"  onChange={(e) => setPosso(e.value)} checked={posso === 'nao'} /> Não poderei comparecer</label>
              </div>

          </div>
        </div>
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            colors={["#FFF", "#577590"]}
            numberOfPieces={300}
            gravity={0.25}
            style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
          />
        )}
        <div className={styles['form-group']}>
          <label htmlFor="message">Deixe uma mensagem para os noivos:</label>
          <i>Opcional</i>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            maxLength="365"
          ></textarea>
        </div>

        {posso ? (
          <Button
            type="submit"
            label="Enviar"
            icon="pi pi-check"
            loading={loading}
            disabled={loading}
          />
        ) : (
          <></>
        )}

      </form>

    </section>
  );
}

export default RSVPForm;