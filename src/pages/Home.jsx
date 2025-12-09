import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header/Header';
import EventDetails from '../components/EventDetails/EventDetails';
import RSVPForm from '../components/RSVPForm/RSVPForm';
import Footer from '../components/Footer/Footer';
import '../App.css'; // This might need to be moved or adjusted later if App.css is global
import "primereact/resources/themes/lara-light-cyan/theme.css";

import 'primeicons/primeicons.css';
        
import { Button } from 'primereact/button';

function Home() {
  const [isRsvpFormVisible, setIsRsvpFormVisible] = useState(true);
  const rsvpFormRef = useRef(null);

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

  const scrollToRsvp = () => {
    rsvpFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <Header />
      <main>
        <EventDetails />
        <div ref={rsvpFormRef}>
          <RSVPForm />
        </div>
      </main>
      <Footer />
      {!isRsvpFormVisible && (
        <Button
          label="Convite"
          className="p-button p-button-secondary scroll-to-rsvp-button"
          aria-label="Scroll to RSVP form"
          onClick={scrollToRsvp}
        />
      )}
    </div>
  );
}

export default Home;
