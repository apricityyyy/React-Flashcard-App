import React, { useState } from 'react';

function Flashcard({ card/*, onEdit, onDelete*/ }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => setIsFlipped(!isFlipped);

    const renderCardContent = (cardSide) => {
        if (cardSide.type === "text" || cardSide.type === "question") {
            return (
                <h3>{cardSide.content}</h3>
            )
        } else if (cardSide.url) {
            try {
                return (
                    <>
                        <h3>What does below image indicate?</h3>
                        <img src={card.front.url.includes('http') ? card.front.url : require(`../assets/images/${card.front.url}`)} alt={card.id} />
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
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
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

            {/* <button onClick={() => onEdit(card)}>Edit</button>
            <button onClick={() => onDelete(card.id)}>Delete</button> */}
        </div >
    );
}

export default Flashcard;