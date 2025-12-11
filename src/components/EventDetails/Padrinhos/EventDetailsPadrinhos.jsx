import React from 'react';
import styles from '../EventDetails.module.css';
import EventInfoPadrinhos from './EventInfoPadrinhos';
import EventHora from '../EventHora/EventHora';
import EventMap from '../EventMap/EventMap';
import ClothingSuggestions from '../../ClothingSuggestions/ClothingSuggestions';
import { EventHoraPadrinhos } from '../EventHoraPadrinhos/EventHoraPadrinhos';

function EventDetailsPadrinhos() {
  return (
    <section className={styles['event-details']}>
      <EventInfoPadrinhos />
      <EventHoraPadrinhos />
      <ClothingSuggestions />
      <EventMap />
    </section>
  );
}

export default EventDetailsPadrinhos;
