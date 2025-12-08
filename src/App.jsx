import React from 'react';
import Header from './components/Header/Header';
import EventDetails from './components/EventDetails/EventDetails';
import RSVPForm from './components/RSVPForm/RSVPForm';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <EventDetails />
        <RSVPForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
