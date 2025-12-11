import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import Header from '../components/Header/Header';
import EventDetailsPadrinhos from '../components/EventDetails/Padrinhos/EventDetailsPadrinhos';
import ClothingSuggestions from '../components/ClothingSuggestions/ClothingSuggestions';
import RSVPForm from '../components/RSVPForm/RSVPForm';
import Footer from '../components/Footer/Footer';
import '../App.css'; // This might need to be moved or adjusted later if App.css is global
import "primereact/resources/themes/lara-light-cyan/theme.css";

import 'primeicons/primeicons.css';
        
import { Button } from 'primereact/button';
import { Presente } from '../components/Presentes/Presentes';

function Padrinhos() {
  const [isRsvpFormVisible, setIsRsvpFormVisible] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);
  const rsvpFormRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Confetti will be visible for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsRsvpFormVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (rsvpFormRef.current) {
      observer.observe(rsvpFormRef.current);
    }

    return () => {
      if (rsvpFormRef.current) {
        observer.unobserve(rsvpFormRef.current);
      }
    };
  }, []);

  return (
    <div className="App">
      {showConfetti && <Confetti  colors={["#e93d3dff", "#fd5353ff"]} />}
      <main>
        <EventDetailsPadrinhos />
        <div ref={rsvpFormRef}>
          <RSVPForm />
        </div>
      </main>

    </div>
  );
}

export default Padrinhos;
