import { useState } from 'react';

export default function AddCard({ onAddCard, editingCard }) {
    const [frontType, setFrontType] = useState(editingCard?.front.type || 'text');
    const [frontContent, setFrontContent] = useState(editingCard?.front.content || '');
    const [backContent, setBackContent] = useState(editingCard?.back.content || '');
    const [file, setFile] = useState('');
    const [status, setStatus] = useState(editingCard?.status || 'Noted');

    const handleSubmit = () => {
        setFrontContent(file)

        const newCard = {
            front: {
                type: frontType === 'text' ? (frontContent.endsWith('?') ? 'question' : 'text') : 'image',
                content: frontType === 'image' ? file : frontContent
            },
            back: {
                type: "text", 
                content: backContent
            },
            lastModified: new Date().toISOString(),
            status: status
        };

        onAddCard(newCard)

        // Reset fields
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
                    onChange={handleChange}
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