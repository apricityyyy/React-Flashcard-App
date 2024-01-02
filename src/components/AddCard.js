import { useState } from 'react';

export default function AddCard({ onAddCard, editingCard }) {
    const [frontType, setFrontType] = useState(editingCard?.type || 'text');
    const [frontContent, setFrontContent] = useState(editingCard?.front.content || '');
    const [backContent, setBackContent] = useState(editingCard?.back.content || '');
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = () => {
        // Create a FormData object to send the file
        // Properties: { frontType, frontContent, backContent, lastModified, status }

        const formData = new FormData();
        if (frontType === 'text') {
            if (textContent.endsWith('?')) {
                formData.append('frontType', 'question')
            } else {
                formData.append('frontType', 'text')
            }

            formData.append('frontContent', frontContent);
        } else {
            formData.append('frontType', frontType)
            formData.append('frontContent', imageFile);
            console.log(imageFile)
        }

        formData.append('backContent', backContent)

        const currentDateTime = new Date().toISOString();
        formData.append('lastModified', currentDateTime);

        onAddCard(formData); // Assuming onAddCard can handle FormData

        // Reset fields
        setFrontContent('');
        setBackContent('');
        setImageFile(null);
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <>
            <div class='frontInput'>
                <label>
                    <input
                        type="radio"
                        value="text"
                        checked={cardType === 'text'}
                        onChange={() => setFrontType('text')}
                    />
                    Text/Question
                </label>
                <label>
                    <input
                        type="radio"
                        value="image"
                        checked={cardType === 'image'}
                        onChange={() => setFrontType('image')}
                    />
                    Image
                </label>
            </div>

            {cardType === 'text' ? (
                <input
                    placeholder="Add text content or a question"
                    value={textContent}
                    onChange={e => setFrontContent(e.target.value)}
                />
            ) : (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            )}

            <div class='backInput'>
                <input
                    placeholder="Answer, information about the text, image, or anything to remember"
                    value={textContent}
                    onChange={e => setBackContent(e.target.value)}
                />
            </div>

            <button onClick={handleSubmit}>Add</button>
        </>
    );
}