import React, { useState } from "react";

function SHA256Hasher() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");

  const handleHash = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    setHash(hashHex);
  };

  return (
    <div className="p-4 bg-white shadow rounded max-w-xl mx-auto my-4">
      <h2 className="text-xl font-semibold mb-2">SHA-256 Özeti Çıkar</h2>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={4}
        placeholder="Metin giriniz..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleHash}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Özeti Çıkar
      </button>

      {hash && (
        <div className="mt-4">
          <h3 className="font-medium">SHA-256 Özeti:</h3>
          <p className="break-words text-sm font-mono bg-gray-100 p-2 rounded">
            {hash}
          </p>
        </div>
      )}
    </div>
  );
}

export default SHA256Hasher;
