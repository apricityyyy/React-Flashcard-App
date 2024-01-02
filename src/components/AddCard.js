import { useState } from 'react';

export default function AddCard({ onAddCard, editingCard }) {
    const [frontType, setFrontType] = useState(editingCard?.front.type || 'text');
    const [frontContent, setFrontContent] = useState(editingCard?.front.content || '');
    const [backContent, setBackContent] = useState(editingCard?.back.content || '');
    const [imageFile, setImageFile] = useState(null);
    const [status, setStatus] = useState(editingCard?.status || 'Noted');

    const handleSubmit = () => {
        const newCard = {
            front: {
                type: frontType,
                content: frontType === 'text' ? frontContent : undefined,
                url: frontType === 'image' ? imageFile.name : undefined
            },
            back: {
                type: "text", // Assuming the back is always text
                content: backContent
            },
            lastModified: new Date().toISOString(),
            status: status
        };

        if (frontType === 'image') {
            const formData = new FormData();
            formData.append('image', imageFile);
            // Add other card details as JSON string
            formData.append('cardData', JSON.stringify(newCard));
            onAddCard(formData, true); // Indicate that this is a FormData submission
        } else {
            onAddCard(newCard, false); // Regular JSON submission
        }

        // Reset fields
        setFrontContent('');
        setBackContent('');
        setImageFile(null);
        setStatus('Noted');
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <>
            <div className='frontInput'>
                <label>
                    <input
                        type="radio"
                        value="text"
                        checked={frontType === 'text'}
                        onChange={() => setFrontType('text')}
                    />
                    Text/Question
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

            {frontType === 'text' ? (
                <input
                    placeholder="Add text content or a question"
                    value={frontContent}
                    onChange={e => setFrontContent(e.target.value)}
                />
            ) : (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            )}

            <div className='backInput'>
                <input
                    placeholder="Answer, information about the text, image, or anything to remember"
                    value={backContent}
                    onChange={e => setBackContent(e.target.value)}
                />
            </div>

            <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="Learned">Learned</option>
                <option value="Want to Learn">Want to Learn</option>
                <option value="Noted">Noted</option>
            </select>

            <button onClick={handleSubmit}>Add</button>
        </>
    );
}