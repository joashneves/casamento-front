import React from 'react';
import styles from './EventDetails.module.css';
import EventInfo from './EventInfo/EventInfo';
import EventMap from './EventMap/EventMap';
import EventHora from './EventHora/EventHora';

function EventDetails() {
  return (
    <section className={styles['event-details']}>
      <h2>Detalhes do Evento</h2>
      <EventInfo/>
      <EventHora/>
      <EventMap/>
    </section>
  );
}

export default EventDetails;