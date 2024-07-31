import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className='homeContents'>
    <div className='scanBox'>
        <h1>Προσομοίωση των QR που θα βρίσκονται στην συσκευασία</h1>
        <div>
            <h1>QR που κερδίζει:</h1>
            <img src='correct.png' alt=''/></div>
        <div>
        <h1>QR που χάνει:</h1>
            <img src='wrong.png' alt=''/></div>
        </div>
    </div>
  );
}

export default Home;
