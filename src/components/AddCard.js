import { useState } from 'react';

export default function AddCard({ onAddCard, editingCard }) {
    const [frontType, setFrontType] = useState(editingCard?.type || 'text');
    const [frontContent, setFrontContent] = useState(editingCard?.front.content || '');
    const [backContent, setBackContent] = useState(editingCard?.back.content || '');
    const [imageFile, setImageFile] = useState(null);
    const [status, setStatus] = useState('Noted'); 

    const handleSubmit = () => {
        // Create a FormData object to send the file
        // Properties: { frontType, frontContent, backContent, lastModified, status }
        const formData = new FormData();
        if (frontType === 'text') {
            if (frontContent.endsWith('?')) {
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

        formData.append('status', status); 

        onAddCard(formData); 

        // Reset fields
        setFrontContent('');
        setBackContent('');
        setImageFile(null);
        setStatus('Noted')
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