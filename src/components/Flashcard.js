import React, { useState } from 'react';

function Flashcard({ card, onEdit, onDelete, onSelect, isSelected, onDragStart, onDragOver }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => setIsFlipped(!isFlipped);

    const renderCardContent = (cardSide) => {
        if (cardSide.type === "text" || cardSide.type === "question") {
            return (
                <h3>{cardSide.content}</h3>
            )
        } else if (cardSide.content) {
            try {
                return (
                    <>
                        <h3>What does below image indicate?</h3>
                        <img src={cardSide.content.includes('http') ? cardSide.content : require(`../assets/images/${cardSide.content}`)} alt={card.id} />
                    </>
                )
            } catch {
                console.log("Image not found");
            }
        } else {
            console.log("No image available");
        }
    };

    function formatDateTime(isoString) {
        const date = new Date(isoString);
        return date.toLocaleString(); // Converts to a string using the local timezone
    }

    return (
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}
            onClick={flipCard}
            draggable="true"
            onDragStart={(e) => onDragStart(e, card.id)}
            onDragOver={(e) => e.preventDefault()}
            data-id={card.id}
        >
            <input
                type="checkbox"
                checked={isSelected}
                onClick={(e) => { e.stopPropagation(); }}
                onChange={() => onSelect(card.id)}
            />

            <div className="flashcard-inner">
                <div className="flashcard-front">
                    {renderCardContent(card.front)}
                </div>
                <div className="flashcard-back">
                    {renderCardContent(card.back)}
                </div>

                <div className='date-and-status'>
                    <p className="status">{card.status}</p>
                    <p className="last-modified">{formatDateTime(card.lastModified)}</p>
                </div>
            </div>

            <div className='flashcard-buttons'>
                <button className='flashcard-inner-button' onClick={(e) => { e.stopPropagation(); onEdit(card) }}>Edit</button>
                <button className='flashcard-inner-button' onClick={(e) => { e.stopPropagation(); onDelete(card.id) }}>Delete</button>
            </div>
        </div >
    );
}

export default Flashcard;