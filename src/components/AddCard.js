import { useState } from 'react';

export default function AddCard({ onAddCard, editingCard, onEditCard }) {
    const [frontType, setFrontType] = useState(editingCard?.front.type || 'text');
    const [frontContent, setFrontContent] = useState(editingCard?.front.content || '');
    const [backContent, setBackContent] = useState(editingCard?.back.content || '');
    const [file, setFile] = useState('');
    const [status, setStatus] = useState(editingCard?.status || 'Noted');

    const handleSubmit = () => {
        // Validation logic
        if (frontType === 'text' && frontContent.trim() === '') {
            alert('Please enter front content.');
            return; // Prevent form submission
        }

        if (backContent.trim() === '') {
            alert('Please enter back content.');
            return; // Prevent form submission
        }

        if (frontType === 'image' && !file) {
            alert('Please upload an image.');
            return; // Prevent form submission
        }

        const newCard = {
            front: {
                type: frontType,
                content: frontType === 'image' ? file : frontContent
            },
            back: {
                type: "text",
                content: backContent
            },
            lastModified: new Date().toISOString(),
            status: status
        };

        // onAddCard(newCard)
        if (editingCard === null) {
            onAddCard(newCard);
        } else {
            newCard.id = editingCard.id;
            onEditCard(newCard);
        }

        // Reset fields
        setFrontType('text');
        setFrontContent('');
        setBackContent('');
        setFile('');
        setStatus('Noted');
    };

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        console.log(file)
    }

    let buttonText = editingCard === null ? "Add" : "Edit";

    return (
        <div className='add-card'>
            <div className='frontType'>
                <label>
                    <input
                        type="radio"
                        value="text"
                        checked={frontType === 'text'}
                        onChange={() => setFrontType('text')}
                    />
                    Text
                </label>
                <label>
                    <input
                        type="radio"
                        value="question"
                        checked={frontType === 'question'}
                        onChange={() => setFrontType('question')}
                    />
                    Question
                </label>
                <label>
                    <input
                        type="radio"
                        value="image"
                        checked={frontType === 'image'}
                        onChange={() => setFrontType('image')}
                    />
                    Image
                </label>
            </div>

            <div className='frontInput'>
                {frontType === 'text' ? (
                    <input
                        placeholder="Add text content"
                        value={frontContent}
                        onChange={e => setFrontContent(e.target.value)}
                    />
                ) : (frontType === 'question' ? (
                    <input
                        placeholder="Add a question"
                        value={frontContent}
                        onChange={e => setFrontContent(e.target.value)}
                    />
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                    />
                ))}
            </div>

            <div className='backInput'>
                <input
                    placeholder="Answer, information about the text, image, or anything to remember"
                    value={backContent}
                    onChange={e => setBackContent(e.target.value)}
                />
            </div>

            <div className='status-dropdown'>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="Learned">Learned</option>
                    <option value="Want to Learn">Want to Learn</option>
                    <option value="Noted">Noted</option>
                </select>
            </div>

            <div className='button-container'>
                <button onClick={handleSubmit}>{buttonText}</button>
            </div>
        </div>
    );
}