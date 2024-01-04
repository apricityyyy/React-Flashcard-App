import React, { useState, useEffect, useReducer, useCallback } from 'react';
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
            return cards.map(c => {
                if (c.id === action.card.id) {
                    return action.card;
                } else {
                    return c;
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

function Cards() {
    /*Get Cards*/
    const [cards, dispatch] = useReducer(cardsReducer, []);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortAttribute, setSortAttribute] = useState('lastModified');
    const [selectedCards, setSelectedCards] = useState([]);

    const fetchCards = useCallback(() => {
        let apiUrl = 'http://localhost:5000/flashCards?';

        if (searchTerm) {
            apiUrl += `&q=${encodeURIComponent(searchTerm)}`;
        }

        if (statusFilter) {
            apiUrl += `&status=${encodeURIComponent(statusFilter)}`;
        }

        if (sortAttribute === 'lastModified') {
            apiUrl += `&_sort=${encodeURIComponent(sortAttribute)}&_order=desc`;
        } else if (sortAttribute === 'lastModifiedASC') {
            apiUrl += `&_sort=lastModified&_order=asc`;
        } else if (sortAttribute) {
            apiUrl += `&_sort=${encodeURIComponent(sortAttribute)}`
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => dispatch({ type: 'init', cards: data }))
            .catch(error => console.error('Error fetching data:', error));
    }, [searchTerm, statusFilter, sortAttribute]); // Dependencies

    useEffect(() => {
        fetchCards();
    }, [fetchCards]); // Dependency array now includes fetchCards

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

    function handleAddCard(cardData) {
        // Prepare the requestOptions
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cardData)
        };

        // Make the fetch request to add the card
        fetch('http://localhost:5000/flashCards', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    dispatch({ type: 'added', card: data });
                    fetchCards();
                }
            })
            .catch(error => console.error('Error adding card:', error));
    }

    function handleEditCard(cardData) {
        // Check if cardData has an id
        if (!cardData.id) {
            console.error('Error: Card must have an ID to be edited');
            return;
        }

        // Prepare the requestOptions
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cardData)
        };

        // Make the fetch request to update the card
        fetch(`http://localhost:5000/flashCards/${cardData.id}`, requestOptions)
            .then(response => response.json())
            .then(updatedCard => {
                if (updatedCard) {
                    dispatch({ type: 'edited', card: updatedCard });
                    fetchCards();
                }
            })
            .catch(error => console.error('Error editing card:', error));
    }

    function handleDeleteCard(cardId) {
        // Check if cardId is provided
        if (!cardId) {
            console.error('Error: Card must have an ID to be deleted');
            return;
        }

        // Prepare the requestOptions
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };

        // Make the fetch request to delete the card
        fetch(`http://localhost:5000/flashCards/${cardId}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    // Update the local state if the server successfully processed the deletion
                    dispatch({ type: 'deleted', id: cardId });
                    fetchCards();
                } else {
                    console.error('Server error during card deletion');
                }
            })
            .catch(error => console.error('Error deleting card:', error));
    }

    /*Send Selected Cards*/
    const handleSelectCard = (cardId) => {
        setSelectedCards(prevSelected => {
            if (prevSelected.includes(cardId)) {
                return prevSelected.filter(id => id !== cardId);
            } else {
                return [...prevSelected, cardId];
            }
        });
    };

    const getEmailContent = () => {
        const selectedCardDetails = cards.filter(card => selectedCards.includes(card.id));
        return JSON.stringify(selectedCardDetails, null, 2);
    };

    const handleSendEmail = () => {
        const emailBody = getEmailContent();
        const mailto = `mailto:?subject=Shared Flash Cards&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailto;
    };

    /*Drag and Drop Functionality*/
    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("text/plain", id);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const draggedCardId = parseInt(e.dataTransfer.getData("text/plain"));
        const targetId = parseInt(e.target.closest(".flashcard").getAttribute("data-id"));
    
        if (draggedCardId !== targetId) {
            const draggedCard = cards.find(card => card.id === draggedCardId);
            const targetCard = cards.find(card => card.id === targetId);
    
            // Create a new array with swapped content
            const updatedCards = cards.map(card => {
                if (card.id === draggedCardId) {
                    return { ...card, front: { ...targetCard.front }, back: { ...targetCard.back }, status: targetCard.status };
                } else if (card.id === targetId) {
                    return { ...card, front: { ...draggedCard.front }, back: { ...draggedCard.back }, status: draggedCard.status };
                }
                return card;
            });
    
            dispatch({ type: 'init', cards: updatedCards });
    
            persistCardOrder(updatedCards);
        }
    };

    const persistCardOrder = (newCards) => {
        newCards.forEach(card => {
            fetch(`http://localhost:5000/flashCards/${card.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(card)
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        dispatch({ type: 'edited', card: data });
                        fetchCards();
                    }
                    console.log("Card order updated successfully:", data);
                })
                .catch(error => console.error('Error updating card order:', error));
        });
    };

    return (
        <main>
            <Header />

            <div className='cards-container'>
                <div className='search-filter-sort-select'>
                    <div className="filter-container">
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="">All Statuses</option>
                            <option value="Learned">Learned</option>
                            <option value="Want to Learn">Want to Learn</option>
                            <option value="Noted">Noted</option>
                        </select>
                    </div>

                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search cards..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="sort-container">
                        <select value={sortAttribute} onChange={(e) => setSortAttribute(e.target.value)}>
                            <option value="">Not Sorted</option>
                            <option value="lastModified">Sort by Date DESC</option>
                            <option value="lastModifiedASC">Sort by Date ASC</option>
                            <option value="front.content">Sort by Front Content</option>
                            <option value="back.content">Sort by Back Content</option>
                        </select>
                    </div>

                    <div className='share-cards'>
                        <button onClick={handleSendEmail}>Share Selected Cards</button>
                    </div>
                </div>

                <div className="flashcard-list" onDrop={handleDrop}>
                    {cards.map(card => (
                        <Flashcard
                            key={card.id}
                            card={card}
                            onEdit={() => handleOpenPopUp(card)}
                            onDelete={handleDeleteCard}
                            onSelect={handleSelectCard}
                            isSelected={selectedCards.includes(card.id)}
                            onDragStart={handleDragStart}
                            onDragOver={(e) => e.preventDefault()}
                        />
                    ))}
                </div>

                <div className='add-or-edit-card'>
                    <div className='button-container'>
                        <button onClick={() => handleOpenPopUp()}><b>Add New Card</b></button>
                    </div>

                    <PopUp isOpen={isPopUpOpen} onClose={handleClosePopUp}>
                        <AddCard onAddCard={handleAddCard} onEditCard={handleEditCard} editingCard={editingCard} />
                    </PopUp>
                </div>
            </div>

            <Footer />
        </main>
    );
}

export default Cards;