import React, { useState, useEffect, useReducer } from 'react';
import Flashcard from './Flashcard';
import Header from './Header';
import Footer from './Footer';
import './Cards.css'
import AddCard from './AddCard';

function cardsReducer(tasks, action) {
    switch (action.type) {
        case 'added': {
            return [...tasks, {
                id: action.id,
                text: action.text,
                done: false
            }];
        }
        case 'changed': {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

function Cards() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch('http://localhost:5000/flashCards', {
            signal: signal
        })
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error fetching data:', error));

        return () => {
            // cancel the request before component unmounts
            controller.abort();
        };
    }, []);

    const [notes, dispatch] = useReducer(
        cardsReducer,
        cards
    );

    function handleAddCard(content) {
        dispatch({
            type: 'added',
            id: nextId++,
            content: content,
        });
    }

    function handleEditCard(card) {
        dispatch({
            type: 'edited',
            card: card
        });
    }

    function handleDeleteCard(cardId) {
        dispatch({
            type: 'deleted',
            id: cardId
        });
    }

    return (
        <>
            <Header />

            <AddCard
                onAddCard={handleAddCard}
            />

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