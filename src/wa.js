const { Client } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');

const SESSION_FILE_PATH = path.join(__dirname, 'whatsapp', 'session.json');
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    session: sessionData,
});

client.on('qr', (qr) => {
    // Tampilkan QR code di terminal
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
    console.log('Authenticated as', session.user.name);
    fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session));
});

client.initialize();

module.exports = client;


