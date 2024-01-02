import { useState } from 'react';

export default function AddCard({ onAddCard }) {
  const [cardType, setCardType] = useState('text');
  const [textContent, setTextContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = () => {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('cardType', cardType);
    if (cardType === 'text') {
      formData.append('content', textContent);
    } else {
      formData.append('image', imageFile);
    }

    onAddCard(formData); // Assuming onAddCard can handle FormData

    // Reset fields
    setTextContent('');
    setImageFile(null);
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <>
      <div>
        <label>
          <input
            type="radio"
            value="text"
            checked={cardType === 'text'}
            onChange={() => setCardType('text')}
          />
          Text/Question
        </label>
        <label>
          <input
            type="radio"
            value="image"
            checked={cardType === 'image'}
            onChange={() => setCardType('image')}
          />
          Image
        </label>
      </div>

      {cardType === 'text' ? (
        <input
          placeholder="Add text content or a question"
          value={textContent}
          onChange={e => setTextContent(e.target.value)}
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      )}

      <button onClick={handleSubmit}>Add</button>
    </>
  );
}