import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import Header from './Header';
import Footer from './Footer';
import './Cards.css'

function Cards() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/flashCards')
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
            <Header />

            <div className="flashcard-list">
                {cards.map(card => (
                    <Flashcard key={card.id} card={card} />
                ))}
            </div>

            <Footer />
        </>
    );
}

export default Cards;