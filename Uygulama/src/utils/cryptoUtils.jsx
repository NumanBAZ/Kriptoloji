// AES şifreleme/çözme ve SHA256 özet alma

export async function encryptAES(text, keyStr) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(keyStr);
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const key = await crypto.subtle.importKey(
    "raw", keyData, "AES-CBC", false, ["encrypt"]
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    encoder.encode(text)
  );

  const result = new Uint8Array([...iv, ...new Uint8Array(encrypted)]);
  return btoa(String.fromCharCode(...result));
}

export async function decryptAES(base64Data, keyStr) {
  const rawData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
  const iv = rawData.slice(0, 16);
  const data = rawData.slice(16);

  const encoder = new TextEncoder();
  const keyData = encoder.encode(keyStr);

  const key = await crypto.subtle.importKey(
    "raw", keyData, "AES-CBC", false, ["decrypt"]
  );

  try {
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      key,
      data
    );

    return new TextDecoder().decode(decrypted);
  } catch (e) {
    return "Şifre çözme başarısız.";
  }
}

export async function sha256Hash(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
