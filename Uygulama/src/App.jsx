import { useState } from 'react';
import { encryptAES, decryptAES, sha256Hash } from './utils/cryptoUtils';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setText(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleEncrypt = async () => {
    if (key.length !== 16) {
      alert("Anahtar 16 karakter olmalı!");
      return;
    }
    const result = await encryptAES(text, key);
    setOutput(result);
  };

  const handleDecrypt = async () => {
    if (key.length !== 16) {
      alert("Anahtar 16 karakter olmalı!");
      return;
    }
    const result = await decryptAES(output, key);
    setText(result);
  };

  const handleHash = async () => {
    const result = await sha256Hash(text);
    setOutput(result);
  };

  return (
    <div className="container">
      <h1>🔐 Kriptografi Aracı</h1>

      <label>Dosya Yükle:</label>
      <input
        type="file"
        onChange={handleFileChange}
      />

      <label>Anahtar (16 karakter):</label>
      <input
        type="text"
        value={key}
        onChange={e => setKey(e.target.value)}
        maxLength={16}
        placeholder="16 karakterlik anahtar"
      />

      <label>Metin:</label>
      <textarea
        rows="4"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Şifrelenecek metni buraya yazın"
      />

      <div className="buttons">
        <button onClick={handleEncrypt}>Şifrele (AES)</button>
        <button onClick={handleDecrypt}>Çöz (AES)</button>
        <button onClick={handleHash}>SHA256 Özet</button>
      </div>

      <label>Sonuç:</label>
      <textarea
        rows="4"
        value={output}
        readOnly
        placeholder="Sonuç burada görünecek"
      />
    </div>
  );
}

export default App;
