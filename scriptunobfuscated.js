function extendedVigenereEncrypt(plaintext, key) {
    const chars = Array.from({ length: 95 }, (_, i) => String.fromCharCode(i + 32)); // Unterstützt alle druckbaren ASCII-Zeichen
    const charToIndex = Object.fromEntries(chars.map((char, idx) => [char, idx]));
    const indexToChar = Object.fromEntries(chars.map((char, idx) => [idx, char]));

    const placeholder = '~'; // Platzhalter für Leerzeichen
    plaintext = plaintext.replace(/ /g, placeholder);

    const keyRepeated = key.repeat(Math.ceil(plaintext.length / key.length)).slice(0, plaintext.length);

    const encrypted = Array.from(plaintext).map((p, i) => {
        const k = keyRepeated[i];
        return indexToChar[(charToIndex[p] + charToIndex[k]) % chars.length];
    }).join('');

    return encrypted.replace(/ /g, placeholder);
}

function extendedVigenereDecrypt(ciphertext, key) {
    const chars = Array.from({ length: 95 }, (_, i) => String.fromCharCode(i + 32)); // Unterstützt alle druckbaren ASCII-Zeichen
    const charToIndex = Object.fromEntries(chars.map((char, idx) => [char, idx]));
    const indexToChar = Object.fromEntries(chars.map((char, idx) => [idx, char]));

    const placeholder = '~'; // Platzhalter für Leerzeichen

    const keyRepeated = key.repeat(Math.ceil(ciphertext.length / key.length)).slice(0, ciphertext.length);

    const decrypted = Array.from(ciphertext).map((c, i) => {
        const k = keyRepeated[i];
        return indexToChar[(charToIndex[c] - charToIndex[k] + chars.length) % chars.length];
    }).join('');

    return decrypted.replace(/ /g, placeholder); // Entfernt Platzhalter für Leerzeichen
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var privateKey = document.getElementById('privateKey').value;
    var publicKey = document.getElementById('publicKey').value;

    var encryptedText = extendedVigenereEncrypt(publicKey, privateKey) + 'A1';
    var decryptedText = extendedVigenereDecrypt(encryptedText, privateKey);

    document.getElementById('result').innerText = 'Verschlüsselt: ' + escapeHtml(encryptedText) + '\nEntschlüsselt: ' + escapeHtml(decryptedText);
});