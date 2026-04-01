import React from 'react';
import './App.css';

function App() {
  return (
    <div style={{
      backgroundColor: '#faf8f5'
    }}>
      <header style={{
        background: 'linear-gradient(135deg, #c97d4c, #a85e3a)',
        color: '#2c2416'
      }}>
        <h1>Welcome to the Website</h1>
      </header>
      <main>
        <p style={{ color: '#2c2416' }}>This is the main content area with warm tones.</p>
        <section>
          <h2 style={{ color: '#2c2416' }}>About Us</h2>
        </section>
      </main>
    </div>
  );
}

export default App;