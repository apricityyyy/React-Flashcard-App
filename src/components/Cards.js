import React, { useState, useEffect, useReducer } from 'react';
import Flashcard from './Flashcard';
import Header from './Header';
import Footer from './Footer';
import './Cards.css'
import AddCard from './AddCard';
import PopUp from './PopUp';

function cardsReducer(cards, action) {
    switch (action.type) {
        case 'init': {
            return action.cards; // Initialize the state with fetched cards
        }
        case 'added': {
            return [...cards, {
                id: action.card.id,
                front: {
                    type: action.card.front.type,
                    content: action.card.front.content
                },
                back: {
                    type: "text",
                    content: action.card.back.content
                },
                lastModified: action.card.lastModified,
                status: action.card.status
            }];
        }
        case 'edited': {
            return cards.map(t => {
                if (t.id === action.card.id) {
                    return action.card;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return cards.filter(c => c.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

let nextId = 11;

function Cards() {
    /*Get Cards*/
    const [cards, dispatch] = useReducer(cardsReducer, []);

    useEffect(() => {
        fetch('http://localhost:5000/flashCards')
            .then(response => response.json())
            .then(data => dispatch({ type: 'init', cards: data }))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    /*Add/Edit/Delete Card*/
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [editingCard, setEditingCard] = useState(null);

    const handleOpenPopUp = (card = null) => {
        setEditingCard(card);
        setIsPopUpOpen(true);
    };

    const handleClosePopUp = () => {
        setIsPopUpOpen(false);
        setEditingCard(null);
    };

    function handleAddCard(cardData, isFormData) {
        // Prepare the requestOptions
        const requestOptions = {
            method: 'POST',
            headers: isFormData ? {} : { 'Content-Type': 'application/json' },
            body: isFormData ? cardData : JSON.stringify(cardData)
        };
    
        // Make the fetch request to add the card
        fetch('http://localhost:5000/flashCards', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Assuming 'data' contains the added card; update the state
                    dispatch({ type: 'added', card: data });
                }
            })
            .catch(error => console.error('Error adding card:', error));
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

            <div className="flashcard-list">
                {cards.map(card => (
                    <Flashcard key={card.id} card={card} /*onEdit={() => handleOpenPopUp(card)} onDelete={handleDeleteCard}*/ />
                ))}
            </div>

            <div className='add-or-edit-card'>
                <button onClick={() => handleOpenPopUp()}>Add New Card</button>
                <PopUp isOpen={isPopUpOpen} onClose={handleClosePopUp}>
                    <AddCard onAddCard={handleAddCard} editingCard={editingCard} />
                </PopUp>
            </div>

            <Footer />
        </>
    );
}

export default Cards;